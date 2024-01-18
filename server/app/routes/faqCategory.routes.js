const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");

const faqCategoryController = require("../controllers/faqCategory.controller");

module.exports = router;

router.get("/", faqCategoryController.get);
router.post(
  "/",
  jwtSession.validateRoles(["isAdmin"]),
  faqCategoryController.post
);

