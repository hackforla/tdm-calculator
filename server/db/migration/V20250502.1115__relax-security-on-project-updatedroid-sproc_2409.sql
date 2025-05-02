/* 
Change to allow author of project to update droId
Also, change to dro should not update dateModifiedAdmin
*/
CREATE OR ALTER PROCEDURE [dbo].[Project_UpdateDroId]
   @Id INT,
   @DroId INT,
   @LoginId INT
AS
BEGIN
   -- Only allow the update if the user is an admin
   IF EXISTS (SELECT 1 FROM Login WHERE id = @LoginId AND isAdmin = 1) OR 
	EXISTS (SELECT 1 FROM Project WHERE id = @Id AND loginId = @loginId)
   BEGIN
      -- Update the droId without touching dateModified
      UPDATE Project
      SET 
         droId = @DroId
      WHERE id = @Id;
   END
   ELSE
   BEGIN
      RAISERROR('Only admins or the author can update the droId.', 16, 1);
   END
END;
GO


/*
  Remove parameter @DateModifiedAdmin and set dateModifiedAdmin from db server
*/
ALTER   PROCEDURE [dbo].[Project_UpdateAdminNotes]
    @Id INT,
    @adminNotes NVARCHAR(MAX),
    @LoginId INT
AS
BEGIN
   -- Only allow the update if the user is an admin
   IF EXISTS (SELECT 1 FROM Login WHERE id = @LoginId AND isAdmin = 1)
   BEGIN
      -- Update the project with admin notes and dateModifiedAdmin
        UPDATE Project
        SET 
            adminNotes = @adminNotes,
            dateModifiedAdmin = GETUTCDATE()
        WHERE id = @Id;
   END
   ELSE
   BEGIN
      -- User is not an admin, raise an error
      RAISERROR('Only admins can update the admin notes.', 16, 1);
   END
END;