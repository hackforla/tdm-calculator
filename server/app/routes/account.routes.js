const router = require("express").Router();
const accountController = require("../controllers/account.controller");
const jwtSession = require("../../middleware/jwt-session");

router.get("/:id", jwtSession.validateUser, accountController.getById);
router.get(
  "/",
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.getAll
);

router.put(
  "/:id/roles",
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.putRoles
);

router.post("/register", accountController.register);
router.post(
  "/resendConfirmationEmail",
  accountController.resendConfirmationEmail
);
router.post("/confirmRegister", accountController.confirmRegister);

router.post("/forgotPassword", accountController.forgotPassword);
router.post("/resetPassword", accountController.resetPassword);

router.post("/login/:email?", accountController.login, jwtSession.login);
router.get("/logout", (req, res) => {
  console.log("logging out");
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
