CREATE PROCEDURE [dbo].[Dro_SelectById]
    @Id INT
AS
BEGIN
    SELECT 
        id, 
        name, 
        displayOrder 
    FROM [dbo].[Dro]
    WHERE id = @Id;
END;
GO
