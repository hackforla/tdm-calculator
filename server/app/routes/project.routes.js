const router = require("express").Router();
const projectController = require("../controllers/project.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get("/:id", jwtSession.validateUser, projectController.getById);
router.get("/", jwtSession.validateUser, projectController.getAll);
router.post("/", jwtSession.validateUser, projectController.post);
router.put("/:id", jwtSession.validateUser, projectController.put);
router.delete("/:id", jwtSession.validateUser, projectController.del);
