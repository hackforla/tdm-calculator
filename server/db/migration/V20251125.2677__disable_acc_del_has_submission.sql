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