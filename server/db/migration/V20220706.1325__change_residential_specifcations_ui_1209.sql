update CalculationRule set
name = 'Do all the residential units qualify as 100% Affordable Housing?'
where calculationId = 1 and code = 'AFFORDABLE_HOUSING'

update CalculationRule set
name = 'Condominium Units',
displayOrder = 2190
where calculationId = 1 and code = 'UNITS_CONDO'

update CalculationRule set
displayOrder = 2192
where calculationId = 1 and code = 'PARK_CONDO'


update CalculationRule set
name = 'Non-Condominium Units with less than 3 habitable rooms'
where calculationId = 1 and code = 'UNITS_HABIT_LT3'

update CalculationRule set
name = 'Non-Condominium Units with 3 habitable rooms'
where calculationId = 1 and code = 'UNITS_HABIT_3'

update CalculationRule set
name = 'Non-Condominium Units with more than 3 habitable rooms'
where calculationId = 1 and code = 'UNITS_HABIT_GT3'

update CalculationPanel
set name = 'Residential - Multifamily'
where id = 6