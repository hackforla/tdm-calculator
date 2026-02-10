const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");
const feedbackController = require("../controllers/feedback.controller");

module.exports = router;

router.post(
  "/",
  writeLimiter,
  jwtSession.optionalUser,
  feedbackController.post
);
