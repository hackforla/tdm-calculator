/*
UPDATE CalculationPanel SET name = 'Residential' WHERE id = 6;
UPDATE CalculationPanel SET name = 'Retail', displayOrder = 275 WHERE id = 28;
UPDATE CalculationPanel SET name = 'Employment / Office' WHERE id = 7;
UPDATE CalculationPanel SET name = 'Warehouse Space', displayOrder = 350, cssClass = 'landUse' WHERE id =33;
UPDATE CalculationPanel SET name = 'Medical Care' WHERE id = 8;
UPDATE CalculationPanel SET name = 'Schools' WHERE id = 29;
UPDATE CalculationPanel SET name = 'Special Uses' WHERE id = 9;

*/

UPDATE CalculationRule SET displayOrder = 2260
WHERE calculationId = 1 and code = 'UNITS_CONDO'

UPDATE CalculationRule SET displayOrder = 2270
WHERE calculationId = 1 and code = 'PARK_CONDO'

UPDATE CalculationRule SET calculationPanelId = 28, displayOrder = 2800
WHERE calculationId = 1 and code = 'SF_RETAIL'

UPDATE CalculationRule SET calculationPanelId = 28, displayOrder = 2810
WHERE calculationId = 1 and code = 'SF_FURNITURE'

UPDATE CalculationRule SET calculationPanelId = 28, displayOrder = 2820
WHERE calculationId = 1 and code = 'SF_RESTAURANT'

UPDATE CalculationRule SET calculationPanelId = 28, displayOrder = 2830
WHERE calculationId = 1 and code = 'SF_RESTAURANT_TAKEOUT'

UPDATE CalculationRule SET calculationPanelId = 28, displayOrder = 2830
WHERE calculationId = 1 and code = 'SF_HEALTH_CLUB'

UPDATE CalculationRule SET calculationPanelId = 7, displayOrder = 2900
WHERE calculationId = 1 and code = 'SF_OFFICE'

UPDATE CalculationRule SET calculationPanelId = 7, displayOrder = 2910
WHERE calculationId = 1 and code = 'SF_INST_OTHER'

UPDATE CalculationRule SET calculationPanelId = 7, displayOrder = 2920
WHERE calculationId = 1 and code = 'SF_INST_GOV'

UPDATE CalculationRule SET calculationPanelId =33, displayOrder = 2950
WHERE calculationId = 1 and code = 'SF_WAREHOUSE'

UPDATE CalculationRule SET calculationPanelId =8, displayOrder = 3000
WHERE calculationId = 1 and code = 'BED_HOSPITAL'

UPDATE CalculationRule SET calculationPanelId =8, displayOrder = 3010
WHERE calculationId = 1 and code = 'SF_INST_MEDICAL_SVC'

UPDATE CalculationRule SET calculationPanelId =8, displayOrder = 3020
WHERE calculationId = 1 and code = 'BED_CONVALESCENT'

UPDATE CalculationRule SET calculationPanelId =29, displayOrder = 3500
WHERE calculationId = 1 and code = 'CLASSROOM_SCHOOL'

UPDATE CalculationRule SET calculationPanelId =29, displayOrder = 3510
WHERE calculationId = 1 and code = 'STUDENTS_ELEMENTARY'

UPDATE CalculationRule SET calculationPanelId =29, displayOrder = 3520
WHERE calculationId = 1 and code = 'SF_TRADE_SCHOOL'

UPDATE CalculationRule SET calculationPanelId =29, displayOrder = 3530
WHERE calculationId = 1 and code = 'STUDENTS_TRADE_SCHOOL'

UPDATE CalculationRule SET calculationPanelId =9, displayOrder = 3700, name = 'Arena/Stadium/Theater - w/seats'
WHERE calculationId = 1 and code = 'SEAT_AUDITORIUM'

UPDATE CalculationRule SET calculationPanelId =9, displayOrder = 3710, name = 'Arena/Stadium/Theater - w/o seats'
WHERE calculationId = 1 and code = 'SF_AUDITORIUM_NO_SEATS'


/* Add 100% Affordable Housing Input */
INSERT INTO [dbo].[CalculationRule]
           ([calculationId]
           ,[code]
           ,[name]
           ,[category]
           ,[dataType]
           ,[units]
           ,[value]
           ,[functionBody]
           ,[displayOrder]
           ,[inactive]
           ,[calculationPanelId]
           ,[used]
           ,[displayFunctionBody]
           ,[minValue]
           ,[maxValue]
           ,[choices]
           ,[calcCode]
           ,[required]
           ,[minStringLength]
           ,[maxStringLength]
           ,[displayComment]
           ,[description]
           ,[mask]
           ,[link])
     VALUES
           (1
           ,'AFFORDABLE_HOUSING'
           ,'100% Affordable Housing'
           ,'input'
           ,'boolean'
           ,''
           ,NULL
           ,NULL
           ,2290
           ,0
           ,6
           ,1
           ,'return true;'
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,0
           ,NULL
           ,NULL
           ,0
           ,'100% Affordable Housing'
           ,NULL
           ,NULL)
GO

/* Add Middle / High School Inputs */
USE [tdmdev]
GO

/*
INSERT INTO CalculationRule
(calculationId, code ,name, category
, dataType, units, value, functionBody
, displayOrder, inactive, calculationPanelId, used
, displayFunctionBody, minValue, maxValue, choices
, calcCode, required, minStringLength, maxStringLength
, displayComment, description, mask, link)
VALUES(
<calculationId, int,>, <code, varchar(50),>,<name, nvarchar(100),>,<category, varchar(20),>
,<dataType, varchar(20),>,<units, nvarchar(50),>,<value, nvarchar(200),>,<functionBody, nvarchar(max),>
,<displayOrder, int,>,<inactive, bit,>,<calculationPanelId, int,>,<used, bit,>
,<displayFunctionBody, nvarchar(max),>,<minValue, numeric(6,2),>,<maxValue, numeric(6,2),>,<choices, nvarchar(max),>
,<calcCode, varchar(50),>,<required, bit,>,<minStringLength, int,>,<maxStringLength, int,>
,<displayComment, bit,>,<description, nvarchar(max),>,<mask, varchar(50),>,<link, varchar(100),>
)
GO
*/

INSERT INTO CalculationRule
(calculationId, code ,name, category
, dataType, units, value, functionBody
, displayOrder, inactive, calculationPanelId, used
, displayFunctionBody, minValue, maxValue, choices
, calcCode, required, minStringLength, maxStringLength
, displayComment, description, mask, link)
VALUES(
1, 'HS_STUDENTS','Middle and High School students' ,'input'
,'number','students',NULL,NULL
,5030,0,29,0
,'return true;',0,NULL,NULL
,NULL,0,NULL, NULL
,0,'',NULL, NULL
)

INSERT INTO CalculationRule
(calculationId, code ,name, category
, dataType, units, value, functionBody
, displayOrder, inactive, calculationPanelId, used
, displayFunctionBody, minValue, maxValue, choices
, calcCode, required, minStringLength, maxStringLength
, displayComment, description, mask, link)
VALUES(
1, 'HS_AUDITORIUM_SEATS','Middle and High School - Auditorium Seats' ,'input'
,'number','seats',NULL,NULL
,5040,0,29,0
,'return true;',0,NULL,NULL
,NULL,0,NULL, NULL
,0,'',NULL, NULL
)

INSERT INTO CalculationRule
(calculationId, code ,name, category
, dataType, units, value, functionBody
, displayOrder, inactive, calculationPanelId, used
, displayFunctionBody, minValue, maxValue, choices
, calcCode, required, minStringLength, maxStringLength
, displayComment, description, mask, link)
VALUES(
1, 'HS_AUDITORIUM_SF','Middle and High School - Auditorium Sq Ft' ,'input'
,'number','sq ft',NULL,NULL
,5050,0,29,0
,'return true;',0,NULL,NULL
,NULL,0,NULL, NULL
,0,'',NULL, NULL
)
GO

INSERT INTO CalculationRule
(calculationId, code ,name, category
, dataType, units, value, functionBody
, displayOrder, inactive, calculationPanelId, used
, displayFunctionBody, minValue, maxValue, choices
, calcCode, required, minStringLength, maxStringLength
, displayComment, description, mask, link)
VALUES(
1, 'PARK_HS_AUDITORIUM_SEATS','Parking for Middle and High School - Auditorium Seats' ,'calculation'
,'number','spcs',NULL,'return <<HS_AUDITORIUM_SEATS>> / 5;'
,1040,0,9,0
,'return true;',0,NULL,NULL
,NULL,0,NULL, NULL
,0,'',NULL, NULL
)

INSERT INTO CalculationRule
(calculationId, code ,name, category
, dataType, units, value, functionBody
, displayOrder, inactive, calculationPanelId, used
, displayFunctionBody, minValue, maxValue, choices
, calcCode, required, minStringLength, maxStringLength
, displayComment, description, mask, link)
VALUES(
1, 'PARK_HS_AUDITORIUM_SF','Parking for Middle and High School - Auditorium Sq Ft' ,'calculation'
,'number','spcs',NULL,'return <<HS_AUDITORIUM_SF>> / 35;'
,1050,0,9,0
,'return true;',0,NULL,NULL
,NULL,0,NULL, NULL
,0,'',NULL, NULL
)
GO

UPDATE CalculationRule SET
	functionBody = 
	'
	return Math.ceil( <<PARK_SCHOOL_ELEMENTARY>> + <<PARK_TRADE_SCHOOL>> + <<PARK_HS_AUDITORIUM_SEATS>> + <<PARK_HS_AUDITORIUM_SF>>);
	'
WHERE calculationid = 1 and code = 'PARK_SCHOOL'

/*
Modify PROJECT_LEVEL calculation for new Affordable Housing and Middle / High School Student inputs
*/

UPDATE CalculationRule SET functionBody = 
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

if (auditoriumSF >= 250000){
	auditoriumSFLevel = 3;
} else if ( auditoriumSF >=  50000 ){
	auditoriumSFLevel = 2;
} else if (auditoriumSF >= 25000) {
	auditoriumSFLevel = 1;
}

let retailLevel = 0;
const retailSF = (<<SF_RETAIL>> || 0)  + (<<SF_FURNITURE>> || 0)  
+ (<<SF_RESTAURANT>> || 0) + (<<SF_HEALTH_CLUB>> || 0) 
+ (<<SF_RESTAURANT_TAKEOUT>> || 0) + (<<SF_INST_MEDICAL_SVC>> || 0);
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






