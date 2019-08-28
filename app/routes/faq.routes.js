const router = require("express").Router();

const faqController = require("../controllers/faq.controller");

module.exports = router;

router.get("/", faqController.get);
router.post("/", faqController.post);
router.put("/", faqController.put);
router.delete("/", faqController.del);
