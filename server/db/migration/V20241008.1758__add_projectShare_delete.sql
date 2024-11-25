CREATE PROCEDURE [dbo].[ProjectShare_Delete]
    @id int
AS
BEGIN
    DELETE FROM [dbo].[ProjectShare]
    WHERE id = @id;
END;
GO
