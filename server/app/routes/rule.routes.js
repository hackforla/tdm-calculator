const router = require("express").Router();

const ruleController = require("../controllers/rule.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get("/:id", ruleController.getById);
router.get("/", ruleController.getAll);
router.post("/", jwtSession.validateRoles(["isAdmin"]), ruleController.post);
router.put("/:id", jwtSession.validateRoles(["isAdmin"]), ruleController.put);
router.delete("/", jwtSession.validateRoles(["isAdmin"]), ruleController.del);
