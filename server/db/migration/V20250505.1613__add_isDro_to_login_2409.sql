IF COL_LENGTH('Login', 'isDro') IS NULL 
BEGIN 
  
  ALTER TABLE Login
	ADD isDro bit DEFAULT 0 NOT NULL

END
GO

CREATE OR ALTER  PROCEDURE Login_SelectAllIsDRO
AS
BEGIN

    SELECT w.id, w.firstName, w.lastName, w.email
    FROM Login w
    WHERE w.IsDro = 1
    ORDER BY w.lastName, w.firstName, w.dateCreated;

END
GO

CREATE OR ALTER PROCEDURE Login_SelectAll
AS
BEGIN

    SELECT w.id, w.firstName, w.lastName, w.email, w.dateCreated,
		w.emailConfirmed, w.isAdmin, w.passwordHash, w.isSecurityAdmin,
		w.isDro
    FROM login w
    WHERE w.archivedAt IS NULL
    ORDER BY w.lastName, w.firstName, w.dateCreated

END
GO

CREATE OR ALTER  PROCEDURE Login_SelectAllArchived
AS
BEGIN

    SELECT w.id, w.firstName, w.lastName, w.email, w.dateCreated,
		w.emailConfirmed, w.isAdmin, w.passwordHash, w.isSecurityAdmin, w.archivedAt,
		w.isDro
    FROM login w
    WHERE w.archivedAt IS NOT NULL
    ORDER BY w.lastName, w.firstName, w.dateCreated

END
GO

CREATE OR ALTER proc Login_SelectById
	@id int
AS
BEGIN

	SELECT w.id, w.firstName, w.lastName, w.email, w.dateCreated,
		w.emailConfirmed, w.isAdmin, w.passwordHash, w.isSecurityAdmin,
		w.isDro
	FROM login w
	WHERE w.id = @id

END
GO

CREATE OR ALTER  PROC Login_SelectByEmail
	@email nvarchar(100)
AS
BEGIN

	SELECT 
        w.id, 
        w.firstName, 
        w.lastName, 
        w.email, 
        w.dateCreated,
		w.emailConfirmed, 
        w.isAdmin, 
        w.passwordHash, 
        w.isSecurityAdmin,
        w.archivedAt,
        w.isDro
	FROM login w
	WHERE w.email like @email

END
GO

CREATE OR ALTER proc Login_UpdateRoles
	@isAdmin bit,
	@isSecurityAdmin bit,
	@isDro bit,
	@id int
AS
BEGIN

	UPDATE Login SET
		isAdmin = @isAdmin,
		isSecurityAdmin = @isSecurityAdmin,
		isDro = @isDro
	FROM Login
	WHERE id = @id

END
GO