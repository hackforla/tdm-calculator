IF COL_LENGTH('Login', 'tdmProfileCompletedAt') IS NULL
BEGIN
  ALTER TABLE Login
    ADD tdmProfileCompletedAt datetime2(7) NULL
END
GO

CREATE OR ALTER PROC Login_SelectByEmail
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
    w.isDro,
    w.externalAuthProvider,
    w.externalSubject,
    w.externalLinkedAt,
    w.tdmProfileCompletedAt
  FROM login w
  WHERE w.email like @email
END
GO

CREATE OR ALTER PROC Login_SelectByExternalIdentity
  @externalAuthProvider nvarchar(50),
  @externalSubject nvarchar(255)
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
    w.isDro,
    w.externalAuthProvider,
    w.externalSubject,
    w.externalLinkedAt,
    w.tdmProfileCompletedAt
  FROM login w
  WHERE w.externalAuthProvider = @externalAuthProvider
    AND w.externalSubject = @externalSubject
END
GO

CREATE OR ALTER PROC Login_CompleteTdmProfile
  @id int,
  @firstName nvarchar(50),
  @lastName nvarchar(50),
  @email nvarchar(100)
AS
BEGIN
  UPDATE Login SET
    firstName = @firstName,
    lastName = @lastName,
    email = @email,
    emailConfirmed = 1,
    tdmProfileCompletedAt = getutcdate()
  WHERE id = @id
END
GO
