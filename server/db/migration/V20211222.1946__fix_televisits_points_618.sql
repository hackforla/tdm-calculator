update CalculationRule set
	functionBody = 'return !!<<STRATEGY_TELECOMMUTE_2>> ? 3 : 0;'
where calculationId = 1 and code = 'PTS_TELECOMMUTE_2'