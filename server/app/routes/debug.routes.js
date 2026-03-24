const router = require("express").Router();
const debugController = require("../controllers/debug.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get("/memory", debugController.memory);
router.get(
  "/heapdump",
  jwtSession.validateRoles(["isAdmin"]),
  debugController.heapDump
);
