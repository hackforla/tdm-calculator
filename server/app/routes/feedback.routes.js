const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const feedbackController = require("../controllers/feedback.controller");

module.exports = router;

router.post("/", jwtSession.optionalUser, feedbackController.post);
