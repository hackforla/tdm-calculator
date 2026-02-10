const router = require("express").Router();
const accountController = require("../controllers/account.controller");
const jwtSession = require("../../middleware/jwt-session");
const { loginLimiter, writeLimiter } = require("../../middleware/rateLimiter");

// router.get("/:id", jwtSession.validateUser, accountController.getById);
router.get(
  "/",
  writeLimiter,
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.getAll
);

router.put(
  "/:id/roles",
  writeLimiter,
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.putRoles
);

router.post("/register", writeLimiter, accountController.register);
router.post(
  "/resendConfirmationEmail",
  writeLimiter,
  accountController.resendConfirmationEmail
);
router.post(
  "/confirmRegister",
  writeLimiter,
  accountController.confirmRegister
);

router.post("/forgotPassword", writeLimiter, accountController.forgotPassword);
router.post("/resetPassword", writeLimiter, accountController.resetPassword);

router.post(
  "/login/:email?",
  loginLimiter,
  accountController.login,
  jwtSession.login
);
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
  "/updateaccount",
  writeLimiter,
  jwtSession.validateUser,
  accountController.updateAccount
);

router.put(
  "/:id/archiveaccount",
  writeLimiter,
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.archiveById
);

router.put(
  "/:id/unarchiveaccount",
  writeLimiter,
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.unarchiveById
);

router.get(
  "/archivedaccounts",
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.getAllArchivedUsers
);

router.get(
  "/droLogins",
  jwtSession.validateRoles(["isAdmin"]),
  accountController.getAllDROUsers
);

router.delete(
  "/:id/deleteaccount",
  writeLimiter,
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.deleteById
);

module.exports = router;
