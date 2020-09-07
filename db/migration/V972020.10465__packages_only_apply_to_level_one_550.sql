UPDATE CalculationRule SET
	displayFunctionBody = 'return !!<<LAND_USE_RESIDENTIAL>> && <<PROJECT_LEVEL>> === 1;'
WHERE calculationId = 1 and code = 'PKG_RESIDENTIAL'

UPDATE CalculationRule SET
	displayFunctionBody = 'return (!!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>) && <<PROJECT_LEVEL>> === 1;'
WHERE calculationId = 1 and code = 'PKG_COMMERCIAL'

UPDATE CalculationRule SET
	functionBody = '// <<PKG_RESIDENTIAL>>
return (<<PROJECT_LEVEL>> === 1 && !!<<STRATEGY_BIKE_4>> && !!<<STRATEGY_INFO_3>> && !!(<<STRATEGY_PARKING_1>> === 8)) ? 1 : 0;
'
WHERE calculationId = 1 and code = 'PTS_PKG_RESIDENTIAL'

UPDATE CalculationRule SET
	functionBody = '// <<PKG_COMMERCIAL>>
return (<<PROJECT_LEVEL>> === 1 !!<<STRATEGY_BIKE_4>> && !!<<STRATEGY_INFO_3>> && !!<<STRATEGY_PARKING_2>>) ? 1 : 0;'
WHERE calculationId = 1 and code = 'PTS_PKG_COMMERCIAL'