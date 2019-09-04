const router = require("express").Router();

const calculationRoutes = require("./calculation.routes");
const ruleRoutes = require("./rule.routes");
const accountRoutes = require("./account.routes");
const faqRoutes = require("./faq.routes");

module.exports = router;

router.use("/calculations", calculationRoutes);
router.use("/rules", ruleRoutes);
router.use("/account", accountRoutes);
router.use("/faq", faqRoutes);
