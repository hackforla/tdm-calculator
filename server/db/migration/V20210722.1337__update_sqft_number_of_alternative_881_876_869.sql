/**
 * #881 Remove "Sq Ft - " from page 2
 */
UPDATE CalculationRule
SET name='Retail'
WHERE calculationId=1 and code='SF_RETAIL';

UPDATE CalculationRule
SET name='Restaurant/Bar/General'
WHERE calculationId=1 and code='SF_RESTAURANT';

UPDATE CalculationRule
SET name='Health Club'
WHERE calculationId=1 and code='SF_HEALTH_CLUB';

UPDATE CalculationRule
SET name='Office, Business, Manufacturing, Industrial'
WHERE calculationId=1 and code='SF_OFFICE';

UPDATE CalculationRule
SET name='Retail Furniture'
WHERE calculationId=1 and code='SF_FURNITURE';

UPDATE CalculationRule
SET name='Warehouse'
WHERE calculationId=1 and code='SF_WAREHOUSE';

UPDATE CalculationRule
SET name='Medical Offices, Clinics, Service Facilities'
WHERE calculationId=1 and code='SF_INST_MEDICAL_SVC';

UPDATE CalculationRule
SET name='Other Institutional'
WHERE calculationId=1 and code='SF_INST_OTHER';

UPDATE CalculationRule
SET name='Government Institution'
WHERE calculationId=1 and code='SF_INST_GOV';

UPDATE CalculationRule
SET name='..... Trade School'
WHERE calculationId=1 and code='SF_TRADE_SCHOOL';

UPDATE CalculationRule
SET name='Take-out Restaurant'
WHERE calculationId=1 and code='SF_RESTAURANT_TAKEOUT';

UPDATE CalculationRule
SET name='Hospital'
WHERE calculationId=1 and code='SF_HOSPITAL';

UPDATE CalculationRule
SET name='Convalescent'
WHERE calculationId=1 and code='SF_CONVALESCENT';

/**
 * #876 Change "#" to "Number of" in page 2
 */
UPDATE CalculationRule
SET name='Number of Habitable Rooms < 3'
WHERE calculationId=1 and code='UNITS_HABIT_LT3';

UPDATE CalculationRule
SET name='Number of Habitable Rooms = 3'
WHERE calculationId=1 and code='UNITS_HABIT_3';

UPDATE CalculationRule
SET name='Number of Habitable Rooms > 3'
WHERE calculationId=1 and code='UNITS_HABIT_GT3';

UPDATE CalculationRule
SET name='Number of Guest Rooms'
WHERE calculationId=1 and code='UNITS_GUEST';