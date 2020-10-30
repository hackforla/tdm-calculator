/**************************************************************************************************************************/
/********************************************* ADD TELEVISIT (PTS & STRATEGIES) *******************************************/
/**************************************************************************************************************************/

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
  /* ADD POINTS FOR TELECOMMUTE 2: TELEVISITS */
  (
    1,'PTS_TELECOMMUTE_2','Pts for Televisits','calculation' -- calculationId, code ,name, category
    ,'number','pts',NULL -- dataType, units, value,
    , 'return <<STRATEGY_TELECOMMUTE_2>> ? 3 : 0' -- functionBody
    ,1757,0 -- displayOrder, inactive
    ,32,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,3,3 -- minValue, maxValue
    ,NULL -- choices
    ,NULL,0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'' -- description
    ,NULL, NULL -- mask, link
  ), 

  /* ADD STRATEGY FOR TELECOMMUTE 2: TELEVISTS */
  (
    1,'STRATEGY_TELECOMMUTE_2','Televisits','measure' -- calculationId, code ,name, category
    ,'boolean', '', NULL -- dataType, units, value
    , 'return true;' -- functionBody
    ,1757,0 -- displayOrder, inactive
    ,32,0 -- calculationPanelId, used
    ,'return !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_OTHER>> || !!<<LAND_USE_SCHOOL>>;' -- displayFunctionBody
    ,NULL,NULL -- minValue, maxValue
    ,NULL -- choices
    ,'PTS_TELECOMMUTE_2',0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'Offer visitors virtual visitation options including telehealth, virtual meetings and conferencing. ' -- description
    ,NULL, NULL -- mask, link
  )
;



/**************************************************************************************************************************/
/*********************************** ADD MOBILITY INVESTMENT (PANEL, PTS & STRATEGIES) ************************************/
/**************************************************************************************************************************/

/* ADD MOBILITY INVESTMENT TO CALCULATION PANEL */
INSERT INTO CalculationPanel (calculationId, name, cssClass, displayOrder)
VALUES (1, 'Mobility Investment', 'strategies', 1650);


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
  /* ADD POINTS FOR MOBILITY INVESTMENT 1: ACCESS IMPROVEMENTS */
  (
    1,'PTS_MOBILITY_INVESTMENT_1','Pts for Access Improvements','calculation' -- calculationId, code ,name, category
    ,'number','pts',NULL -- dataType, units, value,
    , 'return <<STRATEGY_MOBILITY_INVESTMENT_1>>;' -- functionBody
    ,1651,0 -- displayOrder, inactive
    ,34,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,5,10 -- minValue, maxValue
    ,NULL -- choices
    ,NULL,0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'' -- description
    ,NULL, NULL -- mask, link
  ), 

  /* ADD POINTS FOR MOBILITY INVESTMENT 2: MOBILITY MANAGEMENT */
  (
    1,'PTS_MOBILITY_INVESTMENT_2','Pts for Mobility Management','calculation' -- calculationId, code ,name, category
    ,'number','pts',NULL -- dataType, 'value,
    , 'switch (<<STRATEGY_MOBILITY_INVESTMENT_2>>)
      {   case 1:    return 4;   
        case 2:    return 8;   
        case 3:    return 12;     
        default:   return 0;  	};'
    ,1652,0 -- displayOrder, inactive
    ,34,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,4,12 -- minValue, maxValue
    , NULL -- choices
    ,NULL,0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'' -- description
    ,NULL, NULL -- mask, link
  ), 

  /* ADD TOTAL POINTS FOR MOBILITY INVESTMENT */
  (
    1,'PTS_MOBILITY_INVESTMENT','Pts for Mobility Investment','calculation' -- calculationId, code ,name, category
    ,'number','pts',NULL -- dataType, units,value,
    , 'return <<PTS_MOBILITY_INVESTMENT_1>> + <<PTS_MOBILITY_INVESTMENT_2>>' -- functionBody
    ,1659,0 -- displayOrder, inactive
    ,34,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,NULL,NULL -- minValue, maxValue
    ,NULL -- choices
    ,NULL,0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'' -- description
    ,NULL, NULL  -- mask, link
  ),

  /* ADD STATEGY FOR MOBILITY INVESTMENT 1: ACCESS IMPROVEMENTS */
  (
    1,'STRATEGY_MOBILITY_INVESTMENT_1','Access Improvement','measure' -- calculationId, code ,name, category
    ,'number','',NULL -- dataType, units,value,
    , '' -- functionBody
    ,1651,0 -- displayOrder, inactive
    ,34,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,0,10 -- minValue, maxValue
    ,NULL --choices
    ,'PTS_MOBILITY_INVESTMENT_1',0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'Correct or improve existing infrastructure or contribute to local infrastructure improvements near the High Injury Network (HIN) corridors or corridors identified in the Mobility Plan 2035. Point value relative to improvement and location, and determined in coordination with LADOT staff.' -- description
    ,NULL, NULL -- mask, link
  ),

  /* ADD STRATEGY FOR MOBILITY INVESTMENT 2: MOBILITY MANAGEMENT */
  (
    1,'STRATEGY_MOBILITY_INVESTMENT_2','Mobility Management','measure' -- calculationId, code ,name, category
    ,'choice', '', NULL -- dataType, units, value
    , '' -- functionBody
    ,1652,0 -- displayOrder, inactive
    ,34,0 -- calculationPanelId, used
    ,'return true;' -- displayFunctionBody
    ,NULL,NULL -- minValue, maxValue
    ,'[{"id": "0", "name": "none"},
    {"id": "1", "name": "$50,000"},
    {"id": "2", "name": "$200,000"},
    {"id": "3", "name": "$500,000*"}]' -- choices
    ,'PTS_MOBILITY_INVESTMENT_2',0 -- calcCode, required
    ,NULL,NULL,0 -- minStringLength, maxStringLength, displayComment
    ,'Fund for construction of investments in capital expansion and operations and maintenance for existing sustainable  mobility programs (Metro Bike Share, carshare, etc. )' -- description
    ,NULL, NULL -- mask, link
  );



/**************************************************************************************************************************/
/******************************************** UPDATE EARNED POINTS CALCULATION ********************************************/
/**************************************************************************************************************************/

 UPDATE CalculationRule SET functionBody = 'return <<PTS_AFFORDABLE>> 
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
  + <<PTS_TELECOMMUTE_2>>
  + <<PTS_TRANSIT_ACCESS>>
  + <<PTS_TMO>>
  + <<PTS_APPLICANT>>
  + <<PTS_PKG_RESIDENTIAL>>
  + <<PTS_PKG_COMMERCIAL>>;' WHERE code = 'PTS_EARNED' AND calculationId = 1;