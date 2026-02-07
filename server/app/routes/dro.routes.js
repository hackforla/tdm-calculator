const router = require("express").Router();
const droController = require("../controllers/dro.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get("/", jwtSession.validateUser, droController.getAll);
router.get("/:id", jwtSession.validateUser, droController.getById);
router.post("/", jwtSession.validateRoles(["isAdmin"]), droController.post);
router.put("/:id", jwtSession.validateRoles(["isAdmin"]), droController.put);
router.delete("/:id", jwtSession.validateRoles(["isAdmin"]), droController.del);
