const router = require("express").Router();

const calculationController = require("../controllers/calculation.controller");
const ruleController = require("../controllers/rule.controller");

module.exports = router;

router.get("/:id", calculationController.getById);
// Get all the rules for a calculation
router.get("/:id/rules", ruleController.getByCalculationId);
router.get("/", calculationController.getAll);
router.post("/", calculationController.post);
router.put("/:id", calculationController.put);
router.delete("/", calculationController.del);
