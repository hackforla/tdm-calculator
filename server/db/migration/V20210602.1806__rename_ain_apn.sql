UPDATE [dbo].[CalculationRule]
SET
  name = 'AIN/APN (Assessor’s Identification Number)',
  description = 'Look up your AIN'
WHERE calculationid = 1 AND code ='APN';