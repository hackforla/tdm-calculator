const projectService = require("../services/project.service");

const getAll = async (req, res) => {
  try {
    const projects = await projectService.getAll(req.user.id);
    res.status(200).json(projects);
    return;
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const project = await getProject(req, res);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).send(err);
  }
};

const post = async (req, res) => {
  try {
    if (req.body.loginId !== req.user.id) {
      res.status(403).send("You can only create your own projects.");
      return;
    }

    const response = await projectService.post(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const put = async (req, res) => {
  try {
    const project = await getProject(req, res);
    if (project.loginId !== req.user.id) {
      res.status(403).send("You can only make changes to your own projects.");
      return;
    }

    await projectService.put(req.body);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
};

const del = async (req, res) => {
  try {
    const project = await getProject(req, res);
    if (project.loginId !== req.user.id) {
      res.status(403).send("You can only delete your own projects.");
      return;
    }

    await projectService.del(req.user.id, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
};

// HELPER FUNCTION:
const getProject = async (req, res) => {
  const project = await projectService.getById(req.user.id, req.params.id); //TODO: Check on purpose of sending req.user.id
  if (!project) {
    res.status(404).send("project " + req.params.id + " not found.");
    return;
  }
  return project;
};

const hide = async (req, res) => {
  try {
    const { ids, hide } = req.body;

    const result = await projectService.hide(ids, hide, req.user.id);
    if (result === 1) {
      res.sendStatus(403);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const trash = async (req, res) => {
  const { ids, trash } = req.body;
  try {
    const result = await projectService.trash(ids, trash, req.user.id);
    if (result === 1) {
      res.sendStatus(403);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const snapshot = async (req, res) => {
  try {
    const { id, name } = req.body;

    const result = await projectService.snapshot(id, req.user.id, name);
    if (result === 1) {
      res.sendStatus(403);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const renameSnapshot = async (req, res) => {
  try {
    const { id, name } = req.body;

    const result = await projectService.renameSnapshot(id, req.user.id, name);
    if (result === 1) {
      res.sendStatus(403);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllArchivedProjects = async (req, res) => {
  try {
    if (!req.user.isSecurityAdmin) {
      return res.status(403).json({
        error: "Access denied. Only security admins can view archived projects."
      });
    }
    const archivedProjects = await projectService.getAllArchivedProjects();
    res.status(200).json(archivedProjects);
    return;
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  del,
  hide,
  trash,
  snapshot,
  renameSnapshot,
  getAllArchivedProjects
};
