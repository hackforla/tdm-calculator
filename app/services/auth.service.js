// USE THESE SERVICES FOR PROTECTED ROUTES THAT NEED LOGIN

// See account.routes /getMessage for usage example

// This function verifies there is a token in the header if a request was made to a protected route.
// Header Format ==> { Authorization: Bearer <token> }
const verifyToken = (req, res, next) => {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    // split and get token from header
    const bearerToken = bearerHeader.split(" ")[1];

    // req.token will be added to the next function's request
    req.token = bearerToken; // set the token
    next(); // next middleware
  } else {
    //Forbidden
    res.sendStatus(403);
  }
};

module.exports = {
  verifyToken
};
