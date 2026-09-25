-- Update table dbo.Feedback
DELETE FROM [dbo].[Feedback];
GO

-- Add Primary Key to Feedback table
ALTER TABLE [dbo].[Feedback]
ADD CONSTRAINT [PK_Feedback] PRIMARY KEY ([id]);
GO

ALTER TABLE [dbo].[Feedback] DROP COLUMN [name];
GO

ALTER TABLE [dbo].[Feedback] DROP COLUMN [email];
GO

ALTER TABLE [dbo].[Feedback]
ADD [subject] nvarchar(250) NOT NULL;
GO

ALTER TABLE [dbo].[Feedback]
ADD [loginId] INT NULL
CONSTRAINT [FK_Feedback_Login] FOREIGN KEY REFERENCES [dbo].[Login]([id]);
GO

ALTER TABLE [dbo].[Feedback]
ADD [dateCreated] datetime2(7) NOT NULL
CONSTRAINT [DF_Feedback_dateCreated] DEFAULT (getutcdate());
GO

CREATE TABLE [dbo].[FeedbackProjects] (
    [id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [feedbackId] INT NOT NULL CONSTRAINT [FK_FeedbackProjects_Feedback] FOREIGN KEY REFERENCES [dbo].[Feedback]([id]) ON DELETE CASCADE,
    [projectId] INT NOT NULL CONSTRAINT [FK_FeedbackProjects_Project] FOREIGN KEY REFERENCES [dbo].[Project]([id])
);
GO

-- Recreate Feedback_Insert procedure
DROP PROCEDURE IF EXISTS [dbo].[Feedback_Insert];
GO

CREATE PROC [dbo].[Feedback_Insert]
    @id int OUTPUT,
    @loginId int = NULL,
    @subject nvarchar(250),
    @comment nvarchar(max),
    @forwardToWebTeam bit,
    @projectIds AS dbo.IdList READONLY
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert feedback record
    INSERT INTO [dbo].[Feedback] (
        loginId,
        subject,
        comment,
        forwardToWebTeam,
        dateCreated
    )
    VALUES (
        @loginId,
        @subject,
        @comment,
        @forwardToWebTeam,
        GETUTCDATE()
    );

    SET @id = SCOPE_IDENTITY();

    -- Insert associated project IDs
    INSERT INTO [dbo].[FeedbackProjects] (
        feedbackId,
        projectId
    )
    SELECT
        @id,
        id
    FROM @projectIds;
END
GO
