update CalculationRule SET displayFunctionBody = 
'return (!!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>) && (<<PARK_SPACES>> > 0);'
	where CalculationId = 1 and Code = 'STRATEGY_HOV_3'

update CalculationRule SET displayFunctionBody = 
'return !<<STRATEGY_PARKING_2>> &&
	( !!<<LAND_USE_RESIDENTIAL>> ||
	!!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>) && (<<PARK_SPACES>> > 0);'
	where CalculationId = 1 and Code = 'STRATEGY_PARKING_1'

update CalculationRule SET displayFunctionBody = 
'return !<<STRATEGY_PARKING_1>> && (<<PARK_SPACES>> > 0) &&
	( !!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>);'
	where CalculationId = 1 and Code = 'STRATEGY_PARKING_2'

update CalculationRule SET displayFunctionBody = 
'return <<PARK_SPACES>> > 0;'
	where CalculationId = 1 and Code = 'STRATEGY_PARKING_4'