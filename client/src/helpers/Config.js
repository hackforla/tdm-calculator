import * as configService from "../services/config.service.js";

const redirectUri = `${window.location.origin}/login/callback`;

export const getConfigs = async () => {
  try {
    const response = await configService.getAll();
    if (response.data) {
      const configArray = response.data;
      const configObject = configArray.reduce((acc, curr) => {
        acc[curr.code] = curr.value;
        return acc;
      }, {});
      return configObject;
    } else return [];
  } catch (err) {
    return [err];
  }
};

export const getOidc = async () => {
  const configs = await getConfigs();
  const clientId = configs.OKTA_CLIENT_ID;
  const issuer = configs.OKTA_ISSUER;
  const disableHttpsCheck = configs.OKTA_TESTING_DISABLE_HTTPS_CHECK || "T";

  return {
    clientId,
    issuer,
    redirectUri,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck
  };
};
