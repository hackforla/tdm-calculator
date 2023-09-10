
-- adds archive column for users and projects
ALTER TABLE [dbo].[Login]
ADD [archivedAt] DATETIME NULL;
GO

ALTER TABLE [dbo].[Project]
ADD [archivedAt] DATETIME NULL;
GO

-- adds sproc for archiving users and their corresponding projects
CREATE OR ALTER PROCEDURE [dbo].[ArchiveUserAndProjects]
    @UserId INT
AS
BEGIN
    -- Set archivedAt for the user
    UPDATE [dbo].[Login]
    SET [archivedAt] = GETDATE()
    WHERE [id] = @UserId;

    -- Set archivedAt for the user's projects
    UPDATE [dbo].[Project]
    SET [archivedAt] = GETDATE()
    WHERE [loginId] = @UserId;
END;
GO

-- HARD DELETE!!!!!!!
-- adds sproc for hard deleting users and their corresponding projects
CREATE OR ALTER PROCEDURE [dbo].[DeleteUserAndProjects]
    @UserId INT
AS
BEGIN
    -- Delete user's projects
    DELETE FROM [dbo].[Project]
    WHERE [loginId] = @UserId;

    -- Delete the user
    DELETE FROM [dbo].[Login]
    WHERE [id] = @UserId;
END;
GO

-- alters sproc so that the "getAll users" filters out archived users
CREATE OR ALTER PROCEDURE [dbo].[Login_SelectAll]
AS
BEGIN
    SELECT w.id, w.firstName, w.lastName, w.email, w.dateCreated,
		w.emailConfirmed, w.isAdmin, w.passwordHash, w.isSecurityAdmin
    FROM login w
    WHERE w.archivedAt IS NULL
    ORDER BY w.lastName, w.firstName, w.dateCreated;
END;
GO

-- alters sproc so that the "getAll projects" filters out archived projects
CREATE OR ALTER PROC [dbo].[Project_SelectAll]
	@loginId int = null
AS
BEGIN

	/*
	// LADOT (i.e., Admin) user sees all projects
	EXEC dbo.Project_SelectAll @loginId = 37

	// Regular user sees only his/her projects
	EXEC dbo.Project_SelectAll @loginId = 11

*/
IF EXISTS(SELECT 1
	FROM Login
	WHERE id = @LoginId and isAdmin = 1)
	BEGIN
		-- Admin can see all projects, but not the archived ones
		SELECT
			p.id
			, p.name
			, p.address
			, p.formInputs
			, p.loginId
			, p.calculationId
			, p.dateCreated
			, p.dateModified
			, p.description
			, author.firstName
			, author.lastName
			, p.dateHidden
			, p.dateTrashed
			, p.dateSnapshotted
		FROM Project p
			JOIN Login author on p.loginId = author.id
		WHERE p.archivedAt IS NULL
	END
	ELSE
	BEGIN
		-- User can only see their own projects
		SELECT
			p.id
			, p.name
			, p.address
			, p.formInputs
			, p.loginId
			, p.calculationId
			, p.dateCreated
			, p.dateModified
			, p.description
			, author.firstName
			, author.lastName
			, p.dateHidden
			, p.dateTrashed
			, p.dateSnapshotted
		FROM Project p
			JOIN Login author on p.loginId = author.id
		WHERE author.id = ISNULL(@loginId, author.id)
	END

END

GO


-- adds sproc for getting all archived users
CREATE OR ALTER PROCEDURE [dbo].[Login_SelectAllArchived]
AS
BEGIN
    SELECT w.id, w.firstName, w.lastName, w.email, w.dateCreated,
		w.emailConfirmed, w.isAdmin, w.passwordHash, w.isSecurityAdmin
    FROM login w
    WHERE w.archivedAt IS NOT NULL
    ORDER BY w.lastName, w.firstName, w.dateCreated;
END;
GO

-- adds sproc for getting all archived projects
CREATE OR ALTER PROCEDURE [dbo].[Project_SelectAllArchived]
AS
BEGIN
    SELECT
        p.id
        , p.name
        , p.address
        , p.formInputs
        , p.loginId
        , p.calculationId
        , p.dateCreated
        , p.dateModified
        , p.description
        , author.firstName
        , author.lastName
        , p.dateHidden
        , p.dateTrashed
        , p.dateSnapshotted
    FROM Project p
        JOIN Login author on p.loginId = author.id
    WHERE p.archivedAt IS NOT NULL
END;
GO
