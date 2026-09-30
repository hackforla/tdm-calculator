const crypto = require("crypto");

const PROVIDER = "angeleno";
const DEFAULT_SCOPE = "openid profile email";

let discoveryDocument;

const isDemoMode = () => process.env.ANGELENO_DEMO_MODE === "true";

const getConfig = () => {
  const issuer = process.env.ANGELENO_ISSUER;
  const clientId = process.env.ANGELENO_CLIENT_ID;
  const clientSecret = process.env.ANGELENO_CLIENT_SECRET;
  const redirectUri =
    process.env.ANGELENO_REDIRECT_URI ||
    `${process.env.SERVER_URL}/api/accounts/angeleno/callback`;

  return {
    issuer: issuer ? issuer.replace(/\/$/, "") : "",
    authorizationUrl: process.env.ANGELENO_AUTHORIZATION_URL,
    tokenUrl: process.env.ANGELENO_TOKEN_URL,
    jwksUrl: process.env.ANGELENO_JWKS_URL,
    clientId,
    clientSecret,
    redirectUri,
    scope: process.env.ANGELENO_SCOPE || DEFAULT_SCOPE
  };
};

const getDemoUserProfile = () => ({
  externalAuthProvider: PROVIDER,
  externalSubject: process.env.ANGELENO_DEMO_SUBJECT || "demo-angeleno-user",
  email: process.env.ANGELENO_DEMO_EMAIL || "angeleno.demo@example.com",
  firstName: process.env.ANGELENO_DEMO_FIRST_NAME || "Angeleno",
  lastName: process.env.ANGELENO_DEMO_LAST_NAME || "Demo"
});

const getDemoUserProfiles = () => [
  getDemoUserProfile(),
  {
    externalAuthProvider: PROVIDER,
    externalSubject: "demo-angeleno-applicant",
    email: "applicant.demo@example.com",
    firstName: "Project",
    lastName: "Applicant"
  },
  {
    externalAuthProvider: PROVIDER,
    externalSubject: "demo-angeleno-owner",
    email: "owner.demo@example.com",
    firstName: "Property",
    lastName: "Owner"
  }
];

const getDemoPassword = () =>
  process.env.ANGELENO_DEMO_PASSWORD || "DemoPass1!";

const getDemoUserProfileBySubject = subject =>
  getDemoUserProfiles().find(profile => profile.externalSubject === subject) ||
  getDemoUserProfile();

const getDemoUserProfileByEmail = email =>
  getDemoUserProfiles().find(
    profile => profile.email.toLowerCase() === String(email).toLowerCase()
  );

const authenticateDemoCredentials = (username, password) => {
  const profile = getDemoUserProfileByEmail(username);
  if (!profile || password !== getDemoPassword()) return null;
  return profile;
};

const createDemoLoginRequest = redirectPath => {
  const state = crypto.randomBytes(32).toString("hex");
  const nonce = crypto.randomBytes(32).toString("hex");
  return {
    authorizationUrl: `/api/accounts/angeleno/demo?state=${state}`,
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
    throw new Error("Angeleno demo authorization code is invalid", {
      cause: err
    });
  }

  if (decodedCode.state !== expectedState) {
    throw new Error("Angeleno demo authorization code state did not match");
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
    throw new Error("Angeleno demo access token is invalid", { cause: err });
  }

  return getDemoUserProfileBySubject(decodedToken.subject);
};

const assertConfigured = config => {
  const missing = [];
  if (!config.issuer) missing.push("ANGELENO_ISSUER");
  if (!config.clientId) missing.push("ANGELENO_CLIENT_ID");
  if (!config.clientSecret) missing.push("ANGELENO_CLIENT_SECRET");
  if (!config.redirectUri) missing.push("ANGELENO_REDIRECT_URI");

  if (missing.length > 0) {
    const err = new Error(
      `Angeleno Account is not configured: ${missing.join(", ")}`
    );
    err.code = "ANGELENO_NOT_CONFIGURED";
    throw err;
  }
};

const getDiscoveryDocument = async config => {
  if (discoveryDocument) return discoveryDocument;

  const response = await fetch(
    `${config.issuer}/.well-known/openid-configuration`
  );
  if (!response.ok) {
    throw new Error(
      `Unable to load Angeleno OIDC metadata: ${response.status}`
    );
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
    throw new Error(
      `Angeleno token exchange failed: ${response.status} ${body}`
    );
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
    throw new Error("Angeleno ID token nonce did not match login request");
  }

  return payload;
};

const getUserProfile = claims => {
  if (!claims.sub) {
    throw new Error("Angeleno ID token is missing subject");
  }
  if (!claims.email) {
    throw new Error("Angeleno ID token is missing email");
  }

  const nameParts = (claims.name || "").trim().split(/\s+/).filter(Boolean);
  const firstName = claims.given_name || nameParts[0] || "Angeleno";
  const lastName =
    claims.family_name || nameParts.slice(1).join(" ") || "Account";

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
  authenticateDemoCredentials,
  createDemoLoginRequest,
  createDemoAuthorizationCode,
  createLoginRequest,
  decodeStateCookie,
  encodeStateCookie,
  exchangeDemoCode,
  exchangeCode,
  getDemoAccountInfo,
  getDemoPassword,
  getDemoUserProfile,
  getDemoUserProfiles,
  getUserProfile,
  isDemoMode,
  verifyIdToken
};
