const configService = require("../services/config.service");

const getAll = async (req, res) => {
  try {
    const response = await configService.getAll();
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getByCode = async (req, res) => {
  try {
    const response = await configService.getByCode(req.params.code);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const post = async (req, res) => {
  try {
    await configService.post(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};

const put = async (req, res) => {
  try {
    await configService.put(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

const del = async (req, res) => {
  try {
    await configService.del(req.params.code);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAll,
  getByCode,
  post,
  put,
  del
};
