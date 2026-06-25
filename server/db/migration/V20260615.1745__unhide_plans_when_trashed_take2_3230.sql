CREATE OR ALTER  PROC [dbo].[Project_Trash]
	@ids AS IdList READONLY
	, @trash bit
	, @loginId int
AS
BEGIN
	IF EXISTS (SELECT * FROM Project p JOIN @ids i ON p.id = i.id WHERE p.loginId != @loginId )
	BEGIN
		RETURN 1 /* At least one project is not owned by @loginId - throw error */
	END

	IF @trash = 1 AND EXISTS (SELECT * FROM Project p JOIN @ids i ON p.id = i.id WHERE p.dateSubmitted IS NOT NULL)
	BEGIN
		RETURN 2 /* At least one project has been submitted - throw error */
	END


	UPDATE Project SET 
		dateTrashed = CASE @trash WHEN 1 THEN getutcdate() ELSE NULL END
	WHERE Project.id IN (SELECT id from @ids)

	/* When plan is moved to trash, unhide it from all users Issue #3290 */
  IF @trash = 1
  BEGIN
	DELETE ProjectHidden
	  WHERE projectId in (SELECT id from @ids)
  END

END
GO