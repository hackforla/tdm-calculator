const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");
const calculationController = require("../controllers/calculation.controller");
const ruleController = require("../controllers/rule.controller");

module.exports = router;

router.get("/includeRules/:id", calculationController.getByIdIncludeRules);
router.get("/includeRules", calculationController.getAllIncludeRules);

router.get("/:id", calculationController.getById);
// Get all the rules for one calculation
/**
 * @openapi
 * /calculations/{id}/rules:
 *   get:
 *     tags:
 *       - Calculations
 *     summary: Get rules for a calculation.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Calculation rules were returned.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id/rules", ruleController.getByCalculationId);
/**
 * @openapi
 * /calculations:
 *   get:
 *     tags:
 *       - Calculations
 *     summary: List calculations.
 *     responses:
 *       200:
 *         description: Calculations were returned.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", calculationController.getAll);
router.put(
  "/updateDescription/:id",
  writeLimiter,
  jwtSession.validateUser,
  jwtSession.validateRoles(["isAdmin"]),
  ruleController.updateDescription
);
