const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = account => {
  return jwt.sign(
    {
      account
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d"
    }
  );
};

const postLogin = async ({ email, password }) => {
  // TODO: 1: logic to compare password/hash in db; return the accountInfo
  let account = await Promise.resolve(
    mssql
      .executeProc("Account_Login", sqlRequest => {
        sqlRequest.addParameter("email", TYPES.VarChar, email);
      })
      .then(acc => {
        return acc.resultSets[0][0];
      })
  );

  // deletes password before creating token and sending json response
  delete account.password;
  let token = await createToken(account);

  return promise({
    account,
    token
  });
};

const postRegister = (req, res) => {
  // bcrypt returns a promise
  return bcrypt.hash(req.password, 10).then(hash => {
    // TODO: 1) check if account is in db
    // TODO: 2) create account and add to db

    return mssql
      .executeProc("Account_Register", sqlRequest => {
        sqlRequest.addParameter("email", TYPES.VarChar, req.email);
        sqlRequest.addParameter("password", TYPES.VarChar, hash);
      })
      .then(response => {
        const account = response.resultSets[0][0];
        const token = createToken(account);
        return {
          account,
          token
        };
      });
  });
};

// in order to use the .then and .catch in the controller,
// the functions in service file needs to be return a promise
// alternative is using async/await
const promise = itemToResolve => {
  return new Promise(function(resolve, reject) {
    resolve(itemToResolve);
  });
};

//example of a protected route/controller/service
const getMessage = token => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
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
