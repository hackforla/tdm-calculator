const router = require("express").Router();
const projectController = require("../controllers/project.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get("/:id", jwtSession.validateUser, projectController.getById);
router.get("/", jwtSession.validateUser, projectController.getAll);
router.post("/", jwtSession.validateUser, projectController.post);
router.put("/hide", jwtSession.validateUser, projectController.hide);
router.put("/trash", jwtSession.validateUser, projectController.trash);
router.put("/snapshot", jwtSession.validateUser, projectController.snapshot);
router.put("/:id", jwtSession.validateUser, projectController.put);
router.delete("/:id", jwtSession.validateUser, projectController.del);
router.get("/archivedprojects", jwtSession.validateRoles(["isSecurityAdmin"]), projectController.getAllArchivedProjects);

