CREATE PROCEDURE [dbo].[Dro_SelectAll]
AS
BEGIN
    SELECT 
        id, 
        name, 
        displayOrder 
    FROM [dbo].[Dro];
END;
GO
