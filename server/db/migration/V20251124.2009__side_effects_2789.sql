

CREATE OR ALTER   PROC [dbo].[CalculationRule_SelectByCalculationId]
	@calculationId int
AS
BEGIN
/*

	EXEC dbo.CalculationRule_SelectByCalculationId 1

*/


	SELECT
		cr.id
		, cr.calculationId
		, cr.code
		, cr.name
		, cr.category
		, cr.dataType
		, cr.units
		, cr.value
		, cr.functionBody
		, cr.displayOrder
		, cp.name as panelName
		, cp.cssClass
		, cp.displayOrder as panelDisplayOrder
		, cp.id as calculationPanelId
		, cr.used
		, cr.displayFunctionBody
		, cr.minValue
		, cr.maxValue
		, cr.choices
		, cr.calcCode
		, cr.required
		, cr.minStringLength
		, cr.maxStringLength
		, cr.displayComment
		, cr.description
		, cr.mask
		, cr.link
		, cr.validationFunctionBody
		, cr.readOnly
		, cr.sideEffects
	FROM CalculationRule cr
		LEFT JOIN CalculationPanel cp on cr.calculationPanelId = cp.id
	WHERE 
		cr.calculationId = @calculationId
	ORDER BY cp.displayOrder, cr.displayOrder, cr.name

END
GO


/*

ALTER TABLE CalculationRule
ADD sideEffects nvarchar(max) null

GO
*/

DELETE FROM CalculationRule where code = 'PKG_RESIDENTIAL' and calculationId = 1

INSERT INTO CalculationRule
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
           ,[validationFunctionBody]
           ,[readOnly]
           ,[sideEffects])
     VALUES
           (1 -- calculationId 
           ,'PKG_RESIDENTIAL' -- <code, varchar(50),>
           ,'Residential or Employment Package' -- <name, nvarchar(100),>
           ,'measure' --  <category, varchar(20),>
           , 'boolean' -- <dataType, varchar(20),>
           , '' -- <units, nvarchar(50),>
           , null -- <value, nvarchar(200),>
           , '' -- <functionBody, nvarchar(max),>
           , 1908 -- <displayOrder, int,>
           , 0 -- <inactive, bit,>
           , 27 -- <calculationPanelId, int,>
           , 0 -- <used, bit,>
           , 'let applicableLandUse = !!<<LAND_USE_RESIDENTIAL>> || 
				!!<<LAND_USE_RETAIL>> ||
				!!<<LAND_USE_COMMERCIAL>> || 
				!!<<LAND_USE_HOTEL>> || 
				!!<<LAND_USE_WAREHOUSE>> ||
				!!<<LAND_USE_MEDICAL>> || 
				!!<<LAND_USE_OTHER>>;

			return <<PROJECT_LEVEL>> == 1 && <<CALC_PARK_RATIO>> < 110 && <<PARK_SPACES>> > 0 && applicableLandUse;
			' -- <displayFunctionBody, nvarchar(max),>
           , null -- <minValue, numeric(6,2),>
           , null -- <maxValue, numeric(10,2),>
           , null -- <choices, nvarchar(max),>
           , 'PTS_PKG_RESIDENTIAL_COMMERCIAL' -- <calcCode, varchar(50),>
           , 0 -- <required, bit,>
           , null -- <minStringLength, int,>
           , null -- <maxStringLength, int,>
           , 0 -- <displayComment, bit,>
           , '<div>
      <div className={classes.box}>
        <div className={classes.boxHeader}>
          <p style={{ textAlign: "center", margin: "0.2em 0.5em" }}>
            Selecting this package preselects the following strategies
          </p>
        </div>
        <ul>
                <li>Bike Parking: 2 Points</li>
                <li>Encouragement Program (Education, Marketing & Outreach): 4 Points</li>
                <li>Unbundling Parking ($220 / mo) : 8 Points</td>
        </ul>
      </div>
      <p>
        Level 1 non-school projects that provide no more than 110% of the
        Citywide Parking Baseline may be eligible for this optional bonus
        package. Because the strategies in a Bonus Package work together to
        reinforce their effectiveness in reducing drive-alone trips, projects
        that select a Bonus Package are awarded 
        <strong>
          one additional bonus point, for a total of 15 earned points.
        </strong>
		</p>
		<p>
        Bonus Packages may not be ideal for all projects but are a way to
        provide easy compliance and implementation for small projects.
      </p>
    </div>' -- <description, nvarchar(max),>
           , null -- <mask, varchar(50),>
           , null -- <link, varchar(100),>
           , null -- <validationFunctionBody, nvarchar(max),>
           , null -- <readOnly, bit,>
           , '[
				{
					"value": false,
					"effects": [
						{"code": "PKG_SCHOOL", "value": false}, 
						{"code": "STRATEGY_BIKE_4", "value": true}, 
						{"code": "STRATEGY_INFO_3", "value": "0"}, 
						{"code": "STRATEGY_PARKING_1", "value": "0"}, 
						{"code": "STRATEGY_HOV_5", "value": null }
					]
				},
				{
					"value": true,
					"effects": [
						{"code": "STRATEGY_BIKE_4", "value": true}, 
						{"code": "STRATEGY_INFO_3", "value": "1"}, 
						{"code": "STRATEGY_PARKING_1", "value": "8" }, 
						{"code": "STRATEGY_HOV_5", "value": false }
					]
				}
			]' -- <sideEffects, nvarchar(max),>
		   )
GO

DELETE FROM CalculationRule where code = 'PKG_SCHOOL' and calculationId = 1

INSERT INTO CalculationRule
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
           ,[validationFunctionBody]
           ,[readOnly]
           ,[sideEffects])
     VALUES
           (1 -- calculationId 
           ,'PKG_SCHOOL' -- <code, varchar(50),>
           ,'School Package' -- <name, nvarchar(100),>
           ,'measure' --  <category, varchar(20),>
           , 'boolean' -- <dataType, varchar(20),>
           , '' -- <units, nvarchar(50),>
           , null -- <value, nvarchar(200),>
           , '' -- <functionBody, nvarchar(max),>
           , 1909 -- <displayOrder, int,>
           , 0 -- <inactive, bit,>
           , 27 -- <calculationPanelId, int,>
           , 0 -- <used, bit,>
           , 'let applicableLandUse = !!<<LAND_USE_SCHOOL>>;

			return <<PROJECT_LEVEL>> == 1 && <<CALC_PARK_RATIO>> < 110 && <<PARK_SPACES>> > 0 && applicableLandUse;
			' -- <displayFunctionBody, nvarchar(max),>
           , 1 -- <minValue, numeric(6,2),>
           , 1 -- <maxValue, numeric(10,2),>
           , null -- <choices, nvarchar(max),>
           , 'PTS_PKG_SCHOOL' -- <calcCode, varchar(50),>
           , 0 -- <required, bit,>
           , null -- <minStringLength, int,>
           , null -- <maxStringLength, int,>
           , 0 -- <displayComment, bit,>
           , '<div>
      <div>
        <p>
            Selecting this package preselects the following strategies
        </p>
        <ul>
          <li>Bike Parking: 2 Points</li>
          <li>Encouragement Program (Voluntary Behavior Change Program): 6 Points</li>
          <li>HOV Program<: 2 Points</li>
          <li>Mobility Management ($550,000-$699,999): 4 Points </li>     
      </ul>
      <p>
        Level 1 school projects that provide no more than 110% of the Citywide
        Parking Baseline may be eligible for this optional bonus package.
        Because the strategies in a Bonus Package work together to reinforce
        their effectiveness in reducing drive-alone trips, projects that select
        a Bonus Package are awarded
        <strong>
          one additional bonus point, for a total of 15 earned points.
        </strong>
		</p>
		<p>
        Bonus Packages may not be ideal for all projects but are a way to
        provide easy compliance and implementation for small projects.
      </p>
    </div>' -- <description, nvarchar(max),>
           , null -- <mask, varchar(50),>
           , null -- <link, varchar(100),>
           , null -- <validationFunctionBody, nvarchar(max),>
           , null -- <readOnly, bit,>
           , '[
				{
					"value": false,
					"effects": [
						{"code": "PKG_RESIDENTIAL", "value": false}, 
						{"code": "STRATEGY_BIKE_4", "value": true}, 
						{"code": "STRATEGY_INFO_3", "value": "0"}, 
						{"code": "STRATEGY_HOV_4", "value": false}, 
						{"code": "STRATEGY_MOBILITY_INVESTMENT_2", "value": "0"}
					]
				},
				{
					"value": true,
					"effects": [
						{"code": "STRATEGY_BIKE_4", "value": true}, 
						{"code": "STRATEGY_INFO_3", "value": "2"}, 
						{"code": "STRATEGY_HOV_4", "value": true }, 
						{"code": "STRATEGY_MOBILITY_INVESTMENT_2", "value": "4" }
					]
				}
			]' -- <sideEffects, nvarchar(max),>
		   )
GO

UPDATE CalculationRule SET
	minValue = 1, maxValue = 1
WHERE calculationId = 1 AND code = 'PTS_PKG_RESIDENTIAL_COMMERCIAL'

UPDATE CalculationRule SET
	minValue = 1, maxValue = 1
WHERE calculationId = 1 AND code = 'PTS_PKG_SCHOOL'

DELETE FROM CalculationRule 
WHERE calculationId = 1 and code = 'PKG_BONUS'

UPDATE CalculationRule SET
	sideEffects = '[
				{
					"value": "0",
					"effects": [
						{"code": "PKG_RESIDENTIAL", "value": false}, 
						{"code": "PKG_SCHOOL", "value": false}
					]
				},
				{
					"value": "1",
					"effects": [
						{"code": "PKG_SCHOOL", "value": false}
					]
				}
			]'
WHERE calculationId = 1 and code = 'STRATEGY_INFO_3'

UPDATE CalculationRule SET
	sideEffects = '[
				{
					"value": "8",
					"effects": [
						{"code": "PKG_RESIDENTIAL", "value": null} 
					]
				},
				{
					"value": "default",
					"effects": [
						{"code": "PKG_RESIDENTIAL", "value": false}
					]
				}
			]'
WHERE calculationId = 1 and code = 'STRATEGY_PARKING_1'

UPDATE CalculationRule SET
	sideEffects = '[
				{
					"value": "1",
					"effects": [
						{"code": "PKG_SCHOOL", "value": false} 
					]
				},
				{
					"value": "2",
					"effects": [
						{"code": "PKG_SCHOOL", "value": false} 
					]
				},
				{
					"value": "3",
					"effects": [
						{"code": "PKG_SCHOOL", "value": false} 
					]
				},
				{
					"value": "default",
					"effects": [
						{"code": "PKG_SCHOOL", "value": null}
					]
				}
			]'
WHERE calculationId = 1 and code = 'STRATEGY_MOBILITY_INVESTMENT_2'

UPDATE CalculationRule SET
	sideEffects = '[
				{
					"value": false,
					"effects": [
						{"code": "PKG_SCHOOL", "value": false} 
					]
				},
				{
					"value": true,
					"effects": [
						{"code": "PKG_SCHOOL", "value": null}
					]
				}
			]'
WHERE calculationId = 1 and code = 'STRATEGY_HOV_4'

/*
	When Affordable Housing Strategy 100% is selected, check the Affordable Housing
	Input checkbox.
	When a diffent choice is selected, unchec the Affordable Housing Input checkbox.
*/
UPDATE CalculationRule SET
	sideEffects = '[
				{
					"value": "4",
					"effects": [
						{"code": "AFFORDABLE_HOUSING", "value": true} 
					]
				},
				{
					"value": "default",
					"effects": [
						{"code": "AFFORDABLE_HOUSING", "value": false}
					]
				}
			]'
WHERE calculationId = 1 and code = 'STRATEGY_AFFORDABLE'

/*
	When the Affordable Housing Input checkbox is checked, select 100% for the
	Affordable Housing strategy.
	When it is unchecked, set the Affordable Housing Strategy to "N/A"

*/
UPDATE CalculationRule SET
	sideEffects = '[
				{
					"value": true,
					"effects": [
						{"code": "STRATEGY_AFFORDABLE", "value": "4"} 
					]
				},
				{
					"value": false,
					"effects": [
						{"code": "STRATEGY_AFFORDABLE", "value": "0"}
					]
				}
			]'
WHERE calculationId = 1 and code = 'AFFORDABLE_HOUSING'

/*
	Car Share Membership: When the Car Share Membership strategy is set to 
	"Blue LA", then the Car Sharing Electric Vehicle strategy should be
	automatically selected. When Car Share Membership is set to Third-party 
	operator membership or not selected at all, then the Car Sharing Electric 
	Vehicle Strategy should be automatically de-selected.
*/
UPDATE CalculationRule SET
	sideEffects = '[
				{
					"value": "2",
					"effects": [
						{"code": "STRATEGY_CAR_SHARE_ELECTRIC", "value": true} 
					]
				},
				{
					"value": "default",
					"effects": [
						{"code": "STRATEGY_CAR_SHARE_ELECTRIC", "value": false}
					]
				}
			]'
WHERE calculationId = 1 and code = 'STRATEGY_CAR_SHARE_3'


UPDATE CalculationRule SET
functionBody = '
	return (<<PROJECT_LEVEL>> === 1 && <<CALC_PARK_RATIO>> <= 110 && <<PARK_SPACES>> > 0 &&
	!!<<STRATEGY_BIKE_4>> && !!(<<STRATEGY_INFO_3>> >= 1) && !!(<<STRATEGY_PARKING_1>> >= 8)) ? 1 : 0;
	'
where calculationId = 1 and code = 'PTS_PKG_RESIDENTIAL_COMMERCIAL'

UPDATE CalculationRule SET
functionBody = '
	 return (<<PROJECT_LEVEL>> === 1 && <<CALC_PARK_RATIO>> <= 110 && 
	 !!<<STRATEGY_BIKE_4>> && <<STRATEGY_HOV_4>> && (<<STRATEGY_MOBILITY_INVESTMENT_2>> >= 2) 
	 && !!(<<STRATEGY_INFO_3>> >= 2)) ? 1 : 0; 
	'
where calculationId = 1 and code = 'PTS_PKG_SCHOOL'

UPDATE CalculationPanel SET cssClass = 'packages'
WHERE id = 27


	
	