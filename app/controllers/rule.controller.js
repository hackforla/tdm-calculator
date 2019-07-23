const ruleService = require("../services/rule.service");

const getAll = (req, res) => {
  ruleService
    .getAll()
    .then(resultSet => {
      res.json(resultSet);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const getByCalculationId = (req, res) => {
  ruleService
    .getByCalculationId(req.params.id)
    .then(resultSet => {
      res.json(resultSet);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const getById = (req, res) => {
  ruleService
    .getById(req.params.id)
    .then(item => {
      if (!item) {
        res.status(404).send("Rule " + id + " not found.");
      }
      res.json(item);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const post = (req, res) => {
  ruleService
    .post(req.body)
    .then(outputParms => {
      res.status(201).json(outputParms);
      console.log(outputParms);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const put = (req, res) => {
  ruleService
    .put(req.body)
    .then(outputParms => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const del = (req, res) => {
  ruleService
    .del(req.params.id)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

module.exports = {
  getAll,
  getByCalculationId,
  getById,
  post,
  put,
  del
};
