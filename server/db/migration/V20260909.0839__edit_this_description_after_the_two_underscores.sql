IF NOT EXISTS (
    SELECT 1 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME = 'Project' 
      AND COLUMN_NAME = 'projectName'
)
BEGIN
    ALTER TABLE Project 
    ADD projectName nvarchar(200) NULL DEFAULT '';
END

/* Change label of PROJECT_NAME to 'TDM Plan Name' across all
Program guidelines versions. */
UPDATE CalculationRule 
SET name = 'TDM Plan Name',
description = '<p>The TDM Plan Name should be the way that you refer to the TDM Plan in conversation.</p>'
WHERE code = 'PROJECT_NAME'

IF NOT EXISTS (
    SELECT 1 
    FROM CalculationRule
	WHERE code = 'DEVELOPMENT_PROJECT'
)
BEGIN
	INSERT INTO CalculationRule (calculationId, code, name, category, dataType, units,
	value, functionBody, displayOrder, inactive, calculationPanelId,
	used, displayFunctionBody, minValue, maxValue, choices, calcCode,
	required, minStringLength, maxStringLength, displayComment, description,
	mask, link, validationFunctionBody, readOnly, sideEffects)
	SELECT
	cr.calculationId, 'DEVELOPMENT_PROJECT', 'Development Project Name', cr.category, cr.dataType, cr.units,
	cr.value, cr.functionBody, cr.displayOrder + 1, cr.inactive, cr.calculationPanelId,
	cr.used, cr.displayFunctionBody, cr.minValue, cr.maxValue, cr.choices, cr.calcCode,
	0, cr.minStringLength, cr.maxStringLength, cr.displayComment, 
	'<p>The Development Project Name should be the way that you refer to the project in conversation.</p>',
	cr.mask, cr.link, cr.validationFunctionBody, cr.readOnly, cr.sideEffects
	FROM CalculationRule cr JOIN Calculation c on cr.calculationId =c.id
	WHERE cr.code = 'PROJECT_NAME'
END
GO

CREATE OR ALTER   PROC [dbo].[Project_Insert]
	@name nvarchar(200)
	, @projectName nvarchar(200)
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
		, projectName
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
		, @projectName
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

CREATE OR ALTER   PROC [dbo].[Project_Update]
	@id int
	, @name nvarchar(200)
	, @projectName nvarchar(200)
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

	DECLARE @rc int
	SELECT @rc = count(*) FROM Project p WHERE p.id = @id AND p.dateSnapshotted IS NOT NULL
	IF (@rc = 1)
	BEGIN
		RETURN 1 /* Cannot update a snapshot */
	END

	UPDATE Project SET 
		name = @name
		, projectName = @projectName
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

CREATE  OR ALTER PROC [dbo].[Project_SelectAll]
   @loginId int = null
AS
BEGIN
   IF EXISTS(SELECT 1 FROM Login WHERE id = @LoginId AND isAdmin = 1)
   BEGIN
      -- Admin can see all projects
      SELECT
         p.id
			, p.name
			, p.projectName
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
			, p.invoiceStatusId
			, p.dateInvoicePaid
      , (SELECT COUNT(*) FROM ProjectShare ps WHERE ps.projectId = p.id) AS shareCount
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
			, p.projectName
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
			, p.invoiceStatusId
			, p.dateInvoicePaid
      , (SELECT COUNT(*) FROM ProjectShare ps WHERE ps.projectId = p.id) AS shareCount
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


CREATE OR ALTER  PROCEDURE [dbo].[Project_SelectAllArchived]
AS
BEGIN
    SELECT
        p.id
        , p.name
		, p.projectName
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
		    , p.invoiceStatusId
		    , p.dateInvoicePaid
        , (SELECT COUNT(*) FROM ProjectShare ps WHERE ps.projectId = p.id) AS shareCount
    FROM Project p
    JOIN Login author on p.loginId = author.id
    LEFT JOIN ProjectHidden ph on p.id = ph.projectId AND ph.loginId = p.loginId
    WHERE p.archivedAt IS NOT NULL
END;
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
		 p.projectName,
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
         l.email,
		     p.invoiceStatusId,
		     p.dateInvoicePaid,
        (SELECT COUNT(*) FROM ProjectShare ps WHERE ps.projectId = p.id) AS shareCount
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
		 p.projectName,
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
         l.email,
		     p.invoiceStatusId,
		     p.dateInvoicePaid,
         (SELECT COUNT(*) FROM ProjectShare ps WHERE ps.projectId = p.id) AS shareCount
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


CREATE OR ALTER  proc [dbo].[Project_SelectByIdWithSharedEmail]
	@email NVARCHAR(100),
	@id INT
AS
BEGIN
	SELECT
         p.id,
         p.name,
		 p.projectName,
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

CREATE OR ALTER   PROC [dbo].[ProjectSubmission_SelectAdmin]
   @loginId int = null, -- loginId of Admin user
   @projectId int = null -- optional, null returns all
AS
BEGIN
/* 
	This is used to populate the Manage Submissions Admin page, 
	which allows an admin to view and process submitted snapshots.
*/
	
    SELECT
        p.id
		, p.name
		, p.projectName
		, p.address
		, p.projectLevel
		, p.dateSubmitted
		, p.dateStatus
		, p.loginIdStatus
		, ls.firstName as statuserFirstName
		, ls.lastName as statuserLastName
		, p.droId 
		, d.name as droName
		, p.loginIdAssigned
		, la.firstName as assigneeFirstName
		, la.lastName as assigneeLastName
		, p.dateAssigned
		, p.invoiceStatusId
		, i.name as invoiceStatusName
		, p.dateInvoicePaid
		, p.onHold
		, p.approvalStatusId
		, a.name as approvalStatusName
		, p.dateCoO
		, p.dateTrashed
		, p.dateSnapshotted
		, p.adminNotes
		, p.dateModifiedAdmin
		, p.loginId
		, author.firstName as authorFirstName
		, author.lastName as authorLastName
		, author.email as authorEmail
		, p.calculationId
		, p.targetPoints
		, p.earnedPoints
		, p.formInputs
    FROM Project p
		JOIN Login author ON p.loginId = author.id
		LEFT JOIN Login ls ON p.loginIdStatus = ls.id
		LEFT JOIN Login la ON p.loginIdAssigned = la.id
		LEFT JOIN Dro d on p.droId = d.id
		LEFT JOIN InvoiceStatus i on p.invoiceStatusId = i.id
		LEFT JOIN ApprovalStatus a on p.approvalStatusId = a.id
    WHERE p.dateSubmitted IS NOT NULL -- IS a Submission
		AND p.dateTrashed IS NULL -- IS NOT deleted
		AND EXISTS (SELECT 1 FROM Login WHERE id = @loginId AND isAdmin = 1)
		AND (@projectId IS NULL OR p.id = @projectId)
END
GO


CREATE OR ALTER  PROC [dbo].[ProjectSubmission_SelectByLoginId]
   @loginId int = null
AS
BEGIN
/* 
	This is used to populate the Submissions page, which displays
	the status of projects submitted by a particular user
*/
    SELECT
        p.id
		, p.name
		, p.projectName
		, p.address
		, p.projectLevel
		, p.dateSubmitted
		, p.dateStatus
		, p.loginIdStatus
		, ls.firstName as statuserFirstName
		, ls.LastName as statuserLastName
		, p.droId 
		, d.name as droName
		, p.loginIdAssigned
		, la.firstName as assignedFirstName
		, la.lastName as assignedLastName
		, p.dateAssigned
		, p.invoiceStatusId
		, i.name as invoiceStatusName
		, p.dateInvoicePaid
		, p.onHold
		, p.approvalStatusId
		, a.name as approvalStatusName
		, p.dateCoO
		, p.dateTrashed
		, p.dateSnapshotted
    FROM Project p
    JOIN Login author ON p.loginId = author.id
	LEFT JOIN Login ls ON p.loginIdStatus = ls.id
	LEFT JOIN Login la ON p.loginIdAssigned = la.id
	LEFT JOIN Dro d on p.droId = d.id
	LEFT JOIN InvoiceStatus i on p.invoiceStatusId = i.id
	LEFT JOIN ApprovalStatus a on p.approvalStatusId = a.id
    WHERE author.id = @loginId
	AND p.dateSubmitted IS NOT NULL
	AND p.dateTrashed IS NULL
END
GO