
CREATE OR ALTER   PROC [dbo].[Project_UpdateCalculationId]
	@id int
	, @targetPoints int
	, @earnedPoints int
	, @projectLevel int
	, @calculationId int
	, @isCalculationIdOverride bit
	, @loginId int
AS
BEGIN

	UPDATE Project SET 
		targetPoints = @targetPoints
		, earnedPoints = @earnedPoints
		, projectLevel = @projectLevel
		, calculationId = @calculationId
		, isCalculationIdOverride = @isCalculationIdOverride
		, DateModified = getutcdate()
	WHERE 
		id = @id AND
		(EXISTS (SELECT 1 FROM Login WHERE id = @loginId AND isAdmin = 1)
		OR loginId = @loginId)

END
GO


