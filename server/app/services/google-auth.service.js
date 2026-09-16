const crypto = require("crypto");

const PROVIDER = "google";
const DEFAULT_ISSUER = "https://accounts.google.com";
const DEFAULT_SCOPE = "openid profile email";

let discoveryDocument;

const isDemoMode = () => process.env.GOOGLE_SSO_DEMO_MODE === "true";

const getConfig = () => {
  const issuer = process.env.GOOGLE_SSO_ISSUER || DEFAULT_ISSUER;
  const clientId = process.env.GOOGLE_SSO_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_SSO_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_SSO_REDIRECT_URI ||
    `${process.env.SERVER_URL}/api/accounts/google/callback`;

  return {
    issuer: issuer ? issuer.replace(/\/$/, "") : "",
    authorizationUrl: process.env.GOOGLE_SSO_AUTHORIZATION_URL,
    tokenUrl: process.env.GOOGLE_SSO_TOKEN_URL,
    jwksUrl: process.env.GOOGLE_SSO_JWKS_URL,
    hostedDomain: process.env.GOOGLE_SSO_HOSTED_DOMAIN,
    clientId,
    clientSecret,
    redirectUri,
    scope: process.env.GOOGLE_SSO_SCOPE || DEFAULT_SCOPE
  };
};

const getDemoUserProfile = () => ({
  externalAuthProvider: PROVIDER,
  externalSubject: process.env.GOOGLE_SSO_DEMO_SUBJECT || "demo-google-user",
  email: process.env.GOOGLE_SSO_DEMO_EMAIL || "google.demo@lacity.org",
  firstName: process.env.GOOGLE_SSO_DEMO_FIRST_NAME || "Google",
  lastName: process.env.GOOGLE_SSO_DEMO_LAST_NAME || "Demo"
});

const getDemoUserProfiles = () => [
  getDemoUserProfile(),
  {
    externalAuthProvider: PROVIDER,
    externalSubject: "demo-google-city-planner",
    email: "city.planner.demo@lacity.org",
    firstName: "City",
    lastName: "Planner"
  },
  {
    externalAuthProvider: PROVIDER,
    externalSubject: "demo-google-reviewer",
    email: "reviewer.demo@lacity.org",
    firstName: "Permit",
    lastName: "Reviewer"
  }
];

const getDemoUserProfileBySubject = subject =>
  getDemoUserProfiles().find(profile => profile.externalSubject === subject) ||
  getDemoUserProfile();

const createDemoLoginRequest = redirectPath => {
  const state = crypto.randomBytes(32).toString("hex");
  const nonce = crypto.randomBytes(32).toString("hex");
  return {
    authorizationUrl: `/api/accounts/google/demo?state=${state}`,
    state: {
      state,
      nonce,
      redirectPath: sanitizeRedirectPath(redirectPath)
    }
  };
};

const createDemoAuthorizationCode = (state, subject) =>
  Buffer.from(
    JSON.stringify({
      state,
      subject: getDemoUserProfileBySubject(subject).externalSubject,
      issuedAt: Date.now()
    }),
    "utf8"
  ).toString("base64url");

const exchangeDemoCode = (code, expectedState) => {
  let decodedCode;
  try {
    decodedCode = JSON.parse(Buffer.from(code, "base64url").toString("utf8"));
  } catch (err) {
    throw new Error("Google demo authorization code is invalid", {
      cause: err
    });
  }

  if (decodedCode.state !== expectedState) {
    throw new Error("Google demo authorization code state did not match");
  }

  return {
    access_token: Buffer.from(
      JSON.stringify({
        subject: decodedCode.subject,
        scope: DEFAULT_SCOPE,
        issuedAt: decodedCode.issuedAt
      }),
      "utf8"
    ).toString("base64url"),
    token_type: "Bearer",
    expires_in: 300
  };
};

const getDemoAccountInfo = accessToken => {
  let decodedToken;
  try {
    decodedToken = JSON.parse(
      Buffer.from(accessToken, "base64url").toString("utf8")
    );
  } catch (err) {
    throw new Error("Google demo access token is invalid", { cause: err });
  }

  return getDemoUserProfileBySubject(decodedToken.subject);
};

const assertConfigured = config => {
  const missing = [];
  if (!config.issuer) missing.push("GOOGLE_SSO_ISSUER");
  if (!config.clientId) missing.push("GOOGLE_SSO_CLIENT_ID");
  if (!config.clientSecret) missing.push("GOOGLE_SSO_CLIENT_SECRET");
  if (!config.redirectUri) missing.push("GOOGLE_SSO_REDIRECT_URI");

  if (missing.length > 0) {
    const err = new Error(
      `Google SSO is not configured: ${missing.join(", ")}`
    );
    err.code = "GOOGLE_SSO_NOT_CONFIGURED";
    throw err;
  }
};

const getDiscoveryDocument = async config => {
  if (discoveryDocument) return discoveryDocument;

  const response = await fetch(
    `${config.issuer}/.well-known/openid-configuration`
  );
  if (!response.ok) {
    throw new Error(`Unable to load Google OIDC metadata: ${response.status}`);
  }
  discoveryDocument = await response.json();
  return discoveryDocument;
};

const createLoginRequest = async redirectPath => {
  const config = getConfig();
  assertConfigured(config);
  const metadata = await getDiscoveryDocument(config);
  const state = crypto.randomBytes(32).toString("hex");
  const nonce = crypto.randomBytes(32).toString("hex");
  const authorizationEndpoint =
    config.authorizationUrl || metadata.authorization_endpoint;

  const authorizationUrl = new URL(authorizationEndpoint);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("client_id", config.clientId);
  authorizationUrl.searchParams.set("redirect_uri", config.redirectUri);
  authorizationUrl.searchParams.set("scope", config.scope);
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("nonce", nonce);
  authorizationUrl.searchParams.set("prompt", "select_account");
  if (config.hostedDomain) {
    authorizationUrl.searchParams.set("hd", config.hostedDomain);
  }

  return {
    authorizationUrl: authorizationUrl.toString(),
    state: {
      state,
      nonce,
      redirectPath: sanitizeRedirectPath(redirectPath)
    }
  };
};

const encodeStateCookie = state =>
  Buffer.from(JSON.stringify(state), "utf8").toString("base64url");

const decodeStateCookie = value => {
  if (!value) return null;
  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
  } catch {
    return null;
  }
};

const exchangeCode = async code => {
  const config = getConfig();
  assertConfigured(config);
  const metadata = await getDiscoveryDocument(config);
  const tokenEndpoint = config.tokenUrl || metadata.token_endpoint;

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: config.redirectUri,
      client_id: config.clientId,
      client_secret: config.clientSecret
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google token exchange failed: ${response.status} ${body}`);
  }

  return response.json();
};

const verifyIdToken = async (idToken, nonce) => {
  const config = getConfig();
  assertConfigured(config);
  const metadata = await getDiscoveryDocument(config);
  const { createRemoteJWKSet, jwtVerify } = await eval('import("jose")');
  const jwksUri = config.jwksUrl || metadata.jwks_uri;
  const jwks = createRemoteJWKSet(new URL(jwksUri));
  const { payload } = await jwtVerify(idToken, jwks, {
    issuer: config.issuer,
    audience: config.clientId
  });

  if (payload.nonce !== nonce) {
    throw new Error("Google ID token nonce did not match login request");
  }

  return payload;
};

const getUserProfile = claims => {
  if (!claims.sub) {
    throw new Error("Google ID token is missing subject");
  }
  if (!claims.email) {
    throw new Error("Google ID token is missing email");
  }

  const nameParts = (claims.name || "").trim().split(/\s+/).filter(Boolean);
  const firstName = claims.given_name || nameParts[0] || "Google";
  const lastName = claims.family_name || nameParts.slice(1).join(" ") || "User";

  return {
    externalAuthProvider: PROVIDER,
    externalSubject: claims.sub,
    email: claims.email,
    firstName: firstName.slice(0, 50),
    lastName: lastName.slice(0, 50)
  };
};

const sanitizeRedirectPath = redirectPath => {
  if (!redirectPath || typeof redirectPath !== "string") return "/";
  if (!redirectPath.startsWith("/") || redirectPath.startsWith("//")) {
    return "/";
  }
  return redirectPath;
};

module.exports = {
  createDemoAuthorizationCode,
  createDemoLoginRequest,
  createLoginRequest,
  decodeStateCookie,
  encodeStateCookie,
  exchangeDemoCode,
  exchangeCode,
  getDemoAccountInfo,
  getDemoUserProfile,
  getDemoUserProfiles,
  getUserProfile,
  isDemoMode,
  verifyIdToken
};
