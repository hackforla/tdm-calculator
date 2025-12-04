CREATE OR ALTER PROCEDURE Login_SelectAllArchived
AS 
BEGIN 
    SELECT w.id, w.firstName, w.lastName, w.email, w.dateCreated,
		w.emailConfirmed, w.isAdmin, w.isSecurityAdmin, w.archivedAt,
		w.isDro, p.numberOfProjects, s.numberOfSubmissions
    FROM login w
    LEFT JOIN (
        SELECT loginId, COUNT(*) AS numberOfProjects
        FROM Project
        GROUP BY loginId
    ) p ON w.id = p.loginId
    LEFT JOIN (
        SELECT loginId, COUNT(*) AS numberOfSubmissions
        FROM Project
        WHERE dateSubmitted IS NOT NULL
            AND dateTrashed IS NULL
        GROUP BY loginId
    ) s ON w.id = s.loginId
    WHERE w.archivedAt IS NOT NULL
    ORDER BY w.lastName, w.firstName, w.dateCreated 

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

    DELETE FROM [dbo].[Login]
    WHERE [id] = @id;

END;
GO