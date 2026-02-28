ALTER TABLE Calculation ADD
	dateStart date null,
	dateEnd date null,
	version nvarchar(20) null
GO

UPDATE Calculation SET
	name='Beta Test',
	dateStart = null,
	dateEnd = null,
	version = 'Beta'
WHERE id = 1

INSERT Config (code, value)
SELECT 'CURRENT_CALCULATION_ID', CONVERT(nvarchar,MAX(id))
FROM Calculation
GO

ALTER TABLE Project ADD
	isCalculationIdOverride bit null
GO


CREATE OR ALTER   PROC [dbo].[Calculation_SelectAll]
AS
BEGIN

/*

	EXEC dbo.Calculation_SelectAll 

*/

	SELECT
		id
		, name
		, description
		, deprecated
		, dateCreated
		, dateModified
		, dateStart
		, dateEnd
		, version
	FROM Calculation

END
GO

CREATE OR ALTER  PROC [dbo].[Calculation_SelectById]
	@id int
AS
BEGIN
	/*

	EXEC dbo.Calculation_SelectById 1

*/

	SELECT
		id
		, name
		, description
		, deprecated
		, dateCreated
		, dateModified
		, dateStart
		, dateEnd
		, version
	FROM Calculation
	WHERE 
		id = @id

END
GO

CREATE OR ALTER   PROC [dbo].[Calculation_Version]
	@name nvarchar(50)
	, @description nvarchar(400)
	, @dateStart date
	, @dateEnd date
	, @version nvarchar(20)
AS
BEGIN
/*
	EXEC dbo.Calculation_Version
		@name = "Baseline Calculation",
		@description = "Initial Version",
		@version = "1.0.0",
		@dateStart  = "2026-01-05",
		@dateEnd = null


*/
	DECLARE @id int

	INSERT Calculation (name, description, deprecated,
	dateCreated, dateModified, dateStart, dateEnd, version)
	VALUES( @name, @description, 0,
	getutcDate(), getutcDate(), @dateStart, @dateEnd, @version)

	SELECT @id = SCOPE_IDENTITY()

	INSERT CalculationRule (
	 calculationId
	 , code
	 , "name"
	 , category
	 , dataType
	 , units
	 , "value"
	 , functionBody
	 , displayOrder
	 , inactive
	 , calculationPanelId
	 , used
	 , displayFunctionBody
	 , minValue
	 , maxValue
	 , choices
	 , calcCode
	 , "required"
	 , minStringLength
	 , maxStringLength
	 , displayComment
	 , "description"
	 , mask
	 , link
	 , validationFunctionBody
	 , "readOnly"
	 , sideEffects
	 )
	 SELECT
	 	 @id
		 , cr.code
		 , cr.name
		 , cr.category
		 , cr.dataType
		 , cr.units
		 , cr.value
		 , cr.functionBody
		 , cr.displayOrder
		 , cr.inactive
		 , cr.calculationPanelId
		 , cr.used
		 , cr.displayFunctionBody
		 , cr.minValue
		 , cr.maxValue
		 , cr.choices
		 , cr.calcCode
		 , cr.required
		 , cr.minStringLength
		 , cr.maxStringLength
		 , cr.displayComment
		 , cr.description
		 , cr.mask
		 , cr.link
		 , cr.validationFunctionBody
		 , cr.readOnly
		 , cr.sideEffects
	 FROM CalculationRule cr
	 WHERE cr.calculationId = 1

	 UPDATE Config SET value = @id
	 WHERE code = 'CURRENT_CALCULATION_ID'

END
GO

CREATE OR ALTER       PROC [dbo].[Project_SelectAll]
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
			, ph.dateCreated as dateHidden
			, p.dateTrashed
			, p.dateSnapshotted
			, p.dateSubmitted
			, p.droId
			, p.adminNotes
			, p.dateModifiedAdmin
			, p.isCalculationIdOverride
      FROM Project p
      JOIN Login author ON p.loginId = author.id
	  LEFT JOIN ProjectHidden ph on p.id = ph.projectId AND ph.loginId = @loginId;
     END
   ELSE
   BEGIN
      -- User can only see their own projects or projects 
	  -- explicitly shared with them
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
			, ph.dateCreated as dateHidden
			, p.dateTrashed
			, p.dateSnapshotted
			, p.dateSubmitted
			, p.droId
			, p.adminNotes
			, p.dateModifiedAdmin
			, p.isCalculationIdOverride
      FROM Project p
      JOIN Login author ON p.loginId = author.id
	   LEFT JOIN ProjectHidden ph on p.id = ph.projectId AND ph.loginId = @loginId 
      WHERE author.id = ISNULL(@loginId, author.id) OR EXISTS
	  (
		SELECT 1 from ProjectShare ps 
		JOIN Login viewer ON viewer.email = ps.email
		WHERE p.id = ps.projectId AND viewer.id = @loginId
	  )
   END
END;
GO

CREATE OR ALTER     PROCEDURE [dbo].[Project_SelectAllArchived]
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
		, ph.dateCreated as dateHidden
        , p.dateTrashed
        , p.dateSnapshotted
		, p.archivedAt
		, p.dateSubmitted
		, p.droId
		, p.adminNotes
		, p.dateModifiedAdmin
		, p.isCalculationIdOverride
    FROM Project p
    JOIN Login author on p.loginId = author.id
    LEFT JOIN ProjectHidden ph on p.id = ph.projectId AND ph.loginId = p.loginId
    WHERE p.archivedAt IS NOT NULL
END;
GO

CREATE OR ALTER     PROC [dbo].[Project_SelectById]
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
		 p.isCalculationIdOverride,
		ph.dateCreated as dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted,
         p.approvalStatusId,
         a.name as approvalStatusName,
         l.email
      FROM Project p
      JOIN Login l ON p.loginId = l.id
      LEFT JOIN ProjectHidden ph on p.id = ph.projectId AND ph.loginId = @loginId
      LEFT JOIN ApprovalStatus a on p.approvalStatusId = a.id
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
		 p.isCalculationIdOverride,
         ph.dateCreated as dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted,
         p.approvalStatusId,
         a.name as approvalStatusName,
         l.email
      FROM Project p
      JOIN Login l ON p.loginId = l.id
      LEFT JOIN ProjectHidden ph on p.id = ph.projectId AND ph.loginId = @loginId
      LEFT JOIN ApprovalStatus a on p.approvalStatusId = a.id
      WHERE p.id = @id AND 
      (
         p.loginId = ISNULL(@loginId, p.loginId) 
         OR EXISTS
         (
         SELECT 1 from ProjectShare ps 
         JOIN Login viewer ON viewer.email = ps.email
         WHERE p.id = ps.projectId AND viewer.id = @loginId
         )
      )
   END
END;
GO

CREATE OR ALTER proc [dbo].[Project_SelectByIdWithSharedEmail]
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
		 ph.dateCreated as dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted
		 , p.isCalculationIdOverride
	FROM Project p
	RIGHT JOIN ProjectShare ps ON ps.projectId = p.id 
  LEFT JOIN ProjectHidden ph on p.id = ph.projectId 
  JOIN Login l on ps.email = l.email and ph.loginId = l.id
	WHERE ps.email = @email AND ps.projectid = @id;
END
GO

CREATE OR ALTER  PROC [dbo].[Project_UpdateCalculationId]
	@id int
	, @targetPoints int
	, @earnedPoints int
	, @projectLevel int
	, @calculationId int
	, @isCalculationIdOverride bit
	, @loginId int
AS
BEGIN

	UPDATE Project SET 
		targetPoints = @targetPoints
		, earnedPoints = @earnedPoints
		, projectLevel = @projectLevel
		, calculationId = @calculationId
		, isCalculationIdOverride = @isCalculationIdOverride
		, DateModified = getutcdate()
	WHERE 
		id = @id AND
		EXISTS (SELECT 1 FROM Login WHERE id = @loginId AND isAdmin = 1)

END
GO

// Update all projects to use the current calculation.
UPDATE Project SET 
	calculationId = (SELECT MAX(Calculation.id) FROM Calculation)
