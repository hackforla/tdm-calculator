UPDATE CalculationRule SET
	functionBody = '// <<PKG_COMMERCIAL>>
return (<<PROJECT_LEVEL>> === 1 && !!<<STRATEGY_BIKE_4>> && !!<<STRATEGY_INFO_3>> && !!<<STRATEGY_PARKING_2>>) ? 1 : 0;'
WHERE calculationId = 1 and code = 'PTS_PKG_COMMERCIAL'