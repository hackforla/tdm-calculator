update CalculationRule SET displayFunctionBody = 
'return (!!<<LAND_USE_RESIDENTIAL>> || 
	!!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_OTHER>>) && (<<PARK_SPACES>> > 0);'
	where CalculationId = 1 and Code = 'STRATEGY_CAR_SHARE_1'

