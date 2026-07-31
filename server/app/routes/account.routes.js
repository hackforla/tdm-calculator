const router = require("express").Router();
const accountController = require("../controllers/account.controller");
const jwtSession = require("../../middleware/jwt-session");
const { loginLimiter, writeLimiter } = require("../../middleware/rateLimiter");

// router.get("/:id", jwtSession.validateUser, accountController.getById);
/**
 * @openapi
 * /accounts:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: List all user accounts.
 *     description: Requires a security admin session.
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Accounts were returned.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
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

/**
 * @openapi
 * /accounts/register:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Register a new account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccountRegister'
 *     responses:
 *       200:
 *         description: Account registration completed or returned a registration result.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
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

/**
 * @openapi
 * /accounts/login:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Log in and create a JWT session.
 *     description: Current clients send email in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccountLogin'
 *     responses:
 *       200:
 *         description: Login result. Successful responses also set the jwt cookie.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
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
  "/cleanup-inactive",
  writeLimiter,
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.cleanupInactive
);

router.delete(
  "/:id/deleteaccount",
  writeLimiter,
  jwtSession.validateRoles(["isSecurityAdmin"]),
  accountController.deleteById
);

module.exports = router;
