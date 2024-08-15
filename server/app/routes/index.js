const router = require("express").Router();

const calculationRoutes = require("./calculation.routes");
const accountRoutes = require("./account.routes");
const faqCategoryRoutes = require("./faqCategory.routes");
const projectRoutes = require("./project.routes");
const feedbackRoutes = require("./feedback.routes");
const emailRoutes = require("./email.routes");
const configRoutes = require("./config.routes");

module.exports = router;

router.use("/accounts", accountRoutes);
router.use("/calculations", calculationRoutes);
router.use("/projects", projectRoutes);
router.use("/faqcategories", faqCategoryRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/emails", emailRoutes);
router.use("/configs", configRoutes);
