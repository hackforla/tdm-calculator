update CalculationRule set
	required = 1
where calculationId = 1 and code in 
('PARK_CONDO', 'CLASSROOM_SCHOOL', 'SF_TRADE_SCHOOL',
'HS_AUDITORIUM_SEATS', 'HS_AUDITORIUM_SF', 'BED_HOSPITAL')