update calculationrule set
displayFunctionBody = 
' return !!<<LAND_USE_RESIDENTIAL>> ||
!!<<LAND_USE_COMMERCIAL>> ||
!!<<LAND_USE_WAREHOUSE>>;'
where calculationId = 1 and code = 'STRATEGY_PARKING_1'

update calculationrule set
displayFunctionBody = 
' return !!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>;'
where calculationId = 1 and code = 'STRATEGY_PARKING_2'