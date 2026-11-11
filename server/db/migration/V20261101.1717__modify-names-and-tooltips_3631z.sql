UPDATE CalculationRule SET
  name = 'Project Level',
  description = '<p>The City assigns a Project Level based on development project size and use activity, which is reflective of the project’s transportation demand related to the scope of activities. The Project Level informs progressive compliance and monitoring requirements of the TDM program.</p>'
WHERE code = 'PROJECT_LEVEL'


UPDATE CalculationRule SET
	name = 'Development Project Description'
WHERE code = 'PROJECT_DESCRIPTION'


  