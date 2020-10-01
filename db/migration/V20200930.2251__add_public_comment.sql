CREATE TABLE [dbo].[PublicComment] (
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[email] [nvarchar](100) NULL,
	[comment] [nvarchar](max) NOT NULL,
	[forwardToDevs] [bit] NULL,
)
GO

CREATE PROC [dbo].[PublicComment_Insert]
	@id int output	
	,@name varchar(100)
	,@email varchar(100)
	,@comment varchar(max)
	,@forwardToDevs bit
AS
BEGIN
	INSERT PublicComment (name, email, comment, forwardToDevs)
	VALUES (@name, @email, @comment, @forwardToDevs)

	SET @id = SCOPE_IDENTITY()
END
GO