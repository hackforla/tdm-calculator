/*
	Delete obsolete pkg measures, since they should not appear on strategies page
*/
DELETE CalculationRule
WHERE calculationId = 1 and code in ('PKG_RESIDENTIAL', 'PKG_COMMERCIAL')

/* 
	Update PTS_PKG_RESIDENTIAL to represent bonus calculation for 
	Residential OR Commercial
*/
UPDATE CalculationRule SET
	functionBody = '
	return (<<PROJECT_LEVEL>> === 1 && !!<<STRATEGY_BIKE_4>> && !!(<<STRATEGY_INFO_3>> >= 1) && !!(<<STRATEGY_PARKING_1>> >= 8)) ? 1 : 0;
	',
	code = 'PTS_PKG_RESIDENTIAL_COMMERCIAL'
WHERE calculationId = 1 and code = 'PTS_PKG_RESIDENTIAL'


/*
    Add School Package Point Calculation
*/
INSERT [dbo].[CalculationRule]
	([calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], 
    [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], 
    [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], 
    [displayComment], [description], [mask], [link])
VALUES
	(1, N'PTS_PKG_SCHOOL', N'TDM School Package Bonus', N'calculation', N'number', N'pts', NULL, '
return (<<PROJECT_LEVEL>> === 1 && !!<<STRATEGY_BIKE_4>> && !!<<STRATEGY_HOV_4>> && !!<<STRATEGY_INFO_5>> && !!(<<STRATEGY_INFO_3>> >= 2)) ? 1 : 0;
', -- functionBody 
1007, 0, 12, 0, N'', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)


/*
    Add Calc to calculate Package Bonus Point
*/
INSERT [dbo].[CalculationRule]
	([calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], 
    [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], 
    [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], 
    [displayComment], [description], [mask], [link])
VALUES
	(1, N'PTS_PKG', N'TDM Package Bonus', N'calculation', N'number', N'pts', NULL, '
return (!!<<PTS_PKG_RESIDENTIAL_COMMERCIAL>> || !!<<PTS_PKG_SCHOOL>> ) ? 1 : 0;
', -- functionBody
1008, 0, 12, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(1.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)

/*
    Add Package Bonus Measure (This is for display on the Measures Page)
*/
INSERT [dbo].[CalculationRule]
	([calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], 
    [inactive], [calculationPanelId], [used], 
    [displayFunctionBody], 
    [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link])
VALUES
	(1, N'PKG_BONUS', N'TDM Package Bonus', N'measure', N'none', N'', NULL, N'', 1907, 
    0, 27, 0, 
    N'return !!<<PTS_PKG_SCHOOL>> || !!<<PTS_PKG_RESIDENTIAL_COMMERCIAL>>;', 
    NULL, NULL, NULL, N'PTS_PKG', 0, NULL, NULL, 0, 
    N'Package Bonus', NULL, NULL)


UPDATE CalculationRule SET  
functionBody = '
return <<PTS_AFFORDABLE>> 
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
  + <<PTS_PKG>>;
  '
WHERE calculationId = 1 AND code = 'PTS_EARNED'



