/* Flyway Migration
   Description: 
    - Add Login_History table
    - Update DeleteUserAndProjects proc to delete loginId references in `Login History` table on User deletes.
*/



IF OBJECT_ID(N'dbo.LoginHistory', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[LoginHistory] (
        [id] INT IDENTITY(1,1) NOT NULL,
        [loginId] INT NOT NULL,
        [loginDatetime] DATETIME2(7) NOT NULL,
        
        CONSTRAINT [PK_LoginHistory] PRIMARY KEY ([id]),
        CONSTRAINT [FK_LoginHistory_Login] FOREIGN KEY ([loginId]) REFERENCES [dbo].[Login]([id])
    );
END
GO


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