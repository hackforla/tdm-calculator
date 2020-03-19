const projectService = require("../services/project.service");

const getAll = async (req, res) => {
  try {
    const response = await projectService.getAll();
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const response = await projectService.getById(req.params.id);
    if (!response) {
      res.status(404).send("project " + req.params.id + " not found.");
      return;
    }
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const post = async (req, res) => {
  try {
    const response = await projectService.post(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const put = async (req, res) => {
  try {
    await projectService.put(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

const del = async (req, res) => {
  try {
    await projectService.del(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  del
};
