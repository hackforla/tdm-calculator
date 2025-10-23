-- update ProjectSelectById proc - add approval status
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
			   ph.dateCreated as dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted,
         p.approvalStatusId,
         a.name as approvalStatusName
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
         ph.dateCreated as dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted,
         p.approvalStatusId,
         a.name as approvalStatusName
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