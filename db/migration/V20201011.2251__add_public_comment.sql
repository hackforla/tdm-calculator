CREATE TABLE [dbo].[PublicComment] (
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[email] [nvarchar](100) NULL,
	[comment] [nvarchar](max) NOT NULL,
	[forwardToWebTeam] [bit] NULL,
)
GO

CREATE PROC [dbo].[PublicComment_Insert]
	@id int output	
	,@name varchar(100)
	,@email varchar(100)
	,@comment varchar(max)
	,@forwardToWebTeam bit
AS
BEGIN
	INSERT PublicComment (name, email, comment, forwardToWebTeam)
	VALUES (@name, @email, @comment, @forwardToWebTeam)

	SET @id = SCOPE_IDENTITY()
END
GO