update CalculationRule set
 description = 'The project name should be the way that you refer to the project in conversation.'
where calculationId = 1 and code = 'PROJECT_NAME'

update CalculationRule set
 description = 'If you already have a Building Permit # and can provide it here, it may help reduce staff time when reviewing your materials.'
where calculationId = 1 and code = 'BUILDING_PERMIT'

update CalculationRule set
 description = 'If you already have a LADOT Case # and can provide it here, it may help reduce staff time when reviewing your materials.'
where calculationId = 1 and code = 'CASE_NO_LADOT'

update CalculationRule set
 description = 'If you already have a Planning Case # and can provide it here, it may help reduce staff time when reviewing your materials.'
where calculationId = 1 and code = 'CASE_NO_PLANNING'

update CalculationRule set
 description = 'Address can be a single address or range of addresses used for project identification.'
where calculationId = 1 and code = 'PROJECT_ADDRESS'

