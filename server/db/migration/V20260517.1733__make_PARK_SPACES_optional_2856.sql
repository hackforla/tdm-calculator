/*
  Deliverately don't specify a calcuationId, so this retroacively
  makes PARK_SPACES optional for all existing progoram guidelines versions.
*/

UPDATE CalculationRule set required = 0
WHERE code = 'PARK_SPACES'