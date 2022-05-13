UPDATE CalculationRule SET
	description = 'Offer bike share membership passes to employees and/or residents in accordance 
	with available pass options (applicable for locations within 0.25 miles of an existing
	or planned bike share station - <a href="https://bikeshare.metro.net/stations" target="_blank" rel="noopener noreferrer">Bike Share Location Map</a>).
	'
WHERE calculationId = 1 and code = 'STRATEGY_BIKE_3'

UPDATE CalculationRule SET
	description = 'Offer an annual car share membership, not including trip fees 
	(through a third-party car share service operator) for at least 50% of residents 
	or employees (applicable for locations within 0.25 miles of an existing service area). 
	If the applicant selects BlueLA as the provider, the TDM point total from this measure is 4 points.'
WHERE calculationId = 1 and code = 'STRATEGY_CAR_SHARE_3'

UPDATE CalculationRule SET
	description = 'Provide a car share fleet to all building occupants. 
	Minimum of 2 cars per project site.'
WHERE calculationId = 1 and code = 'STRATEGY_CAR_SHARE_4'

UPDATE CalculationRule SET
	description = 'Provide at least six annual taxi or Transportation Network Companies (TNC) 
	fare vouchers or reimbursements for at least 50% of employees 
	who travel by non-drive alone trips.'
WHERE calculationId = 1 and code = 'STRATEGY_HOV_2'

UPDATE CalculationRule SET
	description = 'Provide free, reserved HOV parking spaces (carpool, vanpool, etc.). 
	Should be closer to the building entrance than other non-HOV parking spaces (excluding ADA stalls).
	Must install a minimum of 2 HOV parking spaces. HOV parking must account for 10% or more of total parking spaces.'
WHERE calculationId = 1 and code = 'STRATEGY_HOV_3'

UPDATE CalculationRule SET
	description = 'Deploy an employee-focused travel behavior change program that targets 
	individual attitudes, goals, and travel behaviors, educating participants on the 
	impacts of travel choices and opportunities to alter their habits. The program typically 
	includes a coordinated ride-sharing, vanpool and/or carpooling program, requires a 
	program coordinator, and includes program monitoring, reporting and evaluation. 
	A minimum of 50% of all employees on site should be eligible for the trip reduction program. 
	May not be combined with the Information - Encouragement Program Strategy.'
WHERE calculationId = 1 and code = 'STRATEGY_HOV_5'

UPDATE CalculationRule SET
description = 'Post wayfinding signage near major entrances directing building users 
	to rail stations, bus stops, bicycle facilities, bicycle parking, car 
	sharing kiosks, and other sustainable (non-drive alone) travel options, 
	provided inside and/or outside of the building.'
WHERE calculationId = 1 and code = 'STRATEGY_INFO_2'

UPDATE CalculationRule SET
	description = '<ol style="margin-left:-1.6em;margin-top:0;margin-bottom:0">
	<li> Education, Marketing and Outreach: Offer new employees and residents a 
	packet of materials and/or provide personal consultation detailing sustainable (non-drive alone) 
	travel options. These materials or consultation must be available on an ongoing 
	basis and/or on permanent online channels. Packet must include the 
	distribution of a one Metro TAP card pre-loaded with a trip, to each 
	employee or residential unit.</li>
	<li style="margin-top:0.5em"> Travel Behavior Change Program: 
	A multi-faceted program involving two-way communication campaigns and 
	travel feedback that actively engages participants to target individual attitudes, 
	goals, and travel behaviors to alter their travel choices and habits. 
	Program must include the distribution of one Metro TAP card preloaded 
	with a day pass or equivalent value, to each employee or residential 
	unit. Selection of this strategy requires a coordinator to manage the 
	program, and ensure communication is available to all regular occupants 
	of a site with a special focus on new occupants and/or employees. 
	Must include participation from 20% of the project site’s tenants/users 
	to qualify for this TDM strategy. This strategy pairs well with a TMO. 
	</li>
	<li style="margin-top:0.5em"> 
		NOTE: Cannot be combined with Required Trip-Reduction Program strategy.
	</li>
</ol>'
WHERE calculationId = 1 and code = 'STRATEGY_INFO_3'


UPDATE CalculationRule SET
	description = 'Pricing of parking encourages sustainable modes of travel (non-drive alone) and can be accomplished in several ways. 
Property managers and homeowner associations can unbundle the price of parking from rents or sale of units. 
The parking cost is set by the project applicant and paid by the vehicle owners/drivers.'
WHERE calculationId = 1 and code = 'STRATEGY_PARKING_1'


UPDATE CalculationRule SET
	description = 'Reduction in parking supply below the generalized citywide parking 
	baseline (See Glossary), using parking reduction mechanisms, including, but not 
	limited to, TOC, Density Bonus, Bicycle Parking ordinance, locating in an Enterprise 
	Zone or Specific Plan area, or compliance with zoning regulations that require less 
	parking than the generalized citywide parking baseline. Points are also awarded for 
	projects providing a reduced supply of parking as allowed by an approved variance.'
WHERE calculationId = 1 and code = 'STRATEGY_PARKING_5'


UPDATE CalculationRule SET
	description = 'Offer employees a telecommute option for at least 1 day a week, 
	which would allow employees to work from home rather than commute to the office. 
	This telecommute option must be available to at least 50% of employees 
	assigned to the project site.'
WHERE calculationId = 1 and code = 'STRATEGY_TELECOMMUTE_1'


UPDATE CalculationRule SET
	description = 'Join an existing TMO.'
WHERE calculationId = 1 and code = 'STRATEGY_TMO_1'

UPDATE CalculationRule SET
	description = 'Create a new TMO in an area where there is not already an existing TMO service. 
	Should a project select to start a new TMO, the project must not be within an existing TMO 
	service area and must commit to a two- year membership to be awarded points.'
WHERE calculationId = 1 and code = 'STRATEGY_TMO_2'