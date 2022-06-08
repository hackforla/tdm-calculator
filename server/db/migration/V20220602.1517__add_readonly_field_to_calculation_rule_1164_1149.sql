/*
  Add readOnly column to CalculationRule. This allows us to make a strategy
  read-only to the user, so it can be controlled by business rules in the app.
  Issue 1164: allows read-only drop-down list
  Issue 1149: prevents user from de-selecting the bike parking strategy.
*/

ALTER TABLE CalculationRule
	ADD readOnly bit DEFAULT 0
GO

UPDATE CalculationRule SET
	readOnly = 1
WHERE calculationId = 1 and code in ('STRATEGY_PARKING_5', 'STRATEGY_BIKE_4')
GO


CREATE OR ALTER PROC [dbo].[CalculationRule_SelectAll]
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
		, readOnly
	FROM CalculationRule

END
GO

CREATE OR ALTER PROC [dbo].[CalculationRule_SelectByCalculationId]
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
	FROM CalculationRule cr
		LEFT JOIN CalculationPanel cp on cr.calculationPanelId = cp.id
	WHERE 
		cr.calculationId = @calculationId
	ORDER BY cp.displayOrder, cr.displayOrder, cr.name

END
GO

CREATE OR ALTER PROC [dbo].[CalculationRule_SelectById]
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
		, readOnly
	FROM CalculationRule
	WHERE 
		id = @id

END
GO





