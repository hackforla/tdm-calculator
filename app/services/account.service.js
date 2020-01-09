const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const { promisify } = require("util");
const moment = require("moment");
const bcrypt = require("bcrypt");
const {
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation
} = require("./sendgrid-service");
const uuid4 = require("uuid/v4");

const SALT_ROUNDS = 10;

const selectAll = () => {
  return mssql.executeProc("Login_SelectAll").then(response => {
    return response.resultSets[0];
  });
};

const selectById = id => {
  return mssql
    .executeProc("Login_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      if (
        response.resultSets &&
        response.resultSets[0] &&
        response.resultSets[0].length > 0
      ) {
        return response.resultSets[0][0];
      }
      return null;
    });
};

const selectByEmail = email => {
  console.log('email', email)
  return mssql
    .executeProc("Login_SelectByEmail", sqlRequest => {
      sqlRequest.addParameter("Email", TYPES.NVarChar, email);
    })
    .then(response => {
      console.log('email response', response.resultSets[0])
      if (
        response.resultSets &&
        response.resultSets[0] &&
        response.resultSets[0].length > 0
      ) {
        return response.resultSets[0][0];
      }
      return null;
    });
};

const register = async model => {
  const { firstName, lastName, email } = model;
  const token = uuid4();
  let result = null;
  await hashPassword(model);
  try {
    const insertResult = await mssql.executeProc("Login_Insert", sqlRequest => {
      sqlRequest.addParameter("FirstName", TYPES.NVarChar, firstName);
      sqlRequest.addParameter("LastName", TYPES.NVarChar, lastName);
      sqlRequest.addParameter("Email", TYPES.NVarChar, email);
      sqlRequest.addParameter(
        "PasswordHash",
        TYPES.NVarChar,
        model.passwordHash
      );
      sqlRequest.addOutputParameter("id", TYPES.Int, null);
    });
    if (insertResult) {
      result = {
        isSuccess: true,
        code: "REG_SUCCESS",
        newId: insertResult.outputParameters.id,
        message: "Registration successful."
      };
      await requestRegistrationConfirmation(email, result);
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
    const sql = `select id from  login where email = '${email}'`;
    const insertResult = await pool.query(sql);
    result = {
      success: true,
      code: "REG_SUCCESS",
      newId: insertResult.rows[0].id,
      message: "Account found."
    };

    await mssql.executeProc("Login_SelectByEmail", sqlRequest => {
      sqlRequest.addParameter("email", TYPES.NVarChar, email);
    });
    result = await requestRegistrationConfirmation(email, result);
    return result;
  } catch (err) {
    // Assume any error is an email that does not correspond to
    // an account.
    return {
      success: false,
      code: "REG_ACCOUNT_NOT_FOUND",
      message: `Email ${email} is not registered. `
    };
  }
};

// Generate security token and transmit registration
// confirmation email
const requestRegistrationConfirmation = async (email, result) => {
  const token = uuid4();
  try {
    await mssql.executeProc("SecurityToken_Insert", sqlRequest => {
      sqlRequest.addParameter("token", TYPES.NVarChar, token);
      sqlRequest.addParameter("email", TYPES.NVarChar, email);
    });

    await sendRegistrationConfirmation(email, token);
    return result;
  } catch (err) {
    return {
      success: false,
      code: "REG_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed.`
    };
  }
};

const confirmRegistration = async token => {
  try {
    const sqlResult = await mssql.executeProc(
      "SecurityToken_SelectByToken",
      sqlRequest => {
        sqlRequest.addParameter("token", TYPES.NVarChar, token);
      }
    );

    const resultSet = sqlResult.resultSets[0];

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
    await mssql.executeProc("Login_ConfirmEmail", sqlRequest => {
      sqlRequest.addParameter("email", TYPES.NVarChar, email);
    });

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
  const token = uuid4();
  let result = null;
  try {

    const checkAccountResult = await selectByEmail(email)
    console.log('checkAccount', checkAccountResult)
    if (
      checkAccountResult
    ) {
      result = {
        isSuccess: true,
        code: "FORGOT_PASSWORD_SUCCESS",
        newId: checkAccountResult.id,
        message: "Account found."
      };
      console.log('successssss', result)
    } else {
      return {
        isSuccess: false,
        code: "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND",
        message: `Email ${email} is not registered. `
      };
    }
    // Replace the success result if there is a prob
    // sending email.
    result = await requestResetPasswordConfirmation(email, result);
    return result;
  } catch (err) {
    return Promise.reject(`Unexpected Error: ${err.message}`);
  }
};

// Generate security token and transmit password reset
// confirmation email
const requestResetPasswordConfirmation = async (email, result) => {
  const token = uuid4();
  try {
    // const sqlToken = `insert into security_token (token, email)
    //     values ('${token}', '${email}') `;
    // await pool.query(sqlToken);

    await mssql.executeProc("SecurityToken_Insert", sqlRequest => {
      sqlRequest.addParameter("token", TYPES.NVarChar, token);
      sqlRequest.addParameter("email", TYPES.NVarChar, email);
    });
    console.log('request confirmation', email, token)
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
  const sql = `select email, date_created
    from security_token where token = '${token}'`;
  const now = moment();
  try {
    const sqlResult = await pool.query(sql);

    if (sqlResult.rows.length < 1) {
      return {
        isSuccess: false,
        code: "RESET_PASSWORD_TOKEN_INVALID",
        message:
          "Password reset failed. Invalid security token. Re-send confirmation email."
      };
    } else if (moment(now).diff(sqlResult.rows[0].date_created, "hours") >= 1) {
      return {
        isSuccess: false,
        code: "RESET_PASSWORD_TOKEN_EXPIRED",
        message:
          "Password reset failed. Security token expired. Re-send confirmation email."
      };
    }

    // If we get this far, we can update the password
    const passwordHash = await promisify(bcrypt.hash)(password, SALT_ROUNDS);
    const email = sqlResult.rows[0].email;
    const resetSql = `update login 
            set password_hash = '${passwordHash}'
            where email = '${email}'`;
    await pool.query(resetSql);

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
        emailConfirmed: user.emailConfirmed
      }
    };
  }
  return {
    isSuccess: false,
    code: "AUTH_INCORRECT_PASSWORD",
    reason: `Incorrect password`
  };
};

//TODO
const update = model => {
  const { id, firstName, lastName } = model;
  const sql = `update login
               set firstName = '${firstName}',
                lastName = '${lastName}'
                where id = ${id}`;
  return pool.query(sql).then(res => {
    return res;
  });
};

// TODO
const remove = id => {
  const sql = `delete from login where id = ${id}`;
  return pool.query(sql).then(res => {
    return res;
  });
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
  remove
};
