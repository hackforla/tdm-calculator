const router = require("express").Router();

const ruleController = require("../controllers/rule.controller");

module.exports = router;

router.get("/:id", ruleController.getById);
router.get("/", ruleController.getAll);
router.post("/", ruleController.post);
router.put("/:id", ruleController.put);
router.delete("/", ruleController.del);
