

/* 
Start freah by clearing all the displayFunctionBody values
for measures.
*/
UPDATE CalculationRule SET
	displayFunctionBody = 'return true;'
WHERE calculationId =1 and category = 'measure'

/* Not applicable to Residential */
UPDATE CalculationRule SET
	displayFunctionBody = 'return
	!!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>;
	'
WHERE calculationId =1 and code in (
 'STRATEGY_BIKE_5',
 'STRATEGY_HOV_2',
  'STRATEGY_HOV_3',
    'STRATEGY_HOV_5',
	'STRATEGY_PARKING_2')

/* Not applicable to schools */
UPDATE CalculationRule SET
	displayFunctionBody = 'return
	!!<LAND_USE_RESIDENTIAL>> || 
	!!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_OTHER>>;
	'
WHERE calculationId =1 and code in (
	'STRATEGY_CAR_SHARE_1',
	'STRATEGY_CAR_SHARE_2',
	'STRATEGY_CAR_SHARE_3',
	'STRATEGY_CAR_SHARE_4',
	'STRATEGY_CAR_SHARE_ELECTRIC',
	'STRATEGY_CAR_SHARE_BONUS'
)

/* HOV Program, Neighborhood Shuttles */
UPDATE CalculationRule SET
	displayFunctionBody = 'return
	!!<LAND_USE_RESIDENTIAL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>;
	'
WHERE calculationId =1 and code in (
 'STRATEGY_HOV_4',
 'STRATEGY_TRANSIT_ACCESS_1'
 )

/* Pricing / Unbundling */
UPDATE CalculationRule SET
	displayFunctionBody = 'return
	!!<LAND_USE_RESIDENTIAL>>;
	'
WHERE calculationId =1 and code = 'STRATEGY_PARKING_1'

UPDATE CalculationRule SET
	displayFunctionBody = 'return
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_OTHER>>;
	'
WHERE calculationId =1 and code in (
'STRATEGY_TELECOMMUTE_1',
'STRATEGY_TELECOMMUTE_2'
)





