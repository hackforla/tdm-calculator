update CalculationRule set
  description = '<div>
  <p>AIN/APN(s) must include all the parcels in the project site.
  </p>
  <p>You may  look up your Assessor&apos;s Identification number on the 
	<a href="http://maps.assessor.lacounty.gov" target="_blank" rel="noopener noreferrer">
	Los Angeles County Property Assessment Information System</a> portal.
	</p>
  </div>'
where calculationId = 1 and code = 'APN'