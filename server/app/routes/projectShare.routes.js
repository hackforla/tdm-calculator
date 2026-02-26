const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");
const projectShareController = require("../controllers/projectShare.controller");

module.exports = router;

router.get("/:id", jwtSession.validateUser, projectShareController.getById);
router.get(
  "/projectId/:projectId",
  jwtSession.validateUser,
  projectShareController.getByProjectId
);
router.post(
  "/",
  writeLimiter,
  jwtSession.validateUser,
  projectShareController.post
);
router.delete(
  "/:id",
  writeLimiter,
  jwtSession.validateUser,
  projectShareController.del
);
