-- Include current-account sharing status for both admin and regular project lists.
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
      , CAST(CASE WHEN EXISTS (
          SELECT 1
          FROM ProjectShare ps
          JOIN Login recipient ON recipient.email = ps.email
          WHERE ps.projectId = p.id AND recipient.id = @loginId
        ) THEN 1 ELSE 0 END AS bit) AS isSharedWithMe
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
      , CAST(CASE WHEN EXISTS (
          SELECT 1
          FROM ProjectShare ps
          JOIN Login recipient ON recipient.email = ps.email
          WHERE ps.projectId = p.id AND recipient.id = @loginId
        ) THEN 1 ELSE 0 END AS bit) AS isSharedWithMe
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
