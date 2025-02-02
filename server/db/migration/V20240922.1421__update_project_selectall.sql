-- Add or update Project_SelectAll stored procedure

ALTER PROC [dbo].[Project_SelectAll]
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
