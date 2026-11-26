ALTER TABLE [dbo].[Project]
ADD [replacedByProjectId] INT NULL
CONSTRAINT [FK_Replaced_By_Project_ID] FOREIGN KEY REFERENCES [dbo].[Project]([id]);
GO

CREATE OR ALTER PROC [dbo].[Project_VerifyReplacementProject]
    @id int
    , @loginId int
AS
BEGIN
    DECLARE @rc int
    SELECT @rc = count(*) FROM Project p WHERE p.id = @id AND p.loginId = @loginId
    IF (@rc = 0)
    BEGIN
        RETURN 1 /* project does not exist or is not owned by @loginId */
    END

    IF (SELECT count(*) FROM Project p WHERE p.id = @id and p.approvalStatusId <> 3) > 0
    BEGIN
        RETURN 2 /* project is not withdrawn */
    END

    IF (SELECT count(*) FROM Project p WHERE p.id = @id and p.replacedByProjectId IS NOT NULL) > 0
    BEGIN
        RETURN 3 /* project already has replacement project id */
    END

    RETURN 0 /* valid */
END
GO

CREATE OR ALTER PROC [dbo].[Project_SetReplacementProject]
    @id int
    , @replacedByProjectId int
    , @loginId int
AS
BEGIN
    DECLARE @rc int
    SELECT @rc = count(*) FROM Project p WHERE p.id = @id AND p.loginId = @loginId
    IF (@rc = 0)
    BEGIN
        RETURN 1 /* project is not owned by @loginId - throw error */
    END

    UPDATE Project SET
        replacedByProjectId = @replacedByProjectId
    WHERE Project.id = @id

    RETURN 0
END
GO
