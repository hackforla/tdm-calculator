CREATE PROCEDURE [dbo].[Dro_Delete]
    @id INT
AS
BEGIN
    DELETE FROM [dbo].[Dro]
    WHERE id = @id;
END;
GO
