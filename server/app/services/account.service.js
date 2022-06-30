const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");
const { promisify } = require("util");
const moment = require("moment");
const bcrypt = require("bcrypt");
const {
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation
} = require("./sendgrid-service");
const { v4: uuid4 } = require("uuid");

const SALT_ROUNDS = 10;

const selectAll = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Login_SelectAll");
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

const selectById = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Id", mssql.Int, id);

    const response = await request.execute("Login_SelectById");
    if (response.recordset && response.recordset.length > 0) {
      return response.recordset[0];
    }
    return null;
  } catch (err) {
    return Promise.reject(err);
  }
};

const selectByEmail = async email => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("Email", mssql.NVarChar, email);
    const response = await request.execute("Login_SelectByEmail");

    if (response.recordset && response.recordset.length > 0) {
      return response.recordset[0];
    }
    return null;
  } catch (err) {
    return Promise.reject(err);
  }
};

const register = async model => {
  const { firstName, lastName, email } = model;
  let result = null;
  await hashPassword(model);
  try {
    await poolConnect;
    const request = pool.request();
    request.input("FirstName", mssql.NVarChar, firstName);
    request.input("LastName", mssql.NVarChar, lastName);
    request.input("Email", mssql.NVarChar, email);
    request.input("PasswordHash", mssql.NVarChar, model.passwordHash);
    request.output("id", mssql.Int, null);
    const insertResult = await request.execute("Login_Insert");

    if (insertResult) {
      result = {
        isSuccess: true,
        code: "REG_SUCCESS",
        newId: insertResult.output["id"],
        message: "Registration successful."
      };
      result = await requestRegistrationConfirmation(email, result);
      return result;
    }
  } catch (err) {
    return {
      isSuccess: false,
      code: "REG_DUPLICATE_EMAIL",
      message: `Email ${email} is already registered. `
    };
  }
};

// Re-transmit confirmation email
const resendConfirmationEmail = async email => {
  let result = null;
  try {
    await poolConnect;
    const request = pool.request();
    request.input("email", mssql.NVarChar, email);
    const selectByEmailResponse = await request.execute("Login_SelectByEmail");

    result = {
      success: true,
      code: "REG_SUCCESS",
      newId: selectByEmailResponse.recordset[0].id,
      message: "Account found."
    };
    result = await requestRegistrationConfirmation(email, result);
    return result;
  } catch (err) {
    // Assume any error is an email that does not correspond to
    // an account.
    return {
      success: false,
      code: "REG_ACCOUNT_NOT_FOUND",
      message: `Resending confirmation email to ${email} failed due to: ${err.message}`
    };
  }
};

// Generate security token and transmit registration
// confirmation email
const requestRegistrationConfirmation = async (email, result) => {
  const token = uuid4();
  try {
    await poolConnect;
    const request = pool.request();
    request.input("token", mssql.NVarChar, token);
    request.input("email", mssql.NVarChar, email);
    await request.execute("SecurityToken_Insert");

    await sendRegistrationConfirmation(email, token);

    return {
      ...result,
      message: result.message + " Sending confirmation email succeeded."
    };
  } catch (err) {
    return {
      success: false,
      code: "REG_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed due to: ${err.message}`
    };
  }
};

const confirmRegistration = async token => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("token", mssql.NVarChar, token);
    const sqlResult = await request.execute("SecurityToken_SelectByToken");

    const resultSet = sqlResult.recordset;

    const now = moment();

    if (resultSet.length != 1) {
      return {
        success: false,
        code: "REG_CONFIRM_TOKEN_INVALID",
        message:
          "Email confirmation failed. Invalid security token. Re-send confirmation email."
      };
    } else if (moment(now).diff(resultSet[0].dateCreated, "hours") >= 24) {
      return {
        success: false,
        code: "REG_CONFIRM_TOKEN_EXPIRED",
        message:
          "Email confirmation failed. Security token expired. Re-send confirmation email."
      };
    }

    // If we get this far, we can update the login.email_confirmed flag
    const email = resultSet[0].email;
    const updateRequest = await pool.request();
    updateRequest.input("email", mssql.NVarChar, email);
    await updateRequest.execute("Login_ConfirmEmail");

    return {
      success: true,
      code: "REG_CONFIRM_SUCCESS",
      message: "Email confirmed.",
      email
    };
  } catch (err) {
    return { message: err.message };
  }
};

// Forgot Password - verify email matches an account and
// send password reset confirmation email.
const forgotPassword = async model => {
  const { email } = model;
  let result = null;
  try {
    const checkAccountResult = await selectByEmail(email);
    if (checkAccountResult) {
      result = {
        isSuccess: true,
        code: "FORGOT_PASSWORD_SUCCESS",
        newId: checkAccountResult.id,
        message: "Account found."
      };
    } else {
      return {
        isSuccess: false,
        code: "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND",
        message: `Email ${email} is not registered. `
      };
    }
    // Replace the success result if there is a prob
    // sending email.
    let tokenInsertResult = await requestResetPasswordConfirmation(
      email,
      result
    );
    if (tokenInsertResult) {
      return result;
    } else {
      return {
        isSuccess: false,
        code: "FORGOT_PASSWORD_INTERNAL_SERVER_ERROR",
        message:
          "Something went wrong with your request. Please try again later. If the problem persists,contact TDM."
      };
    }
  } catch (err) {
    return Promise.reject(`Unexpected Error: ${err.message}`);
  }
};

// Generate security token and transmit password reset
// confirmation email
const requestResetPasswordConfirmation = async (email, result) => {
  const token = uuid4();
  try {
    await poolConnect;
    const request = pool.request();
    request.input("token", mssql.NVarChar, token);
    request.input("email", mssql.NVarChar, email);
    await request.execute("SecurityToken_Insert");

    result = await sendResetPasswordConfirmation(email, token);
    return result;
  } catch (err) {
    return {
      success: false,
      code: "FORGOT_PASSWORD_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed.`
    };
  }
};

// Verify password reset token and change password
const resetPassword = async ({ token, password }) => {
  const now = moment();
  let email = "";
  try {
    await poolConnect;
    const request = pool.request();
    request.input("token", mssql.NVarChar, token);
    const tokenResult = await request.execute("SecurityToken_SelectByToken");

    const resultSet = tokenResult.recordset[0];

    if (resultSet.length < 1) {
      return {
        isSuccess: false,
        code: "RESET_PASSWORD_TOKEN_INVALID",
        message:
          "Password reset failed. Invalid security token. Re-send confirmation email."
      };
    } else if (moment(now).diff(resultSet.date_created, "hours") >= 1) {
      return {
        isSuccess: false,
        code: "RESET_PASSWORD_TOKEN_EXPIRED",
        message:
          "Password reset failed. Security token expired. Re-send confirmation email."
      };
    }

    // If we get this far, we can update the password
    const passwordHash = await promisify(bcrypt.hash)(password, SALT_ROUNDS);
    email = resultSet.email;

    const request1 = pool.request();
    request1.input("email", mssql.NVarChar, email);
    request1.input("passwordHash", mssql.NVarChar, passwordHash);
    await request1.execute("Login_ChangePassword");

    return {
      isSuccess: true,
      code: "RESET_PASSWORD_SUCCESS",
      message: "Password reset.",
      email
    };
  } catch (err) {
    return {
      isSuccess: false,
      code: "RESET_PASSWORD_FAILED",
      message: `Password reset failed. ${err.message}`,
      email
    };
  }
};

const authenticate = async (email, password) => {
  const user = await selectByEmail(email);
  if (!user) {
    return {
      isSuccess: false,
      code: "AUTH_NO_ACCOUNT",
      reason: `No account found for email ${email}`
    };
  }
  if (!user.emailConfirmed) {
    return {
      isSuccess: false,
      code: "AUTH_NOT_CONFIRMED",
      reason: `Email ${email} not confirmed`
    };
  }
  const isUser = await bcrypt.compare(password, user.passwordHash);
  if (isUser) {
    return {
      isSuccess: true,
      code: "AUTH_SUCCESS",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        emailConfirmed: user.emailConfirmed,
        isSecurityAdmin: user.isSecurityAdmin
      }
    };
  }
  return {
    isSuccess: false,
    code: "AUTH_INCORRECT_PASSWORD",
    reason: "Incorrect password"
  };
};

// Not fully implemented - needs sproc
const update = async model => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, model.id);
    request.input("firstName", mssql.NVarChar, model.firstName);
    request.input("lastName", mssql.NVarChar, model.lastName);
    request.input("email", mssql.NVarChar, model.email);
    await request.execute("Login_Update");
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateRoles = async model => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, model.id);
    request.input("isAdmin", mssql.Bit, model.isAdmin);
    request.input("isSecurityAdmin", mssql.Bit, model.isSecurityAdmin);
    await request.execute("Login_UpdateRoles");

    return {
      isSuccess: true,
      code: "ROLES_UPDATE_SUCCESS",
      message: "Roles Updates."
    };
  } catch (err) {
    return {
      isSuccess: false,
      code: "ROLES_UPDATE_FAILED",
      message: `Password reset failed. ${err.message}`
    };
  }
};

// Not fully implemented - needs sproc
const del = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    await request.execute("Login_Delete");
  } catch (err) {
    return Promise.reject(err);
  }
};

async function hashPassword(user) {
  if (!user.password) throw user.invalidate("password", "password is required");
  if (user.password.length < 8)
    throw user.invalidate("password", "password must be at least 8 characters");

  user.passwordHash = await promisify(bcrypt.hash)(user.password, SALT_ROUNDS);
}

module.exports = {
  selectAll,
  selectById,
  register,
  confirmRegistration,
  resendConfirmationEmail,
  forgotPassword,
  resetPassword,
  authenticate,
  update,
  updateRoles,
  del
};
