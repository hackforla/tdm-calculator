/* Flyway Migration
   Description: Add Login_History table.
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