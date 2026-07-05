const environment = process.env.NODE_ENV || "development";
const ALLOWED_ADMIN_EMAIL_DOMAINS = ["lacity.org", "hackforla.org"];

let allowedDomains = ALLOWED_ADMIN_EMAIL_DOMAINS;

const ALLOWED_DEV_EMAIL_DOMAINS = [
  ...ALLOWED_ADMIN_EMAIL_DOMAINS, // admin in shared dev env use shared `hackforla.org` dev accounts
  "dispostable.com", // admin domain in local dev db (docker) env
  "test.com" // admin domain in test env
];

if (environment !== "production") {
  allowedDomains = ALLOWED_DEV_EMAIL_DOMAINS;
}

module.exports = {
  allowedAdminDomains: allowedDomains
};
