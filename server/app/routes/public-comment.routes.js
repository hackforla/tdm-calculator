const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const publicCommentController = require("../controllers/public-comment.controller");

module.exports = router;

router.post("/", jwtSession.validateUser, publicCommentController.post);
