ALTER TABLE Project ADD 
	targetPoints int NULL,
	earnedPoints int NULL,
	projectLevel int NULL

GO

CREATE OR ALTER PROC [dbo].[Project_Insert]
	@name nvarchar(200)
	, @address nvarchar(200)
	, @formInputs nvarchar(max)
	, @targetPoints int
	, @earnedPoints int
	, @projectLevel int
	, @loginId int
	, @calculationId int
	, @description nvarchar(max)
	, @id int output
AS
BEGIN

	INSERT Project
		(
		name
		, address
		, formInputs
		, targetPoints
		, earnedPoints
		, projectLevel
		, loginId
		, calculationId
		, description
		)
	VALUES
		(
			@name
		, @address
		, @formInputs
		, @targetPoints
		, @earnedPoints
		, @projectLevel
		, @loginId
		, @calculationId
		, @description
	)

	SET @id = SCOPE_IDENTITY()
END
GO

CREATE OR ALTER PROC [dbo].[Project_Update]
	@id int
	, @name nvarchar(200)
	, @address nvarchar(200)
	, @formInputs nvarchar(max)
	, @targetPoints int
	, @earnedPoints int
	, @projectLevel int
	, @loginId int
	, @calculationId int
	, @description nvarchar(max)
AS
BEGIN

	UPDATE Project SET 
		name = @name
		, address = @address
		, formInputs = @formInputs
		, targetPoints = @targetPoints
		, earnedPoints = @earnedPoints
		, projectLevel = @projectLevel
		, loginId = @loginId
		, calculationId = @calculationId
		, description = @description
		, DateModified = getutcdate()
	WHERE 
		id = @id

END
GO



CREATE OR ALTER   PROC [dbo].[Project_SelectById]
   @loginId int = null,
   @id int
AS
BEGIN

   IF EXISTS(SELECT 1 FROM Login WHERE id = @LoginId AND isAdmin = 1)
   BEGIN
      SELECT
         p.id,
         p.name,
         p.address,
         p.formInputs,
		 p.targetPoints,
		 p.earnedPoints,
		 p.projectLevel,
         p.loginId,
         p.calculationId,
         p.dateCreated,
         p.dateModified,
         p.description,
         l.firstName,
         l.lastName,
         p.droId,               -- New column
         p.adminNotes,           -- New column
         p.dateModifiedAdmin,    -- New column
         p.dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted
      FROM Project p
      JOIN Login l ON p.loginId = l.id
      WHERE p.id = @id;
   END
   ELSE
   BEGIN
      SELECT
         p.id,
         p.name,
         p.address,
         p.formInputs,
		 p.targetPoints,
		 p.earnedPoints,
		 p.projectLevel,
         p.loginId,
         p.calculationId,
         p.dateCreated,
         p.dateModified,
         p.description,
         l.firstName,
         l.lastName,
         p.droId,               -- New column
         p.adminNotes,           -- New column
         p.dateModifiedAdmin,    -- New column
         p.dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted
      FROM Project p
      JOIN Login l ON p.loginId = l.id
      WHERE p.id = @id AND p.loginId = ISNULL(@loginId, p.loginId);
   END
END;
GO

CREATE OR ALTER PROC [dbo].[Project_SelectAll]
   @loginId int = null
AS
BEGIN
   IF EXISTS(SELECT 1 FROM Login WHERE id = @LoginId AND isAdmin = 1)
   BEGIN
      -- Admin can see all projects
      SELECT
         p.id
			, p.name
			, p.address
			, p.formInputs
			, p.targetPoints
			, p.earnedPoints
			, p.projectLevel
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
         , p.droId  -- New column
         , p.adminNotes  -- New column
         , p.dateModifiedAdmin  -- New column
      FROM Project p
      JOIN Login author ON p.loginId = author.id;
   END
   ELSE
   BEGIN
      -- User can only see their own projects
      SELECT
         p.id
			, p.name
			, p.address
			, p.formInputs
			, p.targetPoints
			, p.earnedPoints
			, p.projectLevel
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
         , p.droId  -- New column
         , p.adminNotes  -- New column
         , p.dateModifiedAdmin  -- New column
      FROM Project p
      JOIN Login author ON p.loginId = author.id
      WHERE author.id = ISNULL(@loginId, author.id);
   END
END;
GO








