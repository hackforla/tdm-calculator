const router = require("express").Router();
const projectShareController = require("../controllers/projectShare.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get("/:id", jwtSession.validateUser, projectShareController.getById);
router.get(
  "/projectId/:projectId",
  jwtSession.validateUser,
  projectShareController.getByProjectId
);
router.post("/", jwtSession.validateUser, projectShareController.post);
router.delete("/:id", jwtSession.validateUser, projectShareController.del);
