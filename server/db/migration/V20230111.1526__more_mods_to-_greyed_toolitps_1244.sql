UPDATE CalculationRule SET displayFunctionBody = 'return !<<STRATEGY_PARKING_2>> &&
	( !!<<LAND_USE_RESIDENTIAL>> ||
	!!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>);',
	description = '<div>
	<p>This strategy is not available for retail use, and cannot be combined with Parking Cash-Out.</p>
	<p>Pricing of parking encourages sustainable modes of travel (non-drive alone) and can be accomplished in several ways. 
Property managers and homeowner associations can unbundle the price of parking from rents or sale of units. 
The parking cost is set by the project applicant and paid by the vehicle owners/drivers.</p>
	</div>'
where calculationId = 1 and code = 'STRATEGY_PARKING_1'

UPDATE CalculationRule SET displayFunctionBody = 'return !<<STRATEGY_PARKING_2>> &&
	( !!<<LAND_USE_HOTEL>> || 
	!!<<LAND_USE_COMMERCIAL>> || 
	!!<<LAND_USE_WAREHOUSE>> ||
	!!<<LAND_USE_MEDICAL>> || 
	!!<<LAND_USE_SCHOOL>> || 
	!!<<LAND_USE_OTHER>>);',
	description = '<div>
	<p>This strategy is not available for residential or retail uses, and cannot be combined with Parking Pricing/Unbundling.</p>
	<p>Implement a “cash out” program, where all full or 
 part-time employees who do not use a parking space are paid the 
 value of the space instead in time increments that the parking is leased. 
 The value of a space shall be the leased value, if leased, and shall be the 
 market value of a parking space if owned by the property owner.</p>
	</div>'
where calculationId = 1 and code = 'STRATEGY_PARKING_2'