  UPDATE [dbo].[CalculationRule] 
  SET maxValue = 35.00
  WHERE calculationId = 1 AND CODE IN ('PTS_ACCESS_3','STRATEGY_APPLICANT')