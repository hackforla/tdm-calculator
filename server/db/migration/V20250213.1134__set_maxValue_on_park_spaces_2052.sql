  ALTER TABLE CalculationRule
  ALTER COLUMN maxValue numeric(10,2) NULL


  UPDATE CalculationRule SET
	maxValue = 9999999
	WHERE calculationId = 1 and code = 'PARK_SPACES'