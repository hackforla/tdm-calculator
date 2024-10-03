CREATE PROCEDURE [dbo].[Dro_Insert]
    @name NVARCHAR(200),
    @displayOrder INT,
    @id INT OUTPUT
AS
BEGIN
    INSERT INTO [dbo].[Dro] (name, displayOrder)
    VALUES (@name, @displayOrder);

    SET @id = SCOPE_IDENTITY();
END;
GO
