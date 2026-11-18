const projectShareService = require("../services/projectShare.service");
const {
  validate,
  validationErrorMiddleware
} = require("../../middleware/validate");
const projectShareSchema = require("../schemas/projectShare");

const getById = async (req, res) => {
  try {
    const project = await projectShareService.getById(
      req.params.id,
      req.user.id
    );
    if (!project) {
      return res.status(404).send("Project Share  not found.");
    }
    res.status(200).json(project);
  } catch (err) {
    if (err.status === 403) {
      return res.status(403).send(err.message);
    }
    res.status(500).send(err);
  }
};

const getByProjectId = async (req, res) => {
  try {
    const sharedEmails = await projectShareService.getByProjectId(
      req.params.projectId,
      req.user.id
    );
    if (!sharedEmails) {
      return res.status(404).send("Project Shares not found.");
    }
    res.status(200).json(sharedEmails);
  } catch (err) {
    if (err.status === 403) {
      return res.status(403).send(err.message);
    }
    res.status(500).send(err);
  }
};

const post = async (req, res) => {
  try {
    const response = await projectShareService.post(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const del = async (req, res) => {
  try {
    const projectShare = await projectShareService.getById(
      req.params.id,
      req.user.id
    );

    if (!projectShare) {
      return res.status(404).send("Project Share not found.");
    }

    await projectShareService.del(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    if (err.status === 403) {
      return res.status(403).send(err.message);
    }
    res.status(500).send(err);
  }
};

module.exports = {
  getById,
  getByProjectId,
  post: [
    validate({ body: projectShareSchema }),
    post,
    validationErrorMiddleware
  ],
  del
};
