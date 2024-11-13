CREATE PROCEDURE [dbo].[Dro_Update]
    @id INT,
    @name NVARCHAR(200),
    @displayOrder INT
AS
BEGIN
    UPDATE [dbo].[Dro]
    SET 
        name = @name,
        displayOrder = @displayOrder
    WHERE id = @id;
END;
GO
