/**
 * #915 Remove Affordable housing tooltip
 */
UPDATE CalculationRule
SET description=''
WHERE calculationId=1 and code='AFFORDABLE_HOUSING';