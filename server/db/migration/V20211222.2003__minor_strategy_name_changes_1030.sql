update CalculationRule set
	name = 'Number of Condominiums - Units'
where calculationId = 1 and code = 'UNITS_CONDO'

update CalculationRule set
	name = 'Arena, Stadium, Theater - with seats'
where calculationId = 1 and code = 'SEAT_AUDITORIUM'

update CalculationRule set
	name = 'Arena, Stadium, Theater - without seats'
where calculationId = 1 and code = 'SF_AUDITORIUM_NO_SEATS'

update CalculationRule set
	name = 'Elementary or Middle School - Students'
where calculationId = 1 and code = 'STUDENTS_ELEMENTARY'

update CalculationRule set
	name = '..... Elementary or Middle School - Classrooms'
where calculationId = 1 and code = 'CLASSROOM_SCHOOL'

update CalculationRule set
	name = 'Restaurant, Bar, General'
where calculationId = 1 and code = 'SF_RESTAURANT'

update CalculationRule set
	name = 'Manufacturing, Industrial'
where calculationId = 1 and code = 'SF_INDUSTRIAL'