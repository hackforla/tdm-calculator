/****** Object:  StoredProcedure [dbo].[Project_SelectAll]    Script Date: 3/30/2025 6:17:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER   PROC [dbo].[Project_SelectAll]
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
			, p.dateHidden
			, p.dateTrashed
			, p.dateSnapshotted
			, p.dateSubmitted
         , p.droId  -- New column
         , p.adminNotes  -- New column
         , p.dateModifiedAdmin  -- New column
      FROM Project p
      JOIN Login author ON p.loginId = author.id
      WHERE author.id = ISNULL(307, author.id) OR EXISTS
	  (
		SELECT 1 from ProjectShare ps 
		JOIN Login viewer ON viewer.email = ps.email
		WHERE p.id = ps.projectId AND viewer.id = 307
	  )
   END
END;
GO


