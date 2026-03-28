const router = require("express").Router();
const configController = require("../controllers/config.controller");
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");

module.exports = router;

router.get("/", configController.getAll);
router.get("/:code", configController.getByCode);
router.post("/", writeLimiter, jwtSession.validateUser, configController.post);
router.put(
  "/:code",
  writeLimiter,
  jwtSession.validateUser,
  configController.put
);
router.delete(
  "/:code",
  writeLimiter,
  jwtSession.validateUser,
  configController.del
);
