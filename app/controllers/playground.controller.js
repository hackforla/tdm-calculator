const playgroundService = require("../services/playground.service");

//example of a protected route/controller/service
const getMessage = async (req, res) => {
  playgroundService
    .getMessage(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err));
};

const getAuthorizedStuff = async (req, res) => {
  playgroundService
    .getAuthorizedStuff(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err));
};

const getAuthorizedStuffADMIN = async (req, res) => {
  playgroundService
    .getAuthorizedStuffADMIN(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err));
};

const getAuthorizedStuffADMIN2 = async (req, res) => {
  console.log("playground.controller");
  playgroundService
    .getAuthorizedStuffADMIN2(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err));
};

module.exports = {
  getMessage,
  getAuthorizedStuff,
  getAuthorizedStuffADMIN,
  getAuthorizedStuffADMIN2
};
