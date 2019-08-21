const accountService = require("../services/account.service");

//example of a protected route/controller/service
const getMessage = async (req, res) => {
  accountService
    .getMessage(req.token)
    .then(resp => res.status(201).json(resp))
    .catch(err => res.status(500).json(err));
};

const postRegister = (req, res) => {
  accountService
    .postRegister(req.body, res)
    .then(accountInfo => {
      console.log("account INFO IN REGISTER CONTROLLER", accountInfo);
      res.status(201).json({
        message:
          "CONTROLLER LEVEL: successfully posted to register (but not really...), should have account info in this json response",
        ...accountInfo
      });
    })
    .catch(err => {
      res.set(500).send(err);
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
            "Controller level for postLogin(), with accountInfo below, should have token which will be stored in localstorage in frontend",
          ...accountInfo
        });
      }
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

module.exports = {
  postRegister,
  postLogin,
  getMessage
};
