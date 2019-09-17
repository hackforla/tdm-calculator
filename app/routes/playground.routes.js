const router = require("express").Router();
const playgroundController = require("../controllers/playground.controller");
const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

module.exports = router;

//example of a protected route/controller/service
router.get(
  "/getMessage",
  authService.verifyToken,
  playgroundController.getMessage
);

router.get("/hi", (req, res) => {
  res.send("something hello world");
});
// a different example of protected route:

// (function authorized() {
//   const token = authService.verifyToken;
//   console.log("token", token);
//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//   return;
// })();

// router.use(authChecker)

router.get("/getAuthorizedStuff", playgroundController.getAuthorizedStuff);
