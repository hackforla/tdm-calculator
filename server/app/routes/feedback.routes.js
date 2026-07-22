const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");
const feedbackController = require("../controllers/feedback.controller");

module.exports = router;

/**
 * @openapi
 * /feedbacks:
 *   post:
 *     tags:
 *       - Feedback
 *     summary: Submit public feedback.
 *     description: Accepts feedback with or without a valid user session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackPost'
 *     responses:
 *       200:
 *         description: Feedback was submitted.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post(
  "/",
  writeLimiter,
  jwtSession.optionalUser,
  feedbackController.post
);
