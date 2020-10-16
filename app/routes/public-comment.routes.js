const router = require("express").Router();

const publicCommentController = require("../controllers/public-comment.controller");

module.exports = router;

router.post("/", publicCommentController.post);
