/* 

  TODO: The domains might get moved into the `.env` file.

  In `.env` file:
  # Admin domains allowed in all environments
    ALLOWED_ADMIN_EMAIL_DOMAINS=lacity.org,hackforla.org

  # Additional domains specifically for non-production environments
    ALLOWED_DEV_EMAIL_DOMAINS=dispostable.com,test.com


  In `config`, parse process.env variables:
    const getDomainList = (domain) => {
    return domain ? domain.split(",").map(domainList => domainList.trim()) : ["lacity.org"]; // default to strictest 
  };  

*/

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
