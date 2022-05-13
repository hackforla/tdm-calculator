UPDATE CalculationRule SET
displayFunctionBody = '
	return !<<STRATEGY_PARKING_2>> &&   
(!!<<LAND_USE_RESIDENTIAL>> ||
!!<<LAND_USE_COMMERCIAL>> ||
!!<<LAND_USE_WAREHOUSE>> ||
!!<<LAND_USE_HOTEL>>);	
'
WHERE calculationid = 1 and code = 'STRATEGY_PARKING_1'