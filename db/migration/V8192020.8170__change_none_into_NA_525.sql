UPDATE 
    [dbo].[CalculationRule]
SET
    choices = REPLACE(choices, '"name": "none"','"name": "N/A"')
WHERE
    dataType ='choice' and choices like '%"name": "none"%';