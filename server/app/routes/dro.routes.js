const router = require("express").Router();
const droController = require("../controllers/dro.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get("/", jwtSession.validateUser, droController.getAll);
router.get("/:id", jwtSession.validateUser, droController.getById);
router.post("/", jwtSession.validateUser, droController.post);
router.put("/:id", jwtSession.validateUser, droController.put);
router.delete("/:id", jwtSession.validateUser, droController.del);
