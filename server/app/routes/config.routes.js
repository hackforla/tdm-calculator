const router = require("express").Router();
const configController = require("../controllers/config.controller");
const jwtSession = require("../../middleware/jwt-session");

module.exports = router;

router.get("/", configController.getAll);
router.get("/:code", configController.getByCode);
router.post("/", jwtSession.validateUser, configController.post);
router.put("/:code", jwtSession.validateUser, configController.put);
router.delete("/:code", jwtSession.validateUser, configController.del);
