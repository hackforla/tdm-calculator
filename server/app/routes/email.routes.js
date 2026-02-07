const router = require("express").Router();
const emailController = require("../controllers/email.controller");
const jwtSession = require("../../middleware/jwt-session");

router.post("/", jwtSession.validateRoles(["isAdmin"]), emailController.send);

module.exports = router;
