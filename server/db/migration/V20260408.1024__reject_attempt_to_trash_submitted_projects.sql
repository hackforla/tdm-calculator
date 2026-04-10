/* Flyway Migration
   Description: Update Project_Trash to block trashing of submitted projects.
*/


CREATE OR ALTER PROC [dbo].[Project_Trash]
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

END
GO 