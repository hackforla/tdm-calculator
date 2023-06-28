/* Drop existing table FaqCategory if it exists */
IF OBJECT_ID('dbo.FaqCategory', 'U') IS NOT NULL
    DROP TABLE dbo.FaqCategory;
GO

/* Drop existing table Faq if it exists */
IF OBJECT_ID('dbo.Faq', 'U') IS NOT NULL
    DROP TABLE dbo.Faq;
GO

/* Create new table FaqCategory with updated structure */
CREATE TABLE dbo.FaqCategory (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    name VARCHAR(250),
    displayOrder INT,
    faqs NVARCHAR(MAX)
);
GO

/* Recreate the stored procedure for inserting multiple FaqCategory records */
IF OBJECT_ID('dbo.FaqCategory_InsertAll', 'P') IS NOT NULL
    DROP PROCEDURE dbo.FaqCategory_InsertAll;
GO

/* Create stored procedure for inserting multiple FaqCategory records */
CREATE PROC dbo.FaqCategory_InsertAll
    @faqCategories dbo.FaqCategoryType READONLY
AS
BEGIN
    SET NOCOUNT ON;

    /* Insert new records into FaqCategory table */
    INSERT INTO dbo.FaqCategory (name, displayOrder, faqs)
    SELECT name, displayOrder, faqs
    FROM @faqCategories;
END;
GO