const calculationService = require("../services/calculation.service");

const getAll = (req, res) => {
  calculationService
    .getAll()
    .then(resultSet => {
      res.json(resultSet);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const getById = (req, res) => {
  calculationService
    .getById(req.params.id)
    .then(item => {
      if (!item) {
        res.status(404).send("Calculation " + id + " not found.");
      }
      res.json(item);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const post = (req, res) => {
  calculationService
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
  calculationService
    .put(req.body)
    .then(outputParms => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const del = (req, res) => {
  calculationService
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
  getById,
  post,
  put,
  del
};
