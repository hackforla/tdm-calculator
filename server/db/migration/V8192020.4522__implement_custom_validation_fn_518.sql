/*
  Modify database to support custom validation functions
*/
alter table CalculationRule
add validationFunctionBody nvarchar(max)

GO


ALTER PROC [dbo].[CalculationRule_SelectByCalculationId]
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
	FROM CalculationRule cr
		LEFT JOIN CalculationPanel cp on cr.calculationPanelId = cp.id
	WHERE 
		cr.calculationId = @calculationId
	ORDER BY cp.displayOrder, cr.displayOrder, cr.name

END

GO


ALTER PROC [dbo].[CalculationRule_SelectAll]
AS
BEGIN
/*

	EXEC dbo.CalculationRule_SelectAll 

*/

	SELECT
		id
		, calculationId
		, code
		, name
		, category
		, dataType
		, units
		, value
		, functionBody
		, displayOrder
		, inactive
		, calculationPanelId
		, used
		, displayFunctionBody
		, minValue
		, maxValue
		, choices
		, calcCode
		, required
		, minStringLength
		, maxStringLength
		, displayComment
		, description
		, mask
		, link
		, validationFunctionBody
	FROM CalculationRule

END

GO


GO
ALTER PROC [dbo].[CalculationRule_SelectById]
	@id int
AS
BEGIN
/*

	EXEC dbo.CalculationRule_SelectById <args> 

*/

	SELECT
		id
		, calculationId
		, code
		, name
		, category
		, dataType
		, units
		, value
		, functionBody
		, displayOrder
		, inactive
		, calculationPanelId
		, used
		, displayFunctionBody
		, minValue
		, maxValue
		, choices
		, calcCode
		, required
		, minStringLength
		, maxStringLength
		, displayComment
		, description
		, mask
		, link
		, validationFunctionBody
	FROM CalculationRule
	WHERE 
		id = @id

END


GO

/*
  Implement custom input validation functions.
*/
UPDATE CalculationRule SET
	validationFunctionBody = 'return (!<<PARK_CONDO>> && !!<<UNITS_CONDO>>) ? "Required if there are Condo Units" : ""; '
WHERE calculationId = 1 and code = 'PARK_CONDO'

UPDATE CalculationRule SET
	validationFunctionBody = 'return (!<<UNITS_CONDO>> && !!<<PARK_CONDO>>) ?  "Required if there is Condo Parking" : ""; '
WHERE calculationId = 1 and code = 'UNITS_CONDO'



UPDATE CalculationRule SET
	validationFunctionBody = 'return (!<<SF_HOSPITAL>> && !!<<BED_HOSPITAL>>) ? "Required if there are Hospital Beds" : ""; '
WHERE calculationId = 1 and code = 'SF_HOSPITAL'

UPDATE CalculationRule SET
	validationFunctionBody = 'return (!<<BED_HOSPITAL>> && !!<<SF_HOSPITAL>>) ?  "Required if there is Hospital sq ft" : ""; '
WHERE calculationId = 1 and code = 'BED_HOSPITAL'

UPDATE CalculationRule SET
	validationFunctionBody = 'return (!<<SF_CONVALESCENT>> && !!<<BED_CONVALESCENT>>) ? "Required if there are Convaliescent Beds" : ""; '
WHERE calculationId = 1 and code = 'SF_CONVALESCENT'

UPDATE CalculationRule SET
	validationFunctionBody = 'return (!<<BED_CONVALESCENT>> && !!<<SF_CONVALESCENT>>) ?  "Required if there is Convalescent sq ft" : ""; '
WHERE calculationId = 1 and code = 'BED_CONVALESCENT'


UPDATE CalculationRule SET
name = '..... Elementary / MS - Classrooms',
	validationFunctionBody = 'return (!<<CLASSROOM_SCHOOL>> && !!<<STUDENTS_ELEMENTARY>>) ? "Required if there are Elementary / MIddle School Students" : ""; '
WHERE calculationId = 1 and code = 'CLASSROOM_SCHOOL'

UPDATE CalculationRule SET
name = 'Elementary / MS - Students',
	validationFunctionBody = 'return (!<<STUDENTS_ELEMENTARY>> && !!<<CLASSROOM_SCHOOL>>) ?  "Required if there are Elementary / Middle School Classrooms" : ""; '
WHERE calculationId = 1 and code = 'STUDENTS_ELEMENTARY'

UPDATE CalculationRule SET
	validationFunctionBody = 'return (!<<SF_TRADE_SCHOOL>> && !!<<STUDENTS_TRADE_SCHOOL>>) ? "Required if there are Trade School Students" : ""; '
WHERE calculationId = 1 and code = 'SF_TRADE_SCHOOL'

UPDATE CalculationRule SET
	validationFunctionBody = 'return (!<<STUDENTS_TRADE_SCHOOL>> && !!<<SF_TRADE_SCHOOL>>) ?  "Required if there is Trade School sq ft" : ""; '
WHERE calculationId = 1 and code = 'STUDENTS_TRADE_SCHOOL'


UPDATE CalculationRule SET
name = 'High School - Students',
	validationFunctionBody = 'return (!<<HS_STUDENTS>> && (!!<<HS_AUDITORIUM_SEATS>> || !!<<HS_AUDITORIUM_SF>>)) ? "Required if there is a HS auditorium" : ""; '
WHERE calculationId = 1 and code = 'HS_STUDENTS'

UPDATE CalculationRule SET
name = '..... HS Auditorium w/seats',
	validationFunctionBody = 'return (!<<HS_AUDITORIUM_SEATS>> && !<<HS_AUDITORIUM_SF>> && !!<<HS_STUDENTS>>) ?  "Required if there are HS students" : ""; '
WHERE calculationId = 1 and code = 'HS_AUDITORIUM_SEATS'

UPDATE CalculationRule SET
name = '..... HS Auditorium w/o seats',
	validationFunctionBody = 'return (!<<HS_AUDITORIUM_SF>> && !<<HS_AUDITORIUM_SEATS>> && !!<<HS_STUDENTS>>) ?  "Required if there are HS students" : ""; '
WHERE calculationId = 1 and code = 'HS_AUDITORIUM_SF'

/*
  Add note to Bike Parking label
*/
UPDATE CalculationRule SET
name = 'Bike Parking (req''d on all new developments'
WHERE calculationId = 1 and code = 'STRATEGY_BIKE_4'

