

UPDATE CalculationRule SET
	functionBody = 'return !!<<SF_HOSPITAL>> || !!<<SF_CONVALESCENT>> || !!<<SF_INST_MEDICAL_SVC>>;
	'
WHERE calculationId =1 and code = 'LAND_USE_MEDICAL'

UPDATE CalculationRule SET  
  displayFunctionBody = 'return true;'
WHERE calculationId = 1 and code = 'PTS_TELECOMMUTE'

/* 
Start freah by clearing all the displayFunctionBody values
for measures.
*/
UPDATE CalculationRule SET
	displayFunctionBody = 'return true;'
WHERE calculationId =1 and category = 'measure'

UPDATE CalculationRule SET
	displayFunctionBody = 'return !!<<LAND_USE_RESIDENTIAL>>;'
WHERE calculationId = 1 and code in (
	'PKG_RESIDENTIAL',
	'STRATEGY_AFFORDABLE'
)

/* Not applicable to Residential */
UPDATE CalculationRule SET
	displayFunctionBody = 'return !!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>;
	'
WHERE calculationId =1 and code in (
 'STRATEGY_BIKE_5',
 'STRATEGY_HOV_2',
  'STRATEGY_HOV_3',
	'STRATEGY_PARKING_2',
	'PKG_COMMERCIAL')

/* Not applicable to schools */
UPDATE CalculationRule SET
	displayFunctionBody = 'return !!<<LAND_USE_RESIDENTIAL>> || 
	!!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
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
	displayFunctionBody = 'return !!<<LAND_USE_RESIDENTIAL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
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
	displayFunctionBody = 'return !!<<LAND_USE_RESIDENTIAL>>;
	'
WHERE calculationId =1 and code = 'STRATEGY_PARKING_1'

UPDATE CalculationRule SET
	displayFunctionBody = 'return !!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_OTHER>>;
	'
WHERE calculationId =1 and code in (
'STRATEGY_TELECOMMUTE_1',
'STRATEGY_TELECOMMUTE_2'
)

/* Trip Reduction applies to all land uses except
residential, as long as Encouragement Program is not selected
*/
UPDATE CalculationRule SET
	displayFunctionBody = 'return !<<STRATEGY_INFO_3>> &&
	( !!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_RETAIL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>);
	',
	description = '
		<div>
		<div>Deploying an employee-focused travel behavior change 
		program that targets individual attitudes, goals, and 
		travel behaviors, educating participants on the 
		impacts of travel choices and opportunities to alter 
		their habits. The program typically includes a 
		coordinated ride-sharing, vanpool and/or carpooling program, 
		and requires a program coordinator, and includes program 
		monitoring, reporting and evaluation.
		</div>
		<div>
			NOTE: Cannot be combined with Encouragement Program strategy.
		</div>
		</div>
	'
WHERE calculationId =1 and code in ( 'STRATEGY_HOV_5')

/*
	Encouragement Program not applicable if
	Trip-Reduction selected
*/
UPDATE CalculationRule SET
	displayFunctionBody = 'return !<<STRATEGY_HOV_5>>;
	',
	description = '
	<div>
	<ul style="list-style-type:disc;">
	<li> Education, Marketing and Outreach: Offer new employees and residents a 
	packet of materials and/or provide personal consultation detailing sustainable (non-SOV) 
	travel options. These materials or consultation must be available on an ongoing 
	basis and/or on permanent online channels. Packet must include the 
	distribution of a one Metro TAP card pre-loaded with a trip, to each 
	employee or residential unit.</li>
	<li> Travel Behavior Change Program: A multi-faceted program typically 
	involving two-way communication campaigns and travel feedback that actively 
	engages participants to target individual attitudes, goals, and travel behaviors 
	to alter their travel choices and habits. Program must include the distribution 
	of a one Metro TAP card pre-loaded with a trip, to each employee or residential unit. 
	Selection of this strategy requires a coordinator to manage the program. </li>
	</ul>
	<div>
		NOTE: Cannot be combined with Required Trip-Reduction Program strategy.
	</div>
</div> '
WHERE calculationId =1 and code in ( 'STRATEGY_INFO_3')











