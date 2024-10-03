const droService = require("../services/dro.service");
const {
  validate,
  validationErrorMiddleware
} = require("../../middleware/validate");
const droSchema = require("../schemas/dro");

const getAll = async (req, res) => {
  try {
    const droItems = await droService.getAll();
    res.status(200).json(droItems);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const dro = await droService.getById(req.params.id);
    if (!dro) {
      return res.status(404).send("Dro not found.");
    }
    res.status(200).json(dro);
  } catch (err) {
    res.status(500).send(err);
  }
};

const post = async (req, res) => {
  try {
    const response = await droService.post(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const put = async (req, res) => {
  try {
    const dro = await droService.getById(req.params.id);
    if (!dro) {
      return res.status(404).send("Dro not found.");
    }

    await droService.put(req.body);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
};

const del = async (req, res) => {
  try {
    const dro = await droService.getById(req.params.id);
    if (!dro) {
      return res.status(404).send("Dro not found.");
    }

    await droService.del(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAll,
  getById,
  post: [validate({ body: droSchema }), post, validationErrorMiddleware],
  put,
  del
};
