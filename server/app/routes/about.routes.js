const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");
const aboutController = require("../controllers/about.controller");

module.exports = router;

router.get("/", aboutController.get);
router.post(
  "/",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  aboutController.post
);
