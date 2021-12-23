update CalculationRule set
	name = '..... HS Auditorium with seats'
where calculationId = 1 and code = 'HS_AUDITORIUM_SEATS'

update CalculationRule set
	name = '..... HS Auditorium without seats'
where calculationId = 1 and code = 'HS_AUDITORIUM_SF'