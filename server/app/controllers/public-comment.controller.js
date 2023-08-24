const publicCommentService = require("../services/public-comment.service");

const post = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    await publicCommentService.postPublicComment(userId, req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(err.code || 500).send(err);
  }
};

module.exports = {
  post
};
