update CalculationRule SET
functionBody = '
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
+ (<<SF_HOSPITAL>> || 0) + (<<SF_CONVALESCENT>> || 0);

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
WHERE calculationId = 1 and code = 'PROJECT_LEVEL'



UPDATE CalculationRule SET
  minValue = 1, maxValue = 3
WHERE calculationId = 1 and code = 'PTS_BIKE_BONUS'


UPDATE CalculationRule SET
  minValue = 2, maxValue = 6
WHERE calculationId = 1 and code = 'PTS_TELECOMMUTE_1'

UPDATE CalculationRule SET
  minValue = 6, maxValue = 8
WHERE calculationId = 1 and code = 'PTS_TRANSIT_ACCESS_1'

UPDATE CalculationRule SET
	description = 'The City defines "habitable rooms" as enclosed spaces used for living purposes. 
	This includes bedrooms, living rooms and dining rooms, given that they are all enclosed. 
	Any non-enclosed alcove more than 50 square feet in size is also included in this definition 
	(dining area excluded). The City''s definition of habitable room excludes lobbies, hallways, 
	and bathrooms. The City includes kitchens in the definition only for calculating parking requirements. 
	Therefore, a living room, dining room, and kitchen, all completely separated from each 
	other with walls, will count as three habitable rooms for parking calculation purposes'
WHERE calculationId = 1 and code in ('UNITS_HABIT_LT3', 'UNITS_HABIT_3', 'UNITS_HABIT_GT3')