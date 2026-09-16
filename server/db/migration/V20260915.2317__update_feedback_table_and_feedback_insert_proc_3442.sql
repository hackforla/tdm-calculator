ALTER TABLE [dbo].[Feedback] DROP COLUMN [name];
GO

ALTER TABLE [dbo].[Feedback] DROP COLUMN [email];
GO

ALTER TABLE [dbo].[Feedback] 
ADD [name] nvarchar(250) NOT NULL
GO

ALTER TABLE [dbo].[Feedback] 
ADD [loginId] INT NULL 
CONSTRAINT [FK_Feedback_Login] FOREIGN KEY REFERENCES [dbo].[Login]([id]);
GO

DROP PROCEDURE IF EXISTS Feedback_Insert
GO

CREATE PROC [dbo].[Feedback_Insert]
	@id int output	
	,@name nvarchar(250)
	,@comment varchar(max)
	,@forwardToWebTeam bit
AS
BEGIN
	INSERT Feedback (subject, comment, forwardToWebTeam)
	VALUES (@subject, @comment, @forwardToWebTeam)

	SET @id = SCOPE_IDENTITY()
END
GO
