CREATE OR ALTER PROC [dbo].[Project_Delete]
	@loginId int,
	@id int
AS
BEGIN

	IF NOT EXISTS ( SELECT * from Project WHERE id = @id and loginId = @loginId)
		AND NOT EXISTS (SELECT * FROM Login WHERE id = @loginId and isAdmin = 1)
	BEGIN
		RETURN 1
	END

	DELETE ProjectHidden
	WHERE projectId = @id

	DELETE ProjectShare
	WHERE projectId = @id

	DELETE ProjectLog
	WHERE projectId = @id

	DELETE Project
	WHERE 
		id = @id

END
GO