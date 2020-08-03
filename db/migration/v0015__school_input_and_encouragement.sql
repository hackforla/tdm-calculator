update CalculationRule set
name = 'Mandatory Trip-Reduction Program',
displayFunctionBody = 
'return !<<STRATEGY_INFO_3>> && (!!<<LAND_USE_HOTEL>> || !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>);'
where calculationId = 1 and code = 'STRATEGY_HOV_5'

update CalculationRule set
name = 'Encouragement Program',
displayFunctionBody = 
'return !<<STRATEGY_HOV_5>> && (!!<<LAND_USE_HOTEL>> || !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>);'
where calculationId = 1 and code = 'STRATEGY_INFO_3'


update CalculationRule set
name = '..... Classrooms',
displayOrder = 3515,
displayFunctionBody = 
'return !!<<STUDENTS_ELEMENTARY>>;'
where calculationId = 1 and code = 'CLASSROOM_SCHOOL'

update CalculationRule set
category = 'calculation'
where calculationId = 1 and code = 'LAND_USE_MAJOR'