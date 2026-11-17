ALTER TABLE [dbo].[Project]
ADD [replaceByProjectId] INT NULL
CONSTRAINT [FK_Replaced_By_Project_ID] FOREIGN KEY REFERENCES [dbo].[Project]([id]);
GO
