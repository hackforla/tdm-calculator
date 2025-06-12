const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");

const aboutController = require("../controllers/about.controller");

module.exports = router;

router.get("/", aboutController.get);
router.post("/", jwtSession.validateRoles(["isAdmin"]), aboutController.post);
