CREATE proc [dbo].[Project_SelectByIdWithSharedEmail]
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
         p.dateHidden,
         p.dateTrashed,
         p.dateSnapshotted,
         p.dateSubmitted
	FROM Project p
	RIGHT JOIN ProjectShare ps ON ps.projectId = p.id
	WHERE ps.email = @email AND ps.projectid = @id;
END
GO