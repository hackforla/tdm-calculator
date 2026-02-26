import * as calculationService from "../services/calculation.service";

/*
  Gets all calculations from the database, and returns a dictionary with the 
  calculationId as the key and the calculation value as the value.
  e.g. { 1: {...}, 2: {...}, ... }

  NOTE: If there many different calculations, we may want to consider only fetching
  the calculations that are needed instead of all calculations.
*/
export const getCalculations = async () => {
  try {
    const response = await calculationService.get(true);
    if (response.data) {
      const calculationsArray = response.data;
      const calculationsObject = calculationsArray.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      return calculationsObject;
    } else return [];
  } catch (err) {
    return [err];
  }
};
