const projectService = require("../services/project.service");

const getAll = async (req, res) => {
  try {
    const response = await projectService.getAll(req.user.id);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const response = await projectService.getById(req.user.id, req.params.id);
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
    if (!isAuthorizedUser(req)) {
      res.status(403).send("You can only create your own projects.");
    }

    const response = await projectService.post(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const put = async (req, res) => {
  try {
    if (!isAuthorizedUser(req)) {
      res.status(403).send("You can only make changes to your own projects.");
    }

    await projectService.put(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

const del = async (req, res) => {
  try {
    if (!isAuthorizedUser(req)) {
      res.status(403).send("You can only delete your own projects.");
    }

    await projectService.del(req.user.id, req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

// HELPER FUNCTION:

const isAuthorizedUser = req => {
  const loginIdOfCurrentUser = req.user.id;
  const loginIdInRequestBody = req.body.loginId;

  return loginIdOfCurrentUser === loginIdInRequestBody ? true : false;
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  del
};
