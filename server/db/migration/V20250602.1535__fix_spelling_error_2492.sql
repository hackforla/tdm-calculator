UPDATE dbo.CalculationRule
SET name = REPLACE(name, 'Requiremant', 'Requirement')
WHERE name LIKE '%Requiremant%';

UPDATE dbo.CalculationRule
SET name = REPLACE(name, 'Parkng', 'Parking')
WHERE name LIKE '%Parkng%';

UPDATE dbo.CalculationRule
SET name = REPLACE(name, 'Industial', 'Industrial')
WHERE name LIKE '%Industial%';