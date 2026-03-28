const calculationService = require("../services/calculation.service");

const getAll = async (req, res) => {
  try {
    const response = await calculationService.getAll(false);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllIncludeRules = async (req, res) => {
  try {
    const response = await calculationService.getAll(true);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const response = await calculationService.getById(req.params.id, false);
    if (!response) {
      res.status(404).send("Calculation " + req.params.id + " not found.");
      return;
    }
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getByIdIncludeRules = async (req, res) => {
  try {
    const response = await calculationService.getById(req.params.id, true);
    if (!response) {
      res.status(404).send("Calculation " + req.params.id + " not found.");
      return;
    }
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAll,
  getAllIncludeRules,
  getById,
  getByIdIncludeRules
};
