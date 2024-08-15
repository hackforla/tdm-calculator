const feedbackService = require("../services/feedback.service");
const {
  validate,
  validationErrorMiddleware
} = require("../../middleware/validate");
const feedbackPostSchema = require("../schemas/feedback.post");

const post = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    await feedbackService.post(userId, req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(err.code || 500).send(err);
  }
};

module.exports = {
  post: [
    validate({ body: feedbackPostSchema }),
    post,
    validationErrorMiddleware
  ]
};
