update CalculationRule set
	description = '<div>You may  look up your Assessor&apos;s Identification number on the 
	<a href="http://maps.assessor.lacounty.gov" target="_blank" rel="noopener noreferrer">
	Los Angeles County Propery Assessment Information System
	</a> portal.
	</div>'
	where calculationId = 1 and code = 'APN'

update CalculationRule set
	description = 'Offer bike share membership passes to employees and/or residents in accordance to the 
	<a href="https://bikeshare.metro.net/for-business/" target="_blank"  rel="noopener noreferrer">
	Bikeshare for Business </a> membership levels. 
	Applicable for locations within 0.25 miles from an existing or planned 
	<a href="https://bikeshare.metro.net/stations" target="_blank" rel="noopener noreferrer">Bike Share Station</a>.
	'
where calculationId = 1 and code = 'STRATEGY_BIKE_3'