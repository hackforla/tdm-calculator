const router = require("express").Router();
const accountController = require("../controllers/account.controller");
const jwtSession = require("../../middleware/jwt-session");

// router.get("/:id", jwtSession.validateUser, accountController.getById);
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
  // Clear the "jwt" cookie
  res.clearCookie("jwt", { httpOnly: true });
  // res.redirect("/login");
  // Additional logic, such as redirecting to the login page
  setTimeout(() => {
    // Respond after the delay
    res.send("Logout successful");
  }, 10);
});

router.put(
  "/:id/updateaccount",
  jwtSession.validateUser,
  accountController.updateAccount
);

router.put(
  "/:id/archiveaccount",
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.archiveById
);

router.put(
  "/:id/unarchiveaccount",
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.unarchiveById
);

router.get(
  "/archivedaccounts",
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.getAllArchivedUsers
);

router.delete(
  "/:id/deleteaccount",
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.deleteById
);

module.exports = router;
