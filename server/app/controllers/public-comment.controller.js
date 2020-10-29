const publicCommentService = require("../services/public-comment.service");

const post = async (req, res) => {
  try {
    await publicCommentService.postPublicComment(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  post
};
