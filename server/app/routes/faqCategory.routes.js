const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");
const { writeLimiter } = require("../../middleware/rateLimiter");
const faqCategoryController = require("../controllers/faqCategory.controller");

module.exports = router;

router.get("/", faqCategoryController.get);
router.post(
  "/",
  writeLimiter,
  jwtSession.validateRoles(["isAdmin"]),
  faqCategoryController.post
);
