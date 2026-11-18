ALTER TABLE [dbo].[Project]
ADD [replacedByProjectId] INT NULL
CONSTRAINT [FK_Replaced_By_Project_ID] FOREIGN KEY REFERENCES [dbo].[Project]([id]);
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

    IF (SELECT count(*) FROM Project p WHERE p.id = @id and p.replacedByProjectId IS NOT NULL) > 0
    BEGIN
        RETURN 2 /* project already has replacement project id */
    END

    IF (SELECT count(*) FROM Project p WHERE p.id = @id and p.replacedByProjectId IS NULL and p.approvalStatusId <> 3) > 0
    BEGIN
        RETURN 3 /* project is not withdrawn */
    END

    UPDATE Project SET
        replacedByProjectId = @replacedByProjectId
    WHERE Project.id = @id

END
GO
