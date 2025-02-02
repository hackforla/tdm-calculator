CREATE OR ALTER PROCEDURE [dbo].[Project_UpdateDroId]
   @Id INT,
   @DroId INT,
   @DateModifiedAdmin DATETIME2,
   @LoginId INT
AS
BEGIN
   -- Only allow the update if the user is an admin
   IF EXISTS (SELECT 1 FROM Login WHERE id = @LoginId AND isAdmin = 1)
   BEGIN
      -- Update the droId and dateModifiedAdmin without touching dateModified
      UPDATE Project
      SET 
         droId = @DroId,
         dateModifiedAdmin = @DateModifiedAdmin
      WHERE id = @Id;
   END
   ELSE
   BEGIN
      -- User is not an admin, raise an error
      RAISERROR('Only admins can update the droId.', 16, 1);
   END
END;
