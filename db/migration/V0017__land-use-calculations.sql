UPDATE CalculationRule SET
  name = 'Residential',
	functionBody = '
	return !!<<UNITS_HABIT_LT3>> || !!<<UNITS_HABIT_3>> || !!<<UNITS_HABIT_GT3>> || !!<<UNITS_CONDO>>;
	'
WHERE calculationId = 1 and code = 'LAND_USE_RESIDENTIAL'

UPDATE CalculationRule SET
  name = 'Hotel / Motel'
WHERE calculationId = 1 and code = 'LAND_USE_HOTEL'

UPDATE CalculationRule SET
	functionBody = '
		return !!<<SF_RETAIL>> || !!<<SF_FURNITURE>> || !!<<SF_RESTAURANT_TAKEOUT>>
		 || !!<<SF_RESTAURANT>> || !!<<SF_HEALTH_CLUB>>;
	'
WHERE calculationId = 1 and code = 'LAND_USE_RETAIL'

UPDATE CalculationRule SET
  name = 'Employment / Office',
	functionBody = '
	return !!<<SF_OFFICE>> || !!<<SF_INST_OTHER>> || !!<<SF_INST_GOV>> ;
	'
WHERE calculationId = 1 and code = 'LAND_USE_COMMERCIAL'



UPDATE CalculationRule SET
	code = 'LAND_USE_WAREHOUSE',
	functionBody = '
	return !!<<SF_WAREHOUSE>>;
	'
WHERE calculationId = 1 and code = 'LAND_USE_INSTITUTIONAL'

UPDATE CalculationRule SET
  name = 'Warehouse Space'
WHERE calculationId = 1 and code = 'LAND_USE_WAREHOUSE'


UPDATE CalculationRule SET
  name = 'Schools',
	functionBody = '
	return !!<<STUDENTS_ELEMENTARY>> || !!<<STUDENTS_TRADE_SCHOOL>> || !!<<SF_TRADE_SCHOOL>> || !!<<HS_STUDENTS>>;
	'
WHERE calculationId = 1 and code = 'LAND_USE_SCHOOL'

UPDATE CalculationRule SET
  description = 'Special Uses'
WHERE calculationId = 1 and code = 'LAND_USE_OTHER'


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
    1,'LAND_USE_MEDICAL','Medical Care', 'calculation' -- calculationId, code ,name, category
    ,'boolean','',NULL -- dataType, units, value,
    , 'return !!<<SF_HOSPITAL_CONVALESCENT>> || !!<<SF_INST_MEDICAL_SVC>>;' -- functionBody
    ,1050,0 -- displayOrder, inactive
    ,5,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,NULL,NULL -- minValue, maxValue
    ,NULL -- choices
    ,null,0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'' -- description
    ,NULL, NULL -- mask, link
  );

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
    1,'PARK_MEDICAL','Parking Requirement - Medical', 'calculation' -- calculationId, code ,name, category
    ,'number','spcs',NULL -- dataType, units, value,
    , 'return <<PARK_INST_MEDICAL_SVC>> + <<PARK_CONVALESCENT>> + <<PARK_HOSPITAL>>;' -- functionBody
    ,1020,0 -- displayOrder, inactive
    ,11,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,NULL,NULL -- minValue, maxValue
    ,NULL -- choices
    ,null,0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'' -- description
    ,NULL, NULL -- mask, link
  );


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
+ <<PARK_WAREHOUSE>>
+ <<PARK_SCHOOL>>
+ <<PARK_MEDICAL>>
+ <<PARK_OTHER>>;
    '
WHERE calculationId = 1 and code = 'PARK_REQUIREMENT'

/*
  Make Elementary School Classrooms indented under Elementary School Students
*/
UPDATE CalculationRule SET
	displayOrder = 3515,
	name = '..... Elementary School Classrooms',
	displayFunctionBody = 'return !!<<STUDENTS_ELEMENTARY>>;'
WHERE calculationId = 1 and code = 'CLASSROOM_SCHOOL'

UPDATE CalculationRule SET
	displayOrder = 3535,
	name = '..... Trade School - Sq Ft',
	displayFunctionBody = 'return !!<<STUDENTS_TRADE_SCHOOL>>;'
WHERE calculationId = 1 and code = 'SF_TRADE_SCHOOL'

/*
  Update the parking subtotal calculations
*/
update CalculationRule SET
	functionBody = '
	return Math.ceil(<<PARK_RETAIL>> + <<PARK_FURNITURE>> + <<PARK_RESTAURANT>> + <<PARK_HEALTH_CLUB>> + <<PARK_RESTAURANT_TAKEOUT>>);'
WHERE calculationId = 1 and code = 'PARK_RETAIL_SUBTOTAL'

update CalculationRule SET
	functionBody = '
	 return Math.ceil(<<PARK_INST_OTHER>> 
	+ <<PARK_INST_GOV>>  
	+ <<PARK_OFFICE>>);'
WHERE calculationId = 1 and code = 'PARK_COMMERCIAL'


update CalculationRule SET
	functionBody = '
	return Math.ceil( <<PARK_SCHOOL_ELEMENTARY>> + <<PARK_TRADE_SCHOOL>> + <<PARK_HS_AUDITORIUM_SEATS>> + <<PARK_HS_AUDITORIUM_SF>>);
	'
WHERE calculationId = 1 and code = 'PARK_SCHOOL'










	