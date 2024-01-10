CREATE  OR ALTER  PROC [dbo].[Project_Rename]
	@id int
	, @name nvarchar(200) null
	, @loginId int

AS
BEGIN

	DECLARE @rc int
	SELECT @rc = count(*) FROM Project p WHERE p.id = @id AND p.loginId = @loginId
	IF (@rc = 0)
	BEGIN
		RETURN 1 
	END

	UPDATE Project SET 
		name = COALESCE(@name, name)
		, formInputs = JSON_MODIFY( formInputs, '$.PROJECT_NAME', COALESCE(@name, name)) 
	WHERE Project.id = @id

END
GO