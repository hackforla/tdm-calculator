update CalculationRule SET
	required = 0,
	minValue = 0
where calculationId = 1 and code = 'PARK_SPACES'

/* Fix to Issue 1099 */
update CalculationRule SET
	functionBody = 'return !!<<SF_HOSPITAL>> || !!<<SF_INST_MEDICAL_SVC>>;
	'
where calculationId = 1 and code = 'LAND_USE_MEDICAL'

/* Fix to Issue 1099 */
delete CalculationRule
where calculationId = 1 and code = 'SF_CONVALESCENT'

/* Fix to Issue 1099 */
UPDATE CalculationRule SET
functionBody = '

	if(!!<<LAND_USE_MAJOR>>){
		return 3;
	}

	let hotelLevel = 0;
	const hotelUnits = <<UNITS_GUEST>> || 0;
	if(hotelUnits >= 250 ){
		hotelLevel = 3;
	} else if (hotelUnits >= 100) {
		hotelLevel = 2;
	} else if (hotelUnits >= 50) {
		hotelLevel = 1;
	}

	let residentialLevel = 0;
	const residentialUnits = (<<UNITS_HABIT_LT3>> || 0)
		+ (<<UNITS_HABIT_3>> || 0)
		+ (<<UNITS_HABIT_GT3>> || 0)
		+ (<<UNITS_CONDO>> || 0);
	if (residentialUnits >= 250){
		residentialLevel = 3;
	} else if ( residentialUnits >=  50 ){
		residentialLevel = 2;
	} else if (residentialUnits >= 16 ) {
		residentialLevel = 1;
	}

	if(<<STRATEGY_AFFORDABLE>> === 4 || !!<<AFFORDABLE_HOUSING>>){
		residentialLevel = residentialLevel === 0 ? 0 : 1;
	}

	let auditoriumLevel = 0;
	const auditoriumSeats = (<<SEAT_AUDITORIUM>> || 0) ;

	if (auditoriumSeats >= 20000){
		auditoriumLevel = 3;
	} else if ( auditoriumSeats >=  9000 ){
		auditoriumLevel = 2;
	}

	let auditoriumSFLevel = 0;
	const auditoriumSF = (<<SF_AUDITORIUM_NO_SEATS>> || 0) ;

	if (auditoriumSF >= 500000){
		auditoriumSFLevel = 3;
	} else if ( auditoriumSF >=  250000 ){
		auditoriumSFLevel = 2;
	}

	let retailLevel = 0;
	const retailSF = (<<SF_RETAIL>> || 0)  + (<<SF_FURNITURE>> || 0)
	+ (<<SF_RESTAURANT>> || 0) + (<<SF_HEALTH_CLUB>> || 0)
	+ (<<SF_RESTAURANT_TAKEOUT>> || 0) + (<<SF_INST_MEDICAL_SVC>> || 0)
	+ (<<SF_HOSPITAL>> || 0) ;

	if (retailSF >= 250000){
		retailLevel = 3;
	} else if ( retailSF >=  100000){
		retailLevel = 2;
	} else if ( retailSF >=  50000){
		retailLevel = 1;
	}

	let warehouseLevel = 0;
	const warehouseSF = (<<SF_WAREHOUSE>> || 0) + (<<SF_INDUSTRIAL>> || 0) ;
	if (warehouseSF >= 250000){
		warehouseLevel = 3;
	}

	let commercialLevel = 0;
	const commercialSF =
		(<<SF_OFFICE>> || 0)
		+ (<<SF_INST_OTHER>> || 0)
		+ (<<SF_INST_GOV>> || 0);
	if (commercialSF >= 100000){
		commercialLevel = 3;
	} else if ( commercialSF >=  50000 ){
		commercialLevel = 2;
	} else if (commercialSF >= 25000) {
		commercialLevel = 1;
	}

	let schoolLevel = 0;
	const schoolStudents = (<<STUDENTS_ELEMENTARY>> || 0)
		+ (<<STUDENTS_TRADE_SCHOOL>> || 0)
		+ (<<HS_STUDENTS>> || 0);
	if (schoolStudents >= 250){
		schoolLevel = 1;
	}

	return Math.max(residentialLevel, hotelLevel, auditoriumLevel,
		auditoriumSFLevel, retailLevel, warehouseLevel,
		commercialLevel, schoolLevel)
'
where calculationId = 1 and code = 'PROJECT_LEVEL'