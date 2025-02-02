CREATE PROCEDURE [dbo].[ProjectShare_Insert]
    @email NVARCHAR(100),
    @projectId INT,
    @id INT OUTPUT
AS
BEGIN
    INSERT INTO [dbo].[ProjectShare] (email, projectId)
    VALUES (@email, @projectId);
    SET @id = SCOPE_IDENTITY();
END;
GO
