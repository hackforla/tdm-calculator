ALTER TABLE Project
add dateHidden datetime2(7) null,
dateTrashed datetime2(7) null,
dateSnapshotted datetime2(7) null
GO

CREATE TYPE dbo.IdList
AS TABLE
(
  id INT
);
GO

CREATE OR ALTER PROC [dbo].[Project_Hide]
	@ids AS IdList READONLY
	, @hide bit
	, @loginId int
AS
BEGIN
	IF EXISTS (SELECT * FROM Project p JOIN @ids i ON p.id = i.id WHERE p.loginId != @loginId )
	BEGIN
		RETURN 1 /* At least one project is not owned by @loginId - throw error */
	END

	UPDATE Project SET 
		dateHidden = CASE @hide WHEN 1 THEN getutcdate() ELSE NULL END
	WHERE Project.id IN (SELECT id from @ids)

END

GO

CREATE OR ALTER PROC [dbo].[Project_Trash]
	@ids AS IdList READONLY
	, @trash bit
	, @loginId int
AS
BEGIN
	IF EXISTS (SELECT * FROM Project p JOIN @ids i ON p.id = i.id WHERE p.loginId != @loginId )
	BEGIN
		RETURN 1 /* At least one project is not owned by @loginId - throw error */
	END

	UPDATE Project SET 
		dateTrashed = CASE @trash WHEN 1 THEN getutcdate() ELSE NULL END
	WHERE Project.id IN (SELECT id from @ids)

END
GO 

CREATE OR ALTER PROC [dbo].[Project_Snapshot]
	@id int
	, @loginId int
AS
BEGIN
	DECLARE @rc int
	SELECT @rc = count(*) FROM Project p WHERE p.id = @id AND p.loginId = @loginId
	IF (@rc = 0)
	BEGIN
		RETURN 1 /* project is not owned by @loginId - throw error */
	END

	UPDATE Project SET 
		dateSnapshotted = getutcdate()
	WHERE Project.id = @id

END
GO

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
		-- Admin can see all projects
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


CREATE OR ALTER PROC [dbo].[Project_SelectById]
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
		FROM Project p
			JOIN Login l on p.loginId = l.id
		WHERE 
			p.id = @id
			AND p.loginId = ISNULL(@loginId, p.loginId)
	END

END

GO

DROP PROC IF EXISTS Project_SelectByIds
GO




