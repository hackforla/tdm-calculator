CREATE OR ALTER PROCEDURE [dbo].[Project_UpdateAdminNotes]
    @Id INT,
    @adminNotes NVARCHAR(MAX),
    @DateModifiedAdmin DATETIME2, 
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
