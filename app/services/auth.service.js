const jwt = require("jsonwebtoken");

// USE THESE SERVICES FOR PROTECTED ROUTES THAT NEED LOGIN
// Add ==> router.use(authService.verifyAdminToken) or router.use(authService.verifyToken) before all protected routes

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    const decoded = await jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
    req.account = decoded.account;
    next();
  } else {
    res.sendStatus(403); //Forbidden
  }
};

const verifyAdminToken = async (req, res, next) => {
  if (req.account.role === "developer") {
    next();
  } else {
    res.sendStatus(403); //Forbidden
  }
};

module.exports = {
  verifyToken,
  verifyAdminToken
};
