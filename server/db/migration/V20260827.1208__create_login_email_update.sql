SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROC [dbo].[Login_Update]
    @id int,
    @firstName nvarchar(50),
    @lastName nvarchar(50)
  
AS
BEGIN
   
    UPDATE Login
    SET 
        firstName = @firstName, 
        lastName = @lastName
		
    WHERE 
        id = @id;

END
GO



CREATE TABLE [dbo].[LoginUpdateHistory]
(
    [id] [int] IDENTITY(1,1) NOT NULL,
    [userId] [int] NOT NULL INDEX IX_LoginUpdateHistory_UserId NONCLUSTERED,
    [requestedEmail] [nvarchar](100) NOT NULL INDEX IX_LoginUpdateHistory_RequestedEmail NONCLUSTERED,
    [activeEmail] [nvarchar](100) NULL,
    [lastActiveEmail] [nvarchar](100) NULL,
    [dateRequested] [datetime2](7) NOT NULL DEFAULT (SYSUTCDATETIME()),
    [dateChanged] [datetime2](7) NULL,
    PRIMARY KEY ([id]),
    FOREIGN KEY ([userId]) REFERENCES [dbo].[Login] ([id])
);
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[LoginUpdateHistory_Insert]
    @userId INT,
    @requestedEmail NVARCHAR(100),
    @currentEmail NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Invalidate any prior pending change requests for this user
        DELETE FROM [dbo].[LoginUpdateHistory]
        WHERE [userId] = @userId
          AND [dateChanged] IS NULL;

    
        INSERT INTO [dbo].[LoginUpdateHistory]
        (
            [userId],
            [requestedEmail],
            [activeEmail],
            [lastActiveEmail],
            [dateRequested],
            [dateChanged]
        )
        VALUES
        (
            @userId,
            @requestedEmail,
            @currentEmail,      -- Active at time of request
            NULL,               -- NULL until updated
            SYSUTCDATETIME(),
            NULL
        );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[Login_ConfirmUpdateEmail]
    @email NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @userId INT;

        -- Find the user ID for most recent change request 
        SELECT TOP (1) 
            @userId = [userId]
        FROM [dbo].[LoginUpdateHistory]
        WHERE [requestedEmail] = @email
          AND [dateChanged] IS NULL
        ORDER BY [dateRequested] DESC;

      

        IF @userId IS NULL
        BEGIN
            RAISERROR('No pending email update request found for this email.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END;

        
        BEGIN
            -- Update the target user record in Login table
            UPDATE [dbo].[Login]
            SET [email] = @email,
                [emailConfirmed] = 1
            WHERE [id] = @userId;

            -- Update history record in LoginUpdateHistory table
            UPDATE [dbo].[LoginUpdateHistory]
            SET 
                [lastActiveEmail] = [activeEmail],
                [activeEmail] = @email,
                [dateChanged] = SYSUTCDATETIME()
            WHERE [requestedEmail] = @email
                AND [userId] = @userId
                AND [dateChanged] IS NULL;
        END

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[LoginUpdateHistory_SelectByRecentRequestedEmail]
    @activeEmail NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP (1)
        [id],
        [userId],
        [requestedEmail],
        [activeEmail],
        [lastActiveEmail],
        [dateRequested],
        [dateChanged]
    FROM [dbo].[LoginUpdateHistory]
    WHERE [activeEmail] = @activeEmail
    ORDER BY [dateRequested] DESC;
END;
GO


CREATE OR ALTER PROCEDURE [dbo].[DeleteUserAndProjects]
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

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

    BEGIN TRY
        BEGIN TRANSACTION;

        DELETE FROM [dbo].[Project] WHERE [loginId] = @id;
        DELETE FROM [dbo].[LoginHistory] WHERE [loginId] = @id;
        DELETE FROM [dbo].[LoginUpdateHistory] WHERE [userId] = @id;

        -- Delete the parent user record
        DELETE FROM [dbo].[Login] WHERE [id] = @id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO