import * as configService from "../services/config.service";

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
