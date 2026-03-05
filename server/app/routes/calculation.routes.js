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
router.get("/:id/rules", ruleController.getByCalculationId);
router.get("/", calculationController.getAll);
router.put(
  "/updateDescription/:id",
  writeLimiter,
  jwtSession.validateUser,
  jwtSession.validateRoles(["isAdmin"]),
  ruleController.updateDescription
);
