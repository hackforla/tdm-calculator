update CalculationRule SET  
  minValue = 8, maxValue = 8,
  functionBody = 'return <<STRATEGY_HOV_5>> ? 8 : 0;'
WHERE calculationId = 1 and code = 'PTS_TRANSIT_ACCESS_1'

update CalculationRule SET  
  minValue = 5
WHERE calculationId = 1 and code = 'STRATEGY_MOBILITY_INVESTMENT_1'

update CalculationRule SET  
  calcCode = 'PTS_TELECOMMUTE_1'
WHERE calculationId = 1 and code = 'STRATEGY_TELECOMMUTE_1'

update CalculationRule SET  
  functionBody = 'return !!<<STRATEGY_TELECOMMUTE_2>> && !!<<PTS_TELECOMMUTE_1>> ? 3 : 0'
WHERE calculationId = 1 and code = 'PTS_TELECOMMUTE_2'

update CalculationRule SET  
  minValue = 4
WHERE calculationId = 1 and code = 'STRATEGY_APPLICANT'
