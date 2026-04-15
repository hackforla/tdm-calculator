/* Flyway Migration
   Description: 
    - Add Login_History table
    - Create Insert proc for Login_History table to insert login date
    - Update DeleteUserAndProjects proc to delete loginId references in `Login History` table
*/


-- Add login_history table
IF OBJECT_ID(N'dbo.LoginHistory', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[LoginHistory] (
        [id] INT IDENTITY(1,1) NOT NULL,
        [loginId] INT NOT NULL,
        [loginDatetime] DATETIME2(7) NOT NULL,
        
        CONSTRAINT [PK_LoginHistory] PRIMARY KEY ([id]),
        CONSTRAINT [FK_LoginHistory_Login] FOREIGN KEY ([loginId]) REFERENCES [dbo].[Login]([id])
    );

    CREATE INDEX IX_LoginHistory_LoginId ON [dbo].[LoginHistory](loginId);
END
GO

-- Add procedure to insert login dates
CREATE OR ALTER PROCEDURE [dbo].[LoginHistory_Insert]
    @loginId INT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO [dbo].[LoginHistory] (loginId, loginDatetime)
    VALUES (@loginId, GETUTCDATE());
END
GO


-- Update delete user procedure to delete login_history references to a deleted user 
CREATE OR ALTER PROCEDURE [dbo].[DeleteUserAndProjects]
    @id INT
AS
BEGIN

    IF EXISTS (
        SELECT 1
        FROM [dbo].[Project]
        WHERE [loginId] = @id
            AND [dateSubmitted] IS NOT NULL
            AND [dateTrashed] IS NULL
    )
    BEGIN 
        RAISERROR('Cannot delete account with submissions. Account has projects that have been submitted.', 16, 1);
        RETURN;
    END;

   
    DELETE FROM [dbo].[Project] 
    WHERE [loginId] = @id; 
    

    DELETE FROM [dbo].[LoginHistory] 
    WHERE [loginId] = @id; 

   
    DELETE FROM [dbo].[Login] 
    WHERE [id] = @id;
END;
GO