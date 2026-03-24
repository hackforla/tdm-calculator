const router = require("express").Router();
const debugController = require("../controllers/debug.controller");
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");

module.exports = router;

router.get("/memory", writeLimiter, debugController.memory);
router.get(
  "/heapdump",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  debugController.heapDump
);
