const router = require("express").Router();
const configController = require("../controllers/config.controller");
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");

module.exports = router;

router.get("/", writeLimiter, configController.getAll);
router.get("/:code", writeLimiter, configController.getByCode);
router.post(
  "/",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  configController.post
);
router.put(
  "/:code",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  configController.put
);
router.delete(
  "/:code",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  configController.del
);
