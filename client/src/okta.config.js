const OKTA_TESTING_DISABLEHTTPSCHECK = true;
// process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/login/callback`;

// Dev Okta
const ISSUER = "https://dev-50564150.okta.com/oauth2/default";
const CLIENT_ID = "0oaehwjjhx70xRh0O5d7";

// UAT Okta
// const ISSUER = "https://lacitypublic.oktapreview.com/oauth2/default"
// const CLIENT_ID = "0oabp5dgnwuGTqt5n1d7"

// eslint-disable-next-line
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
  }
};
