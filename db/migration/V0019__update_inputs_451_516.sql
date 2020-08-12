/*
  Issues 451 and 516
*/

UPDATE CalculationRule SET
	code = 'SF_HOSPITAL',
	name = 'Sq Ft - Hospital'
WHERE calculationId = 1 and code = 'SF_HOSPITAL_CONVALESCENT'


/* 
	Modify Level Calc for SF_HOSPITAL and SF_CONVALESCENT and to Apply rule that 
	Affordable Housing only applies if non-residential level <= 1
*/
INSERT INTO CalculationRule
(calculationId, code ,name, category
, dataType, units, value
, functionBody 
, displayOrder, inactive
, calculationPanelId, used
, displayFunctionBody
, minValue, maxValue, choices
, calcCode, required
, minStringLength, maxStringLength, displayComment
, description
, mask, link)
VALUES 
  (
    1,'SF_CONVALESCENT','Sq Ft - Convalescent', 'input' -- calculationId, code ,name, category
    ,'number','sq ft',NULL -- dataType, units, value,
    , 'return <<PARK_INST_MEDICAL_SVC>> + <<PARK_CONVALESCENT>> + <<PARK_HOSPITAL>>;' -- functionBody
    ,3035,0 -- displayOrder, inactive
    ,8,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,NULL,NULL -- minValue, maxValue
    ,NULL -- choices
    ,null,0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'' -- description
    ,NULL, NULL -- mask, link
  );

UPDATE CalculationRule SET
	name = 'Does this project qualify as 100% Affordable Housing?'
WHERE calculationId = 1 and code = 'AFFORDABLE_HOUSING'

UPDATE CalculationRule SET
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

const maxNonResidentialLevel = Math.max(hotelLevel, auditoriumLevel, 
	auditoriumSFLevel, retailLevel, warehouseLevel, 
	commercialLevel, schoolLevel);


if((<<STRATEGY_AFFORDABLE>> === 4 || !!<<AFFORDABLE_HOUSING>>) && maxNonResidentialLevel < 2){
	return residentialUnits < 16 ? maxNonResidentialLevel : 1;
}

return Math.max(residentialLevel, hotelLevel, auditoriumLevel, 
	auditoriumSFLevel, retailLevel, warehouseLevel, 
	commercialLevel, schoolLevel);
'
WHERE calculationId = 1 and code = 'PROJECT_LEVEL'

UPDATE CalculationRule SET
	displayFunctionBody = 'return !!<<SF_HOSPITAL>>;'
WHERE calculationId = 1 and code = 'BED_HOSPITAL'

UPDATE CalculationRule SET
	displayFunctionBody = 'return !!<<SF_CONVALESCENT>>;'
WHERE calculationId = 1 and code = 'BED_CONVALESCENT'


