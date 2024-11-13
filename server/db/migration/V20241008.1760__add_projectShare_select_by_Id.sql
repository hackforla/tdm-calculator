CREATE proc [dbo].[ProjectShare_SelectById]
	@id INT
AS
BEGIN
	SELECT id, email, projectId
	FROM [dbo].[ProjectShare]
	WHERE id = @id;
END
GO