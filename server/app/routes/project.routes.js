const router = require("express").Router();
const projectController = require("../controllers/project.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get(
  "/archivedprojects",
  jwtSession.validateUser,
  projectController.getAllArchivedProjects
);
router.get("/", jwtSession.validateUser, projectController.getAll);
router.get("/:id", jwtSession.validateUser, projectController.getById);
router.post("/", jwtSession.validateUser, projectController.post);
router.put("/hide", jwtSession.validateUser, projectController.hide);
router.put("/trash", jwtSession.validateUser, projectController.trash);
router.put("/snapshot", jwtSession.validateUser, projectController.snapshot);
router.put("/submit", jwtSession.validateUser, projectController.submit);
router.put(
  "/renameSnapshot",
  jwtSession.validateUser,
  projectController.renameSnapshot
);
router.put("/:id", jwtSession.validateUser, projectController.put);
router.put(
  "/updateDroId/:id",
  jwtSession.validateUser,
  projectController.updateDroId
);
router.put(
  "/updateAdminNotes/:id",
  jwtSession.validateUser,
  projectController.updateAdminNotes
);
router.delete("/:id", jwtSession.validateUser, projectController.del);
