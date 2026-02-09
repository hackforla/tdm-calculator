const router = require("express").Router();
const configController = require("../controllers/config.controller");
const jwtSession = require("../../middleware/jwt-session");
const rateLimit = require("express-rate-limit");

const configWriteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 write requests per windowMs
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // disable the `X-RateLimit-*` headers
});

module.exports = router;

router.get("/", configController.getAll);
router.get("/:code", configController.getByCode);
router.post(
  "/",
  configWriteLimiter,
  jwtSession.validateUser,
  configController.post
);
router.put(
  "/:code",
  configWriteLimiter,
  jwtSession.validateUser,
  configController.put
);
router.delete(
  "/:code",
  configWriteLimiter,
  jwtSession.validateUser,
  configController.del
);
