/****** Object:  StoredProcedure [dbo].[Project_SelectAll]    Script Date: 6/26/2024 12:41:27 PM ******/
DROP PROCEDURE [dbo].[Project_SelectAll]
GO

/****** Object:  StoredProcedure [dbo].[Project_SelectAll]    Script Date: 6/26/2024 12:41:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- alters sproc so that the "getAll projects" filters out archived projects
CREATE   PROC [dbo].[Project_SelectAll]
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
			, p.dateSubmitted
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
			, p.dateSubmitted
		FROM Project p
			JOIN Login author on p.loginId = author.id
		WHERE author.id = ISNULL(@loginId, author.id)
	END

END
GO


/****** Object:  StoredProcedure [dbo].[Project_SelectAllArchived]    Script Date: 6/26/2024 12:42:25 PM ******/
DROP PROCEDURE [dbo].[Project_SelectAllArchived]
GO

/****** Object:  StoredProcedure [dbo].[Project_SelectAllArchived]    Script Date: 6/26/2024 12:42:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- adds sproc for getting all archived projects
CREATE   PROCEDURE [dbo].[Project_SelectAllArchived]
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
		, author.email
        , p.dateHidden
        , p.dateTrashed
        , p.dateSnapshotted
		, p.archivedAt
		, p.dateSubmitted
    FROM Project p
        JOIN Login author on p.loginId = author.id
    WHERE p.archivedAt IS NOT NULL
END;
GO

/****** Object:  StoredProcedure [dbo].[Project_SelectById]    Script Date: 6/26/2024 12:42:52 PM ******/
DROP PROCEDURE [dbo].[Project_SelectById]
GO

/****** Object:  StoredProcedure [dbo].[Project_SelectById]    Script Date: 6/26/2024 12:42:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE   PROC [dbo].[Project_SelectById]
	@loginId int = null,
	@id int
AS
BEGIN
	/*

	EXEC dbo.Project_SelectById @loginId = 37, @id = 2

	EXEC dbo.Project_SelectById @loginId = 11, @id = 2

*/

	IF EXISTS(SELECT 1
	FROM Login
	WHERE id = @LoginId and isAdmin = 1)
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
			, l.firstName
			, l.lastName
			, p.dateHidden
			, p.dateTrashed
			, p.dateSnapshotted
			, p.dateSubmitted
		FROM Project p
			JOIN Login l on p.loginId = l.id
		WHERE 
			p.id = @id
	END
	ELSE
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
			, l.firstName
			, l.lastName
			, p.dateHidden
			, p.dateTrashed
			, p.dateSnapshotted
			, p.dateSubmitted
		FROM Project p
			JOIN Login l on p.loginId = l.id
		WHERE 
			p.id = @id
			AND p.loginId = ISNULL(@loginId, p.loginId)
	END

END
GO



