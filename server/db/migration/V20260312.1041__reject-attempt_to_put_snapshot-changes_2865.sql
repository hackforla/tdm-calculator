CREATE OR ALTER PROC [dbo].[Project_Update]
	@id int
	, @name nvarchar(200)
	, @address nvarchar(200)
	, @formInputs nvarchar(max)
	, @targetPoints int
	, @earnedPoints int
	, @projectLevel int
	, @loginId int
	, @calculationId int
	, @description nvarchar(max)
AS
BEGIN

	DECLARE @rc int
	SELECT @rc = count(*) FROM Project p WHERE p.id = @id AND p.dateSnapshotted IS NOT NULL
	IF (@rc = 1)
	BEGIN
		RETURN 1 /* Cannot update a snapshot */
	END

	UPDATE Project SET 
		name = @name
		, address = @address
		, formInputs = @formInputs
		, targetPoints = @targetPoints
		, earnedPoints = @earnedPoints
		, projectLevel = @projectLevel
		, loginId = @loginId
		, calculationId = @calculationId
		, description = @description
		, DateModified = getutcdate()
	WHERE 
		id = @id

END
GO


