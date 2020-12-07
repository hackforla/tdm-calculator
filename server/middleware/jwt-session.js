const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "mark it zero";
// JWT timeout set to 12 hours
const jwtOpts = { algorithm: "HS256", expiresIn: "12h" };

module.exports = {
  login,
  validateUser,
};

// This module manages the user's session using a JSON Web Token in the
// "authorization" cookie to manage the session.

// When a valid login request is
// received (as determined by authentication.authenticate middleware),
// we initiate a session by generating a token and returning it to
// the client. The token is returned as both an authorization cookie,
// as as a JSON response body (for clients that may not be able to
// work with cookies).
async function login(req, res) {
  const token = await sign({ email: req.user.email, id: req.user.id });
  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 43200000), // 12 hours
  });
  const user = req.user;
  res.json({ isSuccess: true, token: token, user });
}

// When a request is received for a route that requires an
// authenticated user, this middleware function validates that
// the authorization cookie has a valid JWT.
async function validateUser(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt;
  try {
    const payload = await verify(jwtString);

    if (payload.email) {
      req.user = payload;
      return next();
    }
  } catch (er) {
    res.status("401").send("Login session expired");
  }
}

// Helper function to create JWT token
async function sign(payload) {
  const token = await jwt.sign(payload, jwtSecret, jwtOpts);
  return token;
}

// Helper function to validate the JWT token
async function verify(jwtString = "") {
  jwtString = jwtString.replace(/^Bearer /i, "");
  return jwt.verify(jwtString, jwtSecret);
}
