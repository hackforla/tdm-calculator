const router = require("express").Router();
const accountController = require("../controllers/account.controller");
const authService = require("../services/auth.service");

module.exports = router;

router.post("/register", accountController.postRegister);
router.post("/login", accountController.postLogin);

//example of a protected route/controller/service
router.get(
  "/getMessage",
  authService.verifyToken,
  accountController.getMessage
);
