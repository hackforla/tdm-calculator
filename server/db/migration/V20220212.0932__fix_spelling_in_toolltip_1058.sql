update CalculationRule set
	description = '<div>You may  look up your Assessor&apos;s Identification number on the 
	<a href="http://maps.assessor.lacounty.gov" target="_blank" rel="noopener noreferrer">
	Los Angeles County Property Assessment Information System</a> portal.
	</div>', link = NULL
	where calculationId = 1 and code = 'APN'