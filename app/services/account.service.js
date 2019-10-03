const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// using temp key to sign and verify until we have access to heroku from John
const tempKey = "tempJWTSecret";

const createToken = account => {
  return jwt.sign(
    { account },
    // using tempJWTSecret until we can add updated env into Heroku
    process.env.JWT_SECRET_KEY || tempKey,
    {
      // TODO: possibly add other details options
      expiresIn: "7d"
    }
  );
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
        // TODO: We should have a timeout in the DB: if account is not confirmed within a time period, remove from DB.
        return {
          message:
            "Registration successful. Please check email to confirm account before logging in."
        };
      });
  });
};

// in order to use the .then and .catch in the controller,
// the functions in service file needs to be return a promise.
// temporarily keeping this here for reference
// alternative to using promises is using async/await
const promise = itemToResolve => {
  return new Promise(function(resolve, reject) {
    resolve(itemToResolve);
  });
};

//example of a protected route/controller/service
const getMessage = token => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || tempKey);
  return promise({
    message: "decoded token payload included in json",
    ...decoded
  });
};

module.exports = {
  postRegister,
  postLogin,
  getMessage
};
