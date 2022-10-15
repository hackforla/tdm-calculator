UPDATE CalculationRule SET
	displayFunctionBody = 'return (!!<<STRATEGY_CAR_SHARE_1>>) ||
	(!!<<STRATEGY_CAR_SHARE_3>>) ||
	(!!<<STRATEGY_CAR_SHARE_4>>) &&
(!!<<LAND_USE_RESIDENTIAL>> || 
	!!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_OTHER>>);
	'
    
WHERE calculationId =1 and code in ( 'STRATEGY_CAR_SHARE_ELECTRIC')

UPDATE CalculationRule SET
	displayFunctionBody = 'return (!!<<STRATEGY_TRANSIT_ACCESS_1>>)
    '
    
WHERE calculationId =1 and code in ( 'STRATEGY_TRANSIT_ACCESS_5')