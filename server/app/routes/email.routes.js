const router = require("express").Router();
const emailController = require("../controllers/email.controller");
const jwtSession = require("../../middleware/jwt-session");
const rateLimit = require("express-rate-limit");

const emailRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs for this route
});

router.post("/", emailRateLimiter, jwtSession.validateRoles(["isAdmin"]), emailController.send);

module.exports = router;
