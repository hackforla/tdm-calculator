IF COL_LENGTH('Login', 'externalAuthProvider') IS NULL
BEGIN
  ALTER TABLE Login
    ADD externalAuthProvider nvarchar(50) NULL,
        externalSubject nvarchar(255) NULL,
        externalLinkedAt datetime2(7) NULL
END
GO

IF NOT EXISTS (
  SELECT 1
  FROM sys.indexes
  WHERE name = 'UX_Login_ExternalIdentity'
    AND object_id = OBJECT_ID('Login')
)
BEGIN
  CREATE UNIQUE INDEX UX_Login_ExternalIdentity
    ON Login(externalAuthProvider, externalSubject)
    WHERE externalAuthProvider IS NOT NULL
      AND externalSubject IS NOT NULL
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
    w.externalLinkedAt
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
    w.externalLinkedAt
  FROM login w
  WHERE w.externalAuthProvider = @externalAuthProvider
    AND w.externalSubject = @externalSubject
END
GO

CREATE OR ALTER PROC Login_LinkExternalIdentity
  @id int,
  @externalAuthProvider nvarchar(50),
  @externalSubject nvarchar(255)
AS
BEGIN
  UPDATE Login SET
    externalAuthProvider = @externalAuthProvider,
    externalSubject = @externalSubject,
    externalLinkedAt = getutcdate(),
    emailConfirmed = 1
  WHERE id = @id
END
GO

CREATE OR ALTER PROC Login_InsertExternal
  @firstName nvarchar(50),
  @lastName nvarchar(50),
  @email nvarchar(100),
  @externalAuthProvider nvarchar(50),
  @externalSubject nvarchar(255),
  @id int OUTPUT
AS
BEGIN
  INSERT Login
    (firstName, lastName, email, emailConfirmed, passwordHash, externalAuthProvider, externalSubject, externalLinkedAt)
  VALUES
    (@firstName, @lastName, @email, 1, NULL, @externalAuthProvider, @externalSubject, getutcdate())

  SET @id = SCOPE_IDENTITY()
END
GO
