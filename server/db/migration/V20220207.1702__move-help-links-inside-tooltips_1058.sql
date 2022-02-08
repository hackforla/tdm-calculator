update CalculationRule set
	description = '<div>You may  look up your Assessor&apos;s Identification number <a href="http://maps.assessor.lacounty.gov" target="_blank" rel="noopener noreferrer">here</a></div>'
	where calculationId = 1 and code = 'APN'

update CalculationRule set
	description = 'Offer bike share membership passes to employees and/or residents in accordance to the Bikeshare for Business  membership levels  (applicable for locations within 0.25 miles from an existing or planned bike share station - (<a href="https://bikeshare.metro.net/for-business/" target="_blank" rel="noopener noreferrer">Bike Share Location Map</a>).'
where calculationId = 1 and code = 'STRATEGY_BIKE_3'