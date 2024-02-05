

CREATE OR ALTER  PROC [dbo].[Project_Snapshot]
	@id int
	, @name nvarchar(200) null
	, @loginId int

AS
BEGIN
/*

	DECLARE @id int = 218;
	DECLARE @name varchar(200) = 'Snapshot Name';
	DECLARE @loginId int = 139;

	EXEC Project_Snapshot @id = @id, @name = @name, @loginId = @loginId


*/
	DECLARE @rc int
	SELECT @rc = count(*) FROM Project p WHERE p.id = @id AND p.loginId = @loginId
	IF (@rc = 0)
	BEGIN
		RETURN 1 
	END

	UPDATE Project SET 
		name = COALESCE(@name, name)
		, formInputs = JSON_MODIFY( formInputs, '$.PROJECT_NAME', COALESCE(@name, name)) 
		, dateSnapshotted = getutcdate()
	WHERE Project.id = @id

END
GO


