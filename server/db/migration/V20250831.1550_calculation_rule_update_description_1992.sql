CREATE or ALTER PROCEDURE [dbo].[CalculationRule_UpdateDescription]
    (@id INT,
    @loginId INT, 
    @description NVARCHAR(MAX)
    )
AS
BEGIN
    SET NOCOUNT ON; 

IF NOT EXISTS (
    SELECT 1
    FROM [dbo].[Login]
    WHERE [id] = @loginId
    AND [isAdmin] = 1
)
BEGIN 
    RAISERROR('Access denied. User must have admin privileges to update calculation rule description.', 16, 1);
    RETURN;
END
IF NOT EXISTS (
    SELECT 1
    FROM [dbo].[CalculationRule]
    WHERE [id] = @id
)
BEGIN 
    RAISERROR('Calculation rule with ID %d does not exist.', 16, 1, @id);
    RETURN;
END
UPDATE [dbo].[CalculationRule]
SET [description] = @description
WHERE [id] = @id;

SELECT 'Description updated successfully' AS Result;
END