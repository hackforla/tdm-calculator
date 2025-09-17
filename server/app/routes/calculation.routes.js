const router = require("express").Router();

const calculationController = require("../controllers/calculation.controller");
const ruleController = require("../controllers/rule.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get("/:id", calculationController.getById);
// Get all the rules for a calculation
router.get("/:id/rules", ruleController.getByCalculationId);
router.get("/", calculationController.getAll);
router.put(
  "/updateDescription/:id",
  jwtSession.validateUser,
  jwtSession.validateRoles(["isAdmin"]),
  ruleController.updateDescription
);
