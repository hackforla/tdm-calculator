const router = require("express").Router();

const aboutRoutes = require("./about.routes");
const accountRoutes = require("./account.routes");
const calculationRoutes = require("./calculation.routes");
const faqCategoryRoutes = require("./faqCategory.routes");
const projectRoutes = require("./project.routes");
const feedbackRoutes = require("./feedback.routes");
const emailRoutes = require("./email.routes");
const configRoutes = require("./config.routes");
const droRoutes = require("./dro.routes");
const projectShare = require("./projectShare.routes");

module.exports = router;

router.use("/about", aboutRoutes);
router.use("/accounts", accountRoutes);
router.use("/calculations", calculationRoutes);
router.use("/projects", projectRoutes);
router.use("/faqcategories", faqCategoryRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/emails", emailRoutes);
router.use("/configs", configRoutes);
router.use("/dro", droRoutes);
router.use("/projectShare", projectShare);
