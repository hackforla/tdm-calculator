import * as droService from "../services/dro.service";

export const fetchDroOptions = async setDroOptions => {
  try {
    const result = await droService.get();
    setDroOptions(result.data);
  } catch (error) {
    console.error("Error fetching DRO options:", error);
  }
};
