SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROC [dbo].[Login_Update]
	@id int
	,
	@firstName nvarchar(50)
	,
	@lastName nvarchar(50)
	,
	@email nvarchar(100)
AS
BEGIN

	UPDATE Login SET 
		firstName = @firstName
		, 
		lastName = @lastName
		, 
		email = @email
	WHERE 
		id = @id

END
GO