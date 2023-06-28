const router = require("express").Router();
const jwtSession = require("../../middleware/jwt-session");

const faqController = require("../controllers/faq.controller");

module.exports = router;

router.get("/", faqController.get);
router.get("/:id", faqController.getById);
router.post("/", jwtSession.validateRoles(["isAdmin"]), faqController.post);
router.put("/:id", jwtSession.validateRoles(["isAdmin"]), faqController.put);
router.delete("/:id", jwtSession.validateRoles(["isAdmin"]), faqController.del);
