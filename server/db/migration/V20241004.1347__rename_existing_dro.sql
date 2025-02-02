UPDATE dbo.Dro
SET name = 'Metro'
WHERE name = 'Metro Development Review';

UPDATE dbo.Dro
SET name = 'Valley'
WHERE name = 'Valley Development Review';

UPDATE dbo.Dro
SET name = 'West LA'
WHERE name = 'West Los Angeles Development Review';

UPDATE dbo.Dro
SET displayOrder = 1
WHERE name = 'Metro';

UPDATE dbo.Dro
SET displayOrder = 2
WHERE name = 'Valley';

UPDATE dbo.Dro
SET displayOrder = 3
WHERE name = 'West LA';