const router = require("express").Router();
const playgroundController = require("../controllers/playground.controller");
const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

module.exports = router;

// using protected route for regular login accounts:
router.use(authService.verifyToken); //This works for all users logged in

router.get("/getAuthorizedStuffALL", playgroundController.getAuthorizedStuff);

// using protected routes for admin login accounts
router.use(authService.verifyAdminToken);

router.get(
  "/getAuthorizedStuffADMIN",
  playgroundController.getAuthorizedStuffADMIN
);

router.get(
  "/getAuthorizedStuffADMIN2",
  playgroundController.getAuthorizedStuffADMIN2
);

//original example of a protected route, with middleware inside each route.
router.get(
  "/getMessage",
  authService.verifyToken,
  playgroundController.getMessage
);

module.exports = router;
