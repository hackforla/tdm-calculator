CREATE OR ALTER PROC dbo.FaqCategory_SelectAll  
AS 
BEGIN  
/*   

EXEC dbo.FaqCategory_SelectAll  

*/   

SELECT    id, name, displayOrder, faqs
FROM FaqCategory  

END
GO