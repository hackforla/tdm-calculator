DROP PROCEDURE IF EXISTS PublicComment_Insert
GO

EXEC sp_rename PublicComment, Feedback
GO

CREATE PROC [dbo].[Feedback_Insert]
	@id int output	
	,@name varchar(100)
	,@email varchar(100)
	,@comment varchar(max)
	,@forwardToWebTeam bit
AS
BEGIN
	INSERT Feedback (name, email, comment, forwardToWebTeam)
	VALUES (@name, @email, @comment, @forwardToWebTeam)

	SET @id = SCOPE_IDENTITY()
END
GO