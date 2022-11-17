const router = require("express").Router();

const faqCategoryController = require("../controllers/faqCategory.controller");

module.exports = router;

router.get("/", faqCategoryController.get);
router.post("/", faqCategoryController.post);
router.put("/:id", faqCategoryController.put);
router.delete("/:id", faqCategoryController.del);
