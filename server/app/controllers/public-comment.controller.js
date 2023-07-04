const publicCommentService = require("../services/public-comment.service");

const post = async (req, res) => {
  try {
    await publicCommentService.postPublicComment(req.user.id, req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(err.code || 500).send(err);
  }
};

module.exports = {
  post
};
