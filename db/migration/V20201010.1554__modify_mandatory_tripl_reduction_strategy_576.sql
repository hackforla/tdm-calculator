update CalculationRule SET  
  name = 'Mandatory Trip Reduction Program'
WHERE calculationId = 1 and code = 'STRATEGY_HOV_5'

update CalculationRule SET  
  minValue = 8, maxValue = 8,
  functionBody = 'return <<STRATEGY_HOV_5>> ? 8 : 0;'
WHERE calculationId = 1 and code = 'PTS_HOV_5'