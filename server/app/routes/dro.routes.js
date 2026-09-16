const router = require("express").Router();
const droController = require("../controllers/dro.controller");
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");

module.exports = router;

router.get("/", droController.getAll);
router.get("/:id", droController.getById);
/**
 * @openapi
 * /dro:
 *   post:
 *     tags:
 *       - DRO
 *     summary: Create a Development Review Office entry.
 *     description: Requires an admin session.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dro'
 *     responses:
 *       200:
 *         description: DRO entry was created.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post(
  "/",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  droController.post
);
router.put(
  "/:id",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  droController.put
);
router.delete(
  "/:id",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  droController.del
);
