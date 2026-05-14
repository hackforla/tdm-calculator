
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

ALTER       PROC [dbo].[Project_SelectById]
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

/****** Object:  StoredProcedure [dbo].[Project_SelectAllArchived]    Script Date: 5/4/2026 9:40:59 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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





