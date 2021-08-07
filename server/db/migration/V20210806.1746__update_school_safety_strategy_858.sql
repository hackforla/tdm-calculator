update CalculationRule set
displayFunctionBody = 'return !!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_OTHER>> ||
	!!<<LAND_USE_SCHOOL>> ||
	!!<<LAND_USE_MAJOR>>;
	'
where calculationId = 1 and code = 'STRATEGY_INFO_5'