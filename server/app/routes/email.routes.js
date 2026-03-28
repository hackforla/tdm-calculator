const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");
const emailController = require("../controllers/email.controller");

router.post(
  "/",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  emailController.send
);

module.exports = router;
