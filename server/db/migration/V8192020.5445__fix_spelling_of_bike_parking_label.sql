/*
  Add note to Bike Parking label
*/
UPDATE CalculationRule SET
name = 'Bike Parking (req''d on all new developments)'
WHERE calculationId = 1 and code = 'STRATEGY_BIKE_4'