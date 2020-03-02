const projectService = require("../services/project.service");

const getAll = (req, res) => {
  projectService
    .getAll()
    .then(resultSet => {
      res.json(resultSet);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const getById = (req, res) => {
  projectService
    .getById(req.params.id)
    .then(item => {
      if (!item) {
        res.status(404).send("project " + req.params.id + " not found.");
      }
      res.json(item);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const post = (req, res) => {
  projectService
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
  projectService
    .put(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const del = (req, res) => {
  projectService
    .del(req.params.id)
    .then(() => {
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
