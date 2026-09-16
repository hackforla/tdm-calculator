DELETE FROM [dbo].[Feedback];
GO

ALTER TABLE [dbo].[Feedback] DROP COLUMN [name];
GO

ALTER TABLE [dbo].[Feedback] DROP COLUMN [email];
GO

ALTER TABLE [dbo].[Feedback] 
ADD [subject] nvarchar(250) NOT NULL;
GO

ALTER TABLE [dbo].[Feedback] 
ADD [loginId] INT NULL 
CONSTRAINT [FK_Feedback_Login] FOREIGN KEY REFERENCES [dbo].[Login]([id]);
GO

DROP PROCEDURE IF EXISTS [dbo].[Feedback_Insert];
GO

CREATE PROC [dbo].[Feedback_Insert]
	@id int OUTPUT,
	@loginId int = NULL,
	@subject nvarchar(250),
	@comment nvarchar(max),
	@forwardToWebTeam bit
AS
BEGIN
	INSERT INTO [dbo].[Feedback] (loginId, subject, comment, forwardToWebTeam)
	VALUES (@loginId, @subject, @comment, @forwardToWebTeam);

	SET @id = SCOPE_IDENTITY();
END
GO
