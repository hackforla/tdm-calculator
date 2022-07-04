update CalculationRule set
  description = 'Address can be a single address or range of addresses used for the project'
where calculationId = 1 and code = 'PROJECT_ADDRESS'

update CalculationRule set
  description = '<div>AIN(s) must include all the parcels in the project site.
  </div>
  <div>You may  look up your Assessor&apos;s Identification number on the 
	<a href="http://maps.assessor.lacounty.gov" target="_blank" rel="noopener noreferrer">
	Los Angeles County Property Assessment Information System</a> portal.
	</div>'
where calculationId = 1 and code = 'APN'

