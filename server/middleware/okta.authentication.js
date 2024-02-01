const OktaJwtVerifier = require("@okta/jwt-verifier");

/*
  Okta.authentication middleware.  This can be disabled for a deployment
  by omitting the env variable OKTA_CLIENT_ID
*/

const oktaJwtVerifier = process.env.OKTA_CLIENT_ID
  ? new OktaJwtVerifier({
      clientId: process.env.OKTA_CLIENT_ID,
      issuer: process.env.OKTA_ISSUER,
      assertClaims: {
        aud: process.env.OKTA_AUDIENCE,
        cid: process.env.OKTA_CLIENT_ID
      },
      testing: {
        disableHttpsCheck:
          process.env.OKTA_TESTING_DISABLEHTTPSCHECK &&
          process.env.OKTA_TESTING_DISABLEHTTPSCHECK.toLowerCase() === "true"
            ? true
            : false
      }
    })
  : null;

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next("Unauthorized");
  }

  const accessToken = match[1];
  const audience = process.env.OKTA_AUDIENCE;
  return oktaJwtVerifier
    .verifyAccessToken(accessToken, audience)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      res.status(401).send(err.message);
    });
}

module.exports = {
  authenticate
};
