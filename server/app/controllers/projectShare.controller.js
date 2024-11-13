const projectShareService = require("../services/projectShare.service");
const {
  validate,
  validationErrorMiddleware
} = require("../../middleware/validate");
const projectShareSchema = require("../schemas/projectShare");

const getById = async (req, res) => {
  try {
    const project = await projectShareService.getById(req.params.id);
    if (!project) {
      return res.status(404).send("Project not found.");
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getByProjectId = async (req, res) => {
  try {
    const sharedEmails = await projectShareService.getByProjectId(
      req.params.projectId
    );
    if (!sharedEmails) {
      return res.status(404).send("Project not found.");
    }
    res.status(200).json(sharedEmails);
  } catch (err) {
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
    const projectShare = await projectShareService.getById(req.params.id);
    if (!projectShare) {
      return res.status(404).send("ProjectShare not found.");
    }

    await projectShareService.del(req.params.id);
    res.sendStatus(204);
  } catch (err) {
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
