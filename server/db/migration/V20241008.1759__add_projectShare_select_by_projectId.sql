SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[ProjectShare_SelectByProjectId]
	@projectId INT
AS
BEGIN
	SELECT ps.id AS id, ps.email, p.id AS projectid
	FROM [dbo].[ProjectShare] ps 
	INNER JOIN [dbo].[Project] p
	ON ps.projectId = p.id and ps.projectId = @projectId;
END
GO