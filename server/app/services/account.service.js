const { pool, poolConnect } = require("./tedious-pool");
const mssql = require("mssql");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const {
  sendVerifyUpdateConfirmation,
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation
} = require("./email.service");
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

// const selectById = async id => {
//   try {
//     await poolConnect;
//     const request = pool.request();
//     request.input("Id", mssql.Int, id);

//     const response = await request.execute("Login_SelectById");
//     if (response.recordset && response.recordset.length > 0) {
//       return response.recordset[0];
//     }
//     return null;
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

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

const updateAccount = async model => {
  const token = uuid4();
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, model.id);
    request.input("FirstName", mssql.NVarChar, model.firstName);
    request.input("LastName", mssql.NVarChar, model.lastName);
    request.input("Email", mssql.NVarChar, model.email);
    await request.execute("Login_Update");
    await sendVerifyUpdateConfirmation(model.email, token);
    return {
      isSuccess: true,
      code: "ACCOUNT_UPDATE_SUCCESS",
      message: "Account Updates."
    };
  } catch (err) {
    return {
      isSuccess: false,
      code: "ACCOUNT_UPDATE_SUCCESS",
      message: `Account updates failed. ${err.message}`
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
      isSuccess: true,
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
      isSuccess: false,
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

    const emailResult = await sendRegistrationConfirmation(email, token);

    return {
      ...result,
      ...emailResult,
      message: result.message + " Sending confirmation email succeeded."
    };
  } catch (err) {
    const explanation = JSON.stringify(err, null, 2);
    return {
      isSuccess: false,
      code: "REG_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed due to: ${explanation}`
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
    const now = new Date();

    if (resultSet.length !== 1) {
      return {
        isSuccess: false,
        code: "REG_CONFIRM_TOKEN_INVALID",
        message:
          "Email confirmation failed. Invalid security token. Re-send confirmation email."
      };
    } else if (
      (now.getTime() - resultSet[0].dateCreated.getTime()) / (60 * 60 * 1000) >=
      24
    ) {
      return {
        isSuccess: false,
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
      isSuccess: true,
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
    const explanation = JSON.stringify(err, null, 2);
    return {
      isSuccess: false,
      code: "FORGOT_PASSWORD_EMAIL_FAILED",
      message: `Sending reset password confirmation email to ${email} failed due to: ${explanation}.`
    };
  }
};

// Verify password reset token and change password
const resetPassword = async ({ token, password }) => {
  const now = new Date();
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
    } else if (
      (now.getTime() - new Date(resultSet.date_created).getTime()) /
        (60 * 60 * 1000) >=
      1
    ) {
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
  if (user.archivedAt !== null) {
    return {
      isSuccess: false,
      code: "USER_ARCHIVED",
      reason: `Account for email ${email} has been archived`
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

const updateRoles = async model => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, model.id);
    request.input("isAdmin", mssql.Bit, model.isAdmin);
    request.input("isSecurityAdmin", mssql.Bit, model.isSecurityAdmin);
    request.input("isDro", mssql.Bit, model.isDro);
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

//soft delete (archive)
const archiveUser = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    // checks if user exists
    const response = await request.execute("Login_SelectById");
    if (response.recordset && response.recordset.length > 0) {
      // checks if the user is a SecurityAdmin
      const user = response.recordset[0];
      if (user.isSecurityAdmin) {
        return {
          isSuccess: false,
          code: "ARCHIVE_NOT_ALLOWED",
          message: `User with id ${id} is a SecurityAdmin and cannot be archived.`
        };
      }
      // archives user and respective projects
      const archiveUser = await request.execute("ArchiveUserAndProjects");
      if (archiveUser) {
        // succeeds if user exists and is archived
        return {
          isSuccess: true,
          code: "ARCHIVE_USER_SUCCESS",
          message: `User with id ${id} has been archived.`
        };
      } else {
        // fails if user exists but cannot be archived
        return {
          isSuccess: false,
          code: "ARCHIVE_ATTEMPT_FAILED",
          message: `Attempt to archive user with id ${id} failed.`
        };
      }
    } else {
      // fails if user does NOT exist
      return {
        isSuccess: false,
        code: "ARCHIVE_USER_FAILED",
        message: `User with id ${id} does not exist.`
      };
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

// unarchive and restore user
const unarchiveUser = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    // checks if user exists
    const response = await request.execute("Login_SelectById");
    if (response.recordset && response.recordset.length > 0) {
      const user = response.recordset[0];
      // checks if the user is archived
      if (user.archivedAt === null) {
        return {
          isSuccess: false,
          code: "USER_NOT_ARCHIVED",
          message: `User id ${id} is not archived; thus, cannot be unarchived.`
        };
      }
      // proceed to unarchive user and projects
      const unarchiveUser = await request.execute("UnarchiveUserAndProjects");
      if (unarchiveUser && unarchiveUser.rowsAffected[0] > 0) {
        // succeeds if user exists and is unarchived and restored
        return {
          isSuccess: true,
          code: "UNARCHIVE_AND_RESTORE_USER_SUCCESS",
          message: `User with id ${id} has been unarchived and restored.`
        };
      } else {
        return {
          isSuccess: false,
          code: "UNARCHIVE_AND_RESTORE_ATTEMPT_FAILED",
          message: `Attempt to unarchive and restore user with id ${id} failed.`
        };
      }
    } else {
      return {
        isSuccess: false,
        code: "UNARCHIVE_AND_RESTORE_FAILED",
        message: `User with id ${id} does not exist.`
      };
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

// selects all archived users
const getAllArchivedUsers = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Login_SelectAllArchived");
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

// selects all DRO users
const getAllDROfficeUsers = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const response = await request.execute("Login_SelectAllIsDRO");
    return response.recordset;
  } catch (err) {
    return Promise.reject(err);
  }
};

// HARD DELETE
const deleteUser = async id => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input("id", mssql.Int, id);
    // checks if user exists
    const response = await request.execute("Login_SelectById");
    if (response.recordset && response.recordset.length > 0) {
      // checks if the user is a SecurityAdmin
      const user = response.recordset[0];
      if (user.isSecurityAdmin) {
        return {
          isSuccess: false,
          code: "DELETE_NOT_ALLOWED",
          message: `User with id ${id} is a SecurityAdmin and cannot be deleted.`
        };
      }
      // deletes user and respective projects
      const deleteUser = await request.execute("DeleteUserAndProjects");
      if (deleteUser) {
        // succeeds if user exists and is deleted
        return {
          isSuccess: true,
          code: "DELETE_USER_SUCCESS",
          message: `User with id ${id} has been deleted.`
        };
      } else {
        // fails if user exists but cannot be deleted
        return {
          isSuccess: false,
          code: "DELETE_ATTEMPT_FAILED",
          message: `Attempt to delete user with id ${id} failed.`
        };
      }
    } else {
      // fails if user does NOT exist
      return {
        isSuccess: false,
        code: "DELETE_USER_FAILED",
        message: `User with id ${id} does not exist.`
      };
    }
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
  // selectById,
  register,
  updateAccount,
  confirmRegistration,
  resendConfirmationEmail,
  forgotPassword,
  resetPassword,
  authenticate,
  updateRoles,
  archiveUser,
  unarchiveUser,
  getAllArchivedUsers,
  getAllDROfficeUsers,
  deleteUser
};
