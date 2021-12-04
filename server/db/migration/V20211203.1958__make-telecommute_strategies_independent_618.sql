UPDATE CalculationRule SET 
functionBody = 'return !!<<STRATEGY_TELECOMMUTE_2>>;'
where calculationId = 1 and code = 'PTS_TELECOMMUTE_2'