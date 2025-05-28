CREATE OR ALTER PROCEDURE About_SelectAll
AS 
BEGIN  
/*   

EXEC dbo.About_SelectAll  

*/   

SELECT    id, title, displayOrder, content
FROM About 

END
GO

IF TYPE_ID(N'AboutType') IS NULL
BEGIN

	CREATE TYPE AboutType AS TABLE(
		title varchar(250) NULL,
		displayOrder int NULL,
		content nvarchar(max) NULL
	)

END
GO

CREATE OR ALTER PROC About_InsertAll
    @abouts dbo.AboutType READONLY
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM About

    /* Insert new records into About table */
    INSERT INTO About (title, displayOrder, content)
    SELECT title, displayOrder, content
    FROM @abouts;
END;
GO