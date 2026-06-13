const router = require("express").Router();
const droController = require("../controllers/dro.controller");
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");

module.exports = router;

router.get("/", droController.getAll);
router.get("/:id", droController.getById);
router.post(
  "/",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  droController.post
);
router.put(
  "/:id",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  droController.put
);
router.delete(
  "/:id",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  droController.del
);
