/* 
  Re-factor Telecommute codes
*/
UPDATE CalculationRule SET
	code = 'STRATEGY_TELECOMMUTE_1'
WHERE calculationId = 1 and code = 'STRATEGY_TELECOMMUTE'


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
    1,'PTS_TELECOMMUTE_1','Pts for Telecommute','calculation' -- calculationId, code ,name, category
    ,'number','pts',NULL -- dataType, units, value,
    , 'switch (<<STRATEGY_TELECOMMUTE_1>>){   case 2:    return 2;   case 3:    return 3;   case 4:    return 4;   case 5:    return 5;   case 6:    return 6;  default:    return 0;  };' -- functionBody
    ,1756,0 -- displayOrder, inactive
    ,32,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,0,6 -- minValue, maxValue
    ,NULL -- choices
    ,NULL,0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'' -- description
    ,NULL, NULL -- mask, link
  )



UPDATE CalculationRule SET
	name = 'Telecommute Points Subtotal',
	functionBody = 'return <<PTS_TELECOMMUTE_1>> + <<PTS_TELECOMMUTE_2>>;',
	minValue = NULL,
	maxValue = NULL
WHERE calculationId = 1 and  code = 'PTS_TELECOMMUTE'

UPDATE CalculationRule SET
	functionBody = 'return <<PTS_AFFORDABLE>> 
  + <<PTS_BIKE>> 
  + <<PTS_CAR_SHARE>> 
  + <<PTS_CHILD_CARE>>
  + <<PTS_HOV>> 
  + <<PTS_INFO>> 
  + <<PTS_MIXED_USE>> 
  + <<PTS_MOBILITY_INVESTMENT>>
  + <<PTS_PARKING>>
  + <<PTS_SHARED_MOBILITY>>
  + <<PTS_TELECOMMUTE>> 
  + <<PTS_TRANSIT_ACCESS>>
  + <<PTS_TMO>>
  + <<PTS_APPLICANT>>
  + <<PTS_PKG_RESIDENTIAL>>
  + <<PTS_PKG_COMMERCIAL>>;'
WHERE calculationId = 1 and code = 'PTS_EARNED'

/* 
  End of Re-factor Telecommute codes
*/

/* Delete INFO_BOUS Rules (formerly Metro TAP Cards) */
DELETE CalculationRule
WHERE calculationId = 1 and code = 'STRATEGY_INFO_BONUS'

DELETE CalculationRule
WHERE calculationId = 1 and code = 'PTS_INFO_BONUS'

/* End of Delete INFO_BOUS Rules (formerly Metro TAP Cards) */

/* Move Unbundling above Cash-out */
UPDATE CalculationRule SET
	displayOrder = 1700
WHERE calculationId = 1 and code = 'STRATEGY_PARKING_1'

/*
  Fix captions on Shared Mobility
*/
UPDATE CalculationRule SET
	description = 'Partner with a shared mobility company to provide discounted membership fees for building occupants and users. Make shared micro-mobility fleet devices accessible for easy identification and use.'
WHERE calculationId = 1 and code = 'STRATEGY_SHARED_MOBILITY_1'

UPDATE CalculationRule SET
	description = 'Purchase and operate a shared micro-mobility fleet that is available on-site for use or rent.'
WHERE calculationId = 1 and code = 'STRATEGY_SHARED_MOBILITY_2'

/*
  Update STRATEGY_TRANSIT_ACCESS_1 to choice
*/
UPDATE CalculationRule SET
name = 'Neighborhood Shuttles/Microtransit Service',
description = 'Operate a neighborhood-serving transit service ',
dataType = 'choice',
choices = '[{"id": "0", "name": "none"},
{"id": "1", "name": "Yes, w/o  connection to high-quality transit stations"},
{"id": "2", "name": "Yes, with connection to high-quality transit stations"}]'
WHERE calculationId = 1 and code = 'STRATEGY_TRANSIT_ACCESS_1'

UPDATE CalculationRule SET
name = 'Pts for operating a transit service',
description = '',
functionBody = ' 
switch (<<STRATEGY_TRANSIT_ACCESS_1>>){
	case 1:
		return 6;
	case 2:
		return 8;
	default:
		return 0;
};'
WHERE calculationId = 1 and code = 'PTS_TRANSIT_ACCESS_1'

/*
  Add Electric Fleet Vehicle Bonus
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
    1,'PTS_TRANSIT_ACCESS_5','Pts for Electric Transit Vehicle Bonus','calculation' -- calculationId, code ,name, category
    ,'number','pts',NULL -- dataType, units, value,
    , 'return !!<<STRATEGY_TRANSIT_ACCESS_5>> ? 1: 0;' -- functionBody
    ,1820,0 -- displayOrder, inactive
    ,11,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,1,1 -- minValue, maxValue
    ,NULL -- choices
    ,NULL,0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'Provide 100% electric vehicle or bus.' -- description
    ,NULL, NULL -- mask, link
  )


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
    1,'STRATEGY_TRANSIT_ACCESS_5','Electric Transit Vehicle Bonus','measure' -- calculationId, code ,name, category
    ,'boolean','',NULL -- dataType, units, value,
    , null -- functionBody
    ,1820,0 -- displayOrder, inactive
    ,24,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,NULL,NULL -- minValue, maxValue
    ,NULL -- choices
    ,'PTS_TRANSIT_ACCESS_5',0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'Provide 100% electric vehicle or bus.' -- description
    ,NULL, NULL -- mask, link
  )


  UPDATE CalculationRule SET
	functionBody = 'return <<PTS_TRANSIT_ACCESS_1>> +
	<<PTS_TRANSIT_ACCESS_3>> +
	<<PTS_TRANSIT_ACCESS_4>> +
	<<PTS_TRANSIT_ACCESS_5>>;'
WHERE calculationId = 1 and code = 'PTS_TRANSIT_ACCESS'

/*
  End of Add Electric Fleet Vehicle Bonus
*/

UPDATE CalculationRule SET 
  category = 'calculation'
WHERE calculationId = 1 and code = 'LAND_USE_MAJOR'
