CREATE OR ALTER  PROC [dbo].[Project_Hide]
	@ids AS IdList READONLY
	, @hide bit
	, @loginId int
AS
BEGIN

  DELETE FROM ProjectHidden
  WHERE loginId = @loginId AND projectId in (SELECT id from @ids)

  IF @hide = 1
  BEGIN
    INSERT INTO ProjectHidden
    SELECT 
      @loginId as loginId, 
      i.id as projectId, 
      getutcdate() as dateHidden 
    FROM @ids i 
  END

END
GO


