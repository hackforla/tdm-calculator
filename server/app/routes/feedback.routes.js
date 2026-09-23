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
 *     summary: Submit feedback.
 *     description: Submits user feedback and optional associated project IDs. Requires an authenticated user session.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackPost'
 *     responses:
 *       201:
 *         description: Feedback was submitted.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post(
  "/",
  writeLimiter,
  jwtSession.validateUser,
  feedbackController.post
);
