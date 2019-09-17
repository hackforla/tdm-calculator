const accountService = require("../services/account.service");

const postRegister = (req, res) => {
  accountService
    .postRegister(req.body, res)
    .then(registrationResponse => {
      //TODO: need to check if voluation of duplicate key/email, or invalid inputs
      res.status(201).json({
        message:
          "Registration successful. (Future Feature: Check email to confirm account before logging in.)",
        ...registrationResponse
      });
    })
    .catch(err => {
      // TODO: if trying to register duplicate account, how do i send the correct error for this? it shouldn't be status code 500...but if we don't send any, it will send 200
      // const errors = ["Cannot insert duplicate key in object 'dbo.Account'"];
      console.log("error!", err.message);
      res.status(500).send(err.message);
    });
};

const postLogin = (req, res) => {
  accountService
    .postLogin(req.body)
    .then(accountInfo => {
      if (accountInfo.error) {
        res.status(403).json(accountInfo.error);
      } else {
        res.status(201).json({
          message:
            "Login successful. Inside account.controller, postLogin(), json data includes accountInfo and token",
          ...accountInfo
        });
      }
    })
    .catch(err => {
      //TODO: send proper status codes and errors if... wrong email, wrong password
      res.send(500).send(err);
    });
};

module.exports = {
  postRegister,
  postLogin
};
