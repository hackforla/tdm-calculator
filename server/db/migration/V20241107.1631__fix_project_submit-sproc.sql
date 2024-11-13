CREATE  OR ALTER  PROC [dbo].[Project_Submit]
	@id int
	, @loginId int
AS
BEGIN
	DECLARE @rc int
	SELECT @rc = count(*) FROM Project p WHERE p.id = @id AND p.loginId = @loginId
	IF (@rc = 0)
	BEGIN
		RETURN 1 /* project is not owned by @loginId - throw error */
	END

	IF (SELECT count(*) FROM Project p WHERE p.id = @id and p.dateSnapshotted IS NULL) > 0
	BEGIN
		RETURN 2 /* project is not a snapshot */
	END

	UPDATE Project SET 
		dateSubmitted = getutcdate()
	WHERE Project.id = @id

END
GO


