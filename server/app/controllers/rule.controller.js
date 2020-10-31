const ruleService = require("../services/rule.service");

const getAll = async (req, res) => {
  try {
    const r = await ruleService.getAll();
    res.json(r);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getByCalculationId = async (req, res) => {
  try {
    const r = await ruleService.getByCalculationId(req.params.id);
    res.json(r);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const r = await ruleService.getById(req.params.id);
    if (!r) {
      res.status(404).send("Rule " + req.params.id + " not found.");
    } else {
      res.json(r);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const post = async (req, res) => {
  try {
    const r = await ruleService.post(req.body);
    res.status(201).json(r);
  } catch (err) {
    res.status(500).send(err);
  }
};

const put = async (req, res) => {
  try {
    await ruleService.put(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

const del = async (req, res) => {
  try {
    await ruleService.del(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAll,
  getByCalculationId,
  getById,
  post,
  put,
  del
};
