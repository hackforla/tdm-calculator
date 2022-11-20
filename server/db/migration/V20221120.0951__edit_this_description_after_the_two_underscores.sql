
/* Rename column Faq.faqId to Faq.id per column naming convention */
EXEC sp_rename 'Faq.faqId', 'id'
GO

/* Faq table is missing Primary Key */
ALTER TABLE Faq
ADD CONSTRAINT PK_Faq_id PRIMARY KEY CLUSTERED(id)
GO

/* Create (or re-create) standard CRUD stored procedures for Faq and FaqCategory tables */
CREATE OR ALTER PROC dbo.FaqCategory_Insert  
@name varchar(250)  
, @displayOrder int  
, @id int output 
AS 
BEGIN 

/*   
DECLARE @name varchar(250) = <value> 
DECLARE @displayOrder int = <value>  
DECLARE @Id int   

EXEC dbo.FaqCategory_Insert    @name   , @displayOrder   , @Id = @Id output  

*/   

INSERT FaqCategory  (   name   , displayOrder  )  
VALUES   (   @name   , @displayOrder  )   

SET @id = SCOPE_IDENTITY()  

END
GO

CREATE OR ALTER PROC dbo.FaqCategory_Update   
@id int  
, @name varchar(250)  
, @displayOrder int 
AS 
BEGIN 
/*   

DECLARE @name varchar(250) = <value>  
DECLARE @displayOrder int = <value>  
DECLARE @Id int   
EXEC dbo.FaqCategory_Update    @name   , @displayOrder   , @Id  

*/   

UPDATE FaqCategory SET    
	name = @name   
	, displayOrder = @displayOrder 
WHERE    
	id = @id  
	
END
GO

CREATE OR ALTER PROC dbo.FaqCategory_Delete  
@id int 
AS 
BEGIN 
/*   

dbo.FaqCategory_Delete <args>  

*/

DELETE FaqCategory  
WHERE id = @id 

END
GO


CREATE OR ALTER PROC dbo.FaqCategory_SelectById  
@id int 
AS 
BEGIN 
/*   
	EXEC dbo.FaqCategory_SelectById <args>   
*/    

SELECT    
	id   , name   , displayOrder  
FROM FaqCategory  
WHERE    id = @id  

END
GO


CREATE OR ALTER PROC dbo.FaqCategory_SelectAll  
AS 
BEGIN  
/*   

EXEC dbo.FaqCategory_SelectAll  

*/   

SELECT    id   , name   , displayOrder  
FROM FaqCategory  

END
GO

/***** Faq *** */

CREATE OR ALTER PROC dbo.Faq_Insert   
@question varchar(250)  
, @answer varchar(500)  
, @displayOrder int  
, @faqCategoryId int  
, @id int output 
AS 
BEGIN 
/*   

DECLARE @question varchar(250) = <value>  
DECLARE @answer varchar(500) = <value>  
DECLARE @displayOrder int = <value>  
DECLARE @faqCategoryId int = <value>  
DECLARE @Id int   

EXEC dbo.Faq_Insert    @question   , @answer   , @displayOrder   , @faqCategoryId   , @Id = @Id output  

*/   

INSERT Faq  (   question   , answer   , displayOrder   , faqCategoryId  )  
VALUES   (   @question   , @answer   , @displayOrder   , @faqCategoryId  )   

SET @id = SCOPE_IDENTITY()  
END
GO

CREATE OR ALTER PROC dbo.Faq_Update   
@id int  
, @question varchar(250)  
, @answer varchar(500)  
, @displayOrder int  
, @faqCategoryId int 
AS
BEGIN 
/*   

DECLARE @question varchar(250) = <value>  
DECLARE @answer varchar(500) = <value>  
DECLARE @displayOrder int = <value>  
DECLARE @faqCategoryId int = <value>  
DECLARE @Id int   

EXEC dbo.Faq_Update    @question   , @answer   , @displayOrder   , @faqCategoryId   , @Id   

*/   

UPDATE Faq SET    
	question = @question   
	, answer = @answer   
	, displayOrder = @displayOrder   
	, faqCategoryId = @faqCategoryId  
WHERE    id = @id  

END
GO

CREATE OR ALTER PROC dbo.Faq_Delete  
@id int 
AS 
BEGIN 
/*   

EXEC dbo.Faq_Delete <args>   

*/    

DELETE Faq  WHERE    id = @id 

END
GO

CREATE OR ALTER PROC 
dbo.Faq_SelectById  
@id int 
AS 
BEGIN 
/*   

EXEC dbo.Faq_SelectById <args>   

*/    

SELECT    id   , question   , answer   , displayOrder   , faqCategoryId  
FROM Faq  
WHERE    id = @id  

END
GO

CREATE OR ALTER PROC dbo.Faq_SelectAll  
AS 
BEGIN  
/*   

EXEC dbo.Faq_SelectAll   

*/   

SELECT    id   , question   , answer   , displayOrder   , faqCategoryId  
FROM Faq  

END
GO