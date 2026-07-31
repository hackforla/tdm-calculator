/* Flyway Migration
   Description: Add Login_SelectInactiveForCleanup stored procedure
*/

CREATE OR ALTER PROCEDURE [dbo].[Login_SelectInactiveForCleanup]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        id,
        email,
        firstName,
        lastName,
        dateCreated,
        emailConfirmed,
        isAdmin,
        isSecurityAdmin
    FROM [dbo].[Login]
    WHERE (
        -- Unconfirmed accounts - 24 hours old
        (emailConfirmed = 0 AND dateCreated < DATEADD(hour, -24, GETUTCDATE()))
        OR
        -- Accounts with no saved projects - 90 days old
        (dateCreated < DATEADD(day, -90, GETUTCDATE()) AND NOT EXISTS (
            SELECT 1
            FROM [dbo].[Project]
            WHERE [dbo].[Project].[loginId] = [dbo].[Login].[id]
        ))
        OR
        -- Accounts with "QQQQ" at the end of the last name - 90 days old
        (lastName LIKE '%QQQQ' AND dateCreated < DATEADD(day, -90, GETUTCDATE()))
    )
    AND isAdmin = 0
    AND isSecurityAdmin = 0;
END;
GO
