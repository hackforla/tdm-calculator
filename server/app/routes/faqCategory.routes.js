const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");

const faqCategoryController = require("../controllers/faqCategory.controller");

module.exports = router;

router.get("/", faqCategoryController.get);
router.get("/:id", faqCategoryController.getById);
router.post(
  "/",
  jwtSession.validateRoles(["isAdmin"]),
  faqCategoryController.postAll
);
router.put(
  "/:id",
  jwtSession.validateRoles(["isAdmin"]),
  faqCategoryController.put
);
router.delete(
  "/:id",
  jwtSession.validateRoles(["isAdmin"]),
  faqCategoryController.del
);
