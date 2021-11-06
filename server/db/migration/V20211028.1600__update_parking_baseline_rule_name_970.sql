/**
 * #970 Change name in summary page
 */

UPDATE CalculationRule
SET name=N'Citywide Parking Baseline'
WHERE calculationId=1 and code=N'PARK_REQUIREMENT';