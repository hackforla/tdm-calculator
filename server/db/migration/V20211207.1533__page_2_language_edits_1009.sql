
UPDATE CalculationRule SET
	name = 'Units with less than 3 habitable rooms'
where calculationId =1 and code = 'UNITS_HABIT_LT3'

UPDATE CalculationRule SET
	name = 'Units with 3 habitable rooms'
where calculationId =1 and code = 'UNITS_HABIT_3'

UPDATE CalculationRule SET
	name = 'Units with more than 3 habitable rooms'
where calculationId =1 and code = 'UNITS_HABIT_GT3'

UPDATE CalculationRule SET
	description = 'All units in the Project (exclusive of manager’s units) are covenanted affordable dwelling units.'
where calculationId =1 and code = 'AFFORDABLE_HOUSING'

UPDATE CalculationPanel SET name = 'Arena / Stadium / Theater'
where calculationId = 1 and name = 'Special Uses'

UPDATE CalculationPanel SET name = 'Warehousing / Industrial'
where calculationId = 1 and name = 'Warehouse Space'


UPDATE CalculationRule SET
	displayOrder = 2905
where calculationId =1 and code = 'SF_INST_GOV'

DELETE CalculationRule 
where calculationId = 1 and code in ('BED_CONVALESCENT', 'PARK_CONVALESCENT')

/* remove convalescent from PARK_MEDICAL */
UPDATE CalculationRule SET
functionBody = 'return <<PARK_INST_MEDICAL_SVC>> + <<PARK_HOSPITAL>>;'
where calculationId = 1 and code = 'PARK_MEDICAL'

UPDATE CalculationRule SET
name = 'Office, Business'
where calculationId = 1 and code = 'SF_OFFICE'

UPDATE CalculationRule SET
name = 'Parking Requirement - Office, Business'
where calculationId = 1 and code = 'PARK_OFFICE'

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
           ,[link]
           ,[validationFunctionBody])
     VALUES
           (1
           ,'SF_INDUSTRIAL'
           ,'Industrial / Manufacturing'
           ,'input'
           , 'number'
           ,'sq ft'
           ,NULL
           , ''
           , 2945
           , 0
           , 33
           , 0
           , 'return true;'
           , null
           , null
           , null
           , null
           , 0
           , null
           , null
           , 0
           , '' -- description
           , null
           , null
           , null)



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
           ,[required]
           ,[displayComment]
		   , description

           )
     VALUES
           (1 -- <calculationId, int,>
           ,'PARK_INDUSTRIAL' --<code, varchar(50),>
           , 'Parkng Requirement - Industial / Manufacturing' -- <name, nvarchar(100),>
           , 'calculation' -- <category, varchar(20),>
           , 'number' -- <dataType, varchar(20),>
           , 'spaces' --<units, nvarchar(50),>
           , NULL -- <value, nvarchar(200),>
           , 'return <<SF_INDUSTRIAL>>/1000 * 2;' -- <functionBody, nvarchar(max),>
           , 835 -- <displayOrder, int,>
           , 0 --<inactive, bit,>
           , 11 -- <calculationPanelId, int,>
           , 1 -- <used, bit,>
           , '' -- <displayFunctionBody, nvarchar(max),>
           , 0 --<required, bit,>
           , 0 --<displayComment, bit,>
		   , '' -- description
		)

/* New subtotatal for Warehouse + Industrial */
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
    ,[required]
    ,[displayComment]
	, description

    )
VALUES
    (1 -- <calculationId, int,>
    ,'PARK_WAREHOUSEINDUSTRIAL' --<code, varchar(50),>
    , 'Parkng Requirement - Warehouse + Industrial' -- <name, nvarchar(100),>
    , 'calculation' -- <category, varchar(20),>
    , 'number' -- <dataType, varchar(20),>
    , 'spaces' --<units, nvarchar(50),>
    , NULL -- <value, nvarchar(200),>
    , 'return Math.ceil(<<PARK_WAREHOUSE>> + <<PARK_INDUSTRIAL>>);' -- <functionBody, nvarchar(max),>
    , 836 -- <displayOrder, int,>
    , 0 --<inactive, bit,>
    , 11 -- <calculationPanelId, int,>
    , 1 -- <used, bit,>
    , '' -- <displayFunctionBody, nvarchar(max),>
    , 0 --<required, bit,>
    , 0 --<displayComment, bit,>
	, '' -- description
)

/* UPDATE PARK_REQUIREMENT to use new subtotal */
UPDATE CalculationRule SET
functionBody = '
//<<LAND_USE_RESIDENTIAL>>
//<<LAND_USE_HOTEL>>
//<<LAND_USE_RETAIL>>
//<<LAND_USE_COMMERCIAL>>
//<<LAND_USE_WAREHOUSE>>
//<<LAND_USE_OTHER>>
//<<LAND_USE_SCHOOL>>
//<<LAND_USE_MEDICAL>>

return <<PARK_RESIDENTIAL>> 
+ <<PARK_HOTEL>>
+ <<PARK_RETAIL_SUBTOTAL>>
+ <<PARK_COMMERCIAL>>
+ <<PARK_WAREHOUSEINDUSTRIAL>>
+ <<PARK_SCHOOL>>
+ <<PARK_MEDICAL>>
+ <<PARK_OTHER>>;'
where calculationId = 1 and code = 'PARK_REQUIREMENT'


update CalculationRule SET
functionBody = '
return !!<<SF_WAREHOUSE>> || !!<<SF_INDUSTRIAL>>;
'
where calculationId = 1 and code = 'LAND_USE_WAREHOUSE'


update CalculationRule SET
functionBody = '

// <<STRATEGY_BIKE_BONUS>>
return Math.max(0, Math.sign(<<PTS_BIKE_1>>) 
	+ Math.sign(<<PTS_BIKE_3>>) 
	+ Math.sign(<<PTS_BIKE_4>>) 
	+ Math.sign(<<PTS_BIKE_5>>)
	-2);
	',
	minValue = 1, maxValue = 2
where calculationId =  1 and code = 'PTS_BIKE_BONUS'

update CalculationRule SET
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
	+ (<<SF_HOSPITAL>> || 0) + (<<SF_CONVALESCENT>> || 0);

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


          






