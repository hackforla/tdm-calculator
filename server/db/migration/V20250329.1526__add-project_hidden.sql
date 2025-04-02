-- adds ProjectHidden table for individual hides
CREATE TABLE ProjectHidden (
    id INT PRIMARY KEY IDENTITY(1,1), 
    loginId INT NOT NULL FOREIGN KEY REFERENCES Login(id),
    projectId INT NOT NULL FOREIGN KEY REFERENCES Project(id),
	  dateCreated datetime2(7) NOT NULL
);
GO


-- populate ProjectHidden using Project.dateHidden
INSERT INTO ProjectHidden
SELECT 
  loginId, 
  id as projectId, 
  dateHidden 
FROM Project p 
WHERE dateHidden IS NOT NULL
GO


-- remove dateHidden from Project
ALTER TABLE dbo.Project DROP COLUMN dateHidden;
GO


-- update ProjectHide proc
ALTER   PROC [dbo].[Project_Hide]
	@ids AS IdList READONLY
	, @hide bit
	, @loginId int
AS
BEGIN
	IF EXISTS (SELECT * FROM Project p JOIN @ids i ON p.id = i.id WHERE p.loginId != @loginId )
	BEGIN
		RETURN 1 /* At least one project is not owned by @loginId - throw error */
	END

  DELETE FROM ProjectHidden
  WHERE loginId = @loginId AND projectId in (SELECT id from @ids)

  IF @hide = 1
  BEGIN
    INSERT INTO ProjectHidden
    SELECT 
      @loginId as loginId, 
      i.id as projectId, 
      getutcdate() as dateHidden 
    FROM @ids i 
  END

END
GO


-- update ProjectSelectAll proc to use ProjectHidden table
ALTER   PROC [dbo].[Project_SelectAll]
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
			, ph.dateHidden
			, p.dateTrashed
			, p.dateSnapshotted
			, p.dateSubmitted
         , p.droId  -- New column
         , p.adminNotes  -- New column
         , p.dateModifiedAdmin  -- New column
      FROM Project p
      JOIN Login author ON p.loginId = author.id
	  LEFT JOIN ProjectHidden ph on p.id = ph.projectId;
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
			, ph.dateHidden
			, p.dateTrashed
			, p.dateSnapshotted
			, p.dateSubmitted
         , p.droId  -- New column
         , p.adminNotes  -- New column
         , p.dateModifiedAdmin  -- New column
      FROM Project p
      JOIN Login author ON p.loginId = author.id
	    LEFT JOIN ProjectHidden ph on p.id = ph.projectId
      WHERE author.id = ISNULL(@loginId, author.id);
   END
END;
GO

-- update ProjectSelectAllArchived proc
ALTER   PROCEDURE [dbo].[Project_SelectAllArchived]
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
        , ph.dateHidden
        , p.dateTrashed
        , p.dateSnapshotted
		    , p.archivedAt
		    , p.dateSubmitted
    FROM Project p
    JOIN Login author on p.loginId = author.id
    LEFT JOIN ProjectHidden ph on p.id = ph.projectId
    WHERE p.archivedAt IS NOT NULL
END;
GO


-- update SelectByIdWithSharedEmail proc
ALTER proc [dbo].[Project_SelectByIdWithSharedEmail]
	@email NVARCHAR(100),
	@id INT
AS
BEGIN
	SELECT
         p.id,
         p.name,
         p.address,
         p.formInputs,
         p.loginId,
         p.calculationId,
         p.dateCreated,
         p.dateModified,
         p.description,
         p.droId,
         p.adminNotes,
         p.dateModifiedAdmin,
         ph.dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted
	FROM Project p
	RIGHT JOIN ProjectShare ps ON ps.projectId = p.id
  LEFT JOIN ProjectHidden ph on p.id = ph.projectId
	WHERE ps.email = @email AND ps.projectid = @id;
END
GO


-- update ProjectSelectById proc
ALTER     PROC [dbo].[Project_SelectById]
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
         p.droId,               
         p.adminNotes,           
         p.dateModifiedAdmin,    
         ph.dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted
      FROM Project p
      JOIN Login l ON p.loginId = l.id
      LEFT JOIN ProjectHidden ph on p.id = ph.projectId
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
         p.droId,               
         p.adminNotes,          
         p.dateModifiedAdmin,    
         ph.dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted
      FROM Project p
      JOIN Login l ON p.loginId = l.id
      LEFT JOIN ProjectHidden ph on p.id = ph.projectId
      WHERE p.id = @id AND p.loginId = ISNULL(@loginId, p.loginId);
   END
END;
GO








