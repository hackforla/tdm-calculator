const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = account => {
  return jwt.sign({ account }, process.env.JWT_SECRET_KEY, {
    // TODO: possibly add other details options
    expiresIn: "7d"
  });
};

const postLogin = async ({ email, password }) => {
  let accountResponse = await mssql.executeProc("Account_Login", sqlRequest => {
    sqlRequest.addParameter("email", TYPES.VarChar, email);
  });
  // .then(accountResponse => {
  //   return accountResponse.resultSets[0][0];
  // });

  const account = accountResponse.resultSets[0][0];

  return bcrypt.compare(password, account.password).then(async res => {
    if (res) {
      // deletes password hash before creating token and sending json response
      delete account.password;
      const token = await createToken(account);
      return {
        account,
        token
      };
    } else {
      return {
        error: "Invalid Password"
      };
    }
  });
};

const postRegister = (req, res) => {
  // bcrypt returns a promise
  return bcrypt.hash(req.password, 10).then(hash => {
    return mssql
      .executeProc("Account_Register", sqlRequest => {
        sqlRequest.addParameter("email", TYPES.VarChar, req.email);
        sqlRequest.addParameter("password", TYPES.VarChar, hash);
      })
      .then(response => {
        console.log("response", response);
        console.log("resultSets", response.resultSets[0][0]);
        // TODO: We should have a timeout in the DB: if account is not confirmed within a time period, remove from DB.
        return {
          // TODO: Currently the resultSets are returning the userInfo that was just created. But maybe the response from DB should be something else? We technically don't need that user info here, just in the login.
          ...response.resultSets[0][0]
        };
      });
  });
};

module.exports = {
  postRegister,
  postLogin
};
