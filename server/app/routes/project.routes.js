const router = require("express").Router();
const projectController = require("../controllers/project.controller");
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");

module.exports = router;

router.get(
  "/archivedprojects",
  jwtSession.validateUser,
  projectController.getAllArchivedProjects
);
router.get("/", jwtSession.validateUser, projectController.getAll);
router.get(
  "/submissions",
  jwtSession.validateUser,
  projectController.getSubmissions
);
router.get(
  "/submissionsadmin",
  jwtSession.validateUser,
  projectController.getSubmissionsAdmin
);
router.get(
  "/submissionsadmin/:projectId",
  jwtSession.validateUser,
  projectController.getSubmissionsAdminByProjectId
);
router.get(
  "/submissionLog/:projectId",
  jwtSession.validateUser,
  projectController.getSubmissionLogByProjectId
);
router.get("/:id", jwtSession.validateUser, projectController.getById);
router.get(
  "/projectShare/:id/",
  jwtSession.validateUser,
  projectController.getByIdWithEmail
);
router.post("/", writeLimiter, jwtSession.validateUser, projectController.post);
router.put(
  "/hide",
  writeLimiter,
  jwtSession.validateUser,
  projectController.hide
);
router.put(
  "/trash",
  writeLimiter,
  jwtSession.validateUser,
  projectController.trash
);
router.put(
  "/snapshot",
  writeLimiter,
  jwtSession.validateUser,
  projectController.snapshot
);
router.put(
  "/submit",
  writeLimiter,
  jwtSession.validateUser,
  projectController.submit
);
router.put(
  "/renameSnapshot",
  writeLimiter,
  jwtSession.validateUser,
  projectController.renameSnapshot
);
router.put(
  "/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.put
);
router.put(
  "/updateDroId/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.updateDroId
);
router.put(
  "/updateAdminNotes/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.updateAdminNotes
);
router.delete(
  "/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.del
);
router.put(
  "/updateTotals/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.updateTotals
);
router.put(
  "/submissions/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectController.putSubmission
);
