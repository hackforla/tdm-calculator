update CalculationRule set
name = '..... Enter Parking Spaces req''d',
displayFunctionBody = 
'return !!<<UNITS_CONDO>>;'
where calculationId = 1 and code = 'PARK_CONDO'

update CalculationRule set
name = '..... Auditorium Seats',
displayFunctionBody = 
'return !!<<HS_STUDENTS>> && !<<HS_AUDITORIUM_SF>>;'
where calculationId = 1 and code = 'HS_AUDITORIUM_SEATS'

update CalculationRule set
name = '..... Auditorium Sq Ft',
displayFunctionBody = 
'return !!<<HS_STUDENTS>> &&  !<<HS_AUDITORIUM_SEATS>>;'
where calculationId = 1 and code = 'HS_AUDITORIUM_SF'


IF NOT EXISTS (
	SELECT 1 FROM CalculationRule 
	WHERE calculationId = 1 and code = 'SF_HOSPITAL_CONVALESCENT'
)
BEGIN
	INSERT INTO CalculationRule
	(calculationId, code ,name, category
	, dataType, units, value, functionBody
	, displayOrder, inactive, calculationPanelId, used
	, displayFunctionBody, minValue, maxValue, choices
	, calcCode, required, minStringLength, maxStringLength
	, displayComment, description, mask, link)
	VALUES(
	1, 'SF_HOSPITAL_CONVALESCENT','Sq Ft - Hospital / Convalescent' ,'input'
	,'number','sq ft',NULL,NULL
	,3020,0,8,0
	,'return true;',0,NULL,NULL
	,NULL,0,NULL, NULL
	,0,'',NULL, NULL
	)
END

update CalculationRule set
name = '..... Patient Hospital Beds',
displayOrder = 3030,
displayFunctionBody = 
'return !!<<SF_HOSPITAL_CONVALESCENT>>;'
where calculationId = 1 and code = 'BED_HOSPITAL'

update CalculationRule set
name = '..... Convalescent Institution Beds',
displayOrder = 3040,
displayFunctionBody = 
'return !!<<SF_HOSPITAL_CONVALESCENT>>;'
where calculationId = 1 and code = 'BED_CONVALESCENT'


update CalculationRule set
functionBody = 
'

// <<LEVEL>>
// <<LAND_USE_RESIDENTIAL>>

if(!!<<LAND_USE_MAJOR>>){
	return 3;
}

let hotelLevel = 0;
const hotelUnits = <<UNITS_GUEST>> || 0;
if(hotelUnits >= 150 ){
	hotelLevel = 3;
} else if (hotelUnits >= 50) {
	hotelLevel = 2;
} else if (hotelUnits >= 16) {
	hotelLevel = 1;
}

let residentialLevel = 0;
const residentialUnits = (<<UNITS_HABIT_LT3>> || 0) 
	+ (<<UNITS_HABIT_3>> || 0) 
	+ (<<UNITS_HABIT_GT3>> || 0) 
	+ (<<UNITS_CONDO>> || 0);

if(<<STRATEGY_AFFORDABLE>> === 4 || !!<<AFFORDABLE_HOUSING>>){
	return residentialUnits < 16 ? 0 : 1;
}

if (residentialUnits >= 250){
	residentialLevel = 3;
} else if ( residentialUnits >=  50 ){
	residentialLevel = 2;
} else if (residentialUnits >= 16 ) {
	residentialLevel = 1;
}

let auditoriumLevel = 0;
const auditoriumSeats = (<<SEAT_AUDITORIUM>> || 0) ;

if (auditoriumSeats >= 650){
	auditoriumLevel = 3;
} else if ( auditoriumSeats >=  350 ){
	auditoriumLevel = 2;
} else if (auditoriumSeats >= 150) {
	auditoriumLevel = 1;
}

let auditoriumSFLevel = 0;
const auditoriumSF = (<<SF_AUDITORIUM_NO_SEATS>> || 0) ;

//if (auditoriumSF >= 250000){
//	auditoriumSFLevel = 3;
//} else if ( auditoriumSF >=  50000 ){
//	auditoriumSFLevel = 2;
//} else if (auditoriumSF >= 25000) {
//	auditoriumSFLevel = 1;
//}

let retailLevel = 0;
const retailSF = (<<SF_RETAIL>> || 0)  + (<<SF_FURNITURE>> || 0)  
+ (<<SF_RESTAURANT>> || 0) + (<<SF_HEALTH_CLUB>> || 0) 
+ (<<SF_RESTAURANT_TAKEOUT>> || 0) + (<<SF_INST_MEDICAL_SVC>> || 0)
+ (<<SF_HOSPITAL_CONVALESCENT>> || 0);
if (retailSF >= 250000){
	retailLevel = 3;
} else if ( retailSF >=  100000){
	retailLevel = 2;
} else if ( retailSF >=  50000){
	retailLevel = 1;
} 

let warehouseLevel = 0;
const warehouseSF = (<<SF_WAREHOUSE>> || 0) ;
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
if (schoolStudents >= 500){
	schoolLevel = 3;
} else if ( schoolStudents >=  250 ){
	schoolLevel = 2;
} else if (schoolStudents >= 100) {
	schoolLevel = 1;
}

return Math.max(residentialLevel, hotelLevel, auditoriumLevel, 
	auditoriumSFLevel, retailLevel, warehouseLevel, 
	commercialLevel, schoolLevel);

'
where calculationId = 1 and code = 'PROJECT_LEVEL'




