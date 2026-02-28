CREATE  OR ALTER   PROC [dbo].[CalculationRule_SelectAll]
AS
BEGIN
/*

	EXEC dbo.CalculationRule_SelectAll 

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
	ORDER BY cr.calculationId, cp.displayOrder, cr.displayOrder, cr.name

END
GO