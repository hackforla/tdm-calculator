UPDATE CalculationRule SET 
displayFunctionBody = 'return !<<STRATEGY_PARKING_2>> &&   
(!!<<LAND_USE_RESIDENTIAL>> ||
!!<<LAND_USE_COMMERCIAL>> ||
!!<<LAND_USE_WAREHOUSE>>);	',
description = 'Pricing of parking encourages sustainable modes of travel (non-SOV) and can be accomplished in several ways. 
Property managers and homeowner associations can unbundle the price of parking from rents or sale of units. 
The parking cost is set by the project applicant and paid by the vehicle owners/drivers.'
where calculationId = 1 and code = 'STRATEGY_PARKING_1'

UPDATE CalculationRule SET 
displayFunctionBody = 'return (!<<STRATEGY_PARKING_1>> && <<STRATEGY_PARKING_1>> !== "0") &&
( !!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>);	'
where calculationId = 1 and code = 'STRATEGY_PARKING_2'