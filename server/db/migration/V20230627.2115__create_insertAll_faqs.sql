/* Drop existing stored procedures for FaqCategory table */
IF OBJECT_ID('dbo.FaqCategory_Update', 'P') IS NOT NULL
    DROP PROCEDURE dbo.FaqCategory_Update;
GO

/* Create user-defined table type for FaqCategory */
CREATE TYPE dbo.FaqCategoryType AS TABLE
(
    name VARCHAR(250),
    displayOrder INT,
    faqs NVARCHAR(MAX)
);
GO

ALTER TABLE dbo.faqCategory 
ADD faqs NVARCHAR(MAX) NOT NULL DEFAULT ''
GO

/* Create stored procedure for inserting multiple FaqCategory records */
CREATE OR ALTER PROC dbo.FaqCategory_InsertAll
    @faqCategories dbo.FaqCategoryType READONLY
AS
BEGIN
    SET NOCOUNT ON;

    /* Drop existing table FaqCategory if it exists */
    IF OBJECT_ID('dbo.FaqCategory', 'U') IS NOT NULL
        DROP TABLE dbo.FaqCategory;

    /* Drop existing table FaqCategory if it exists */
    IF OBJECT_ID('dbo.Faq', 'U') IS NOT NULL
        DROP TABLE dbo.Faq;

    /* Create new table FaqCategory */
    CREATE TABLE dbo.FaqCategory
    (
        id INT IDENTITY(1, 1) PRIMARY KEY,
        name VARCHAR(250),
        displayOrder INT,
        faqs NVARCHAR(MAX)
    );

    /* Insert new records into FaqCategory table */
    INSERT INTO dbo.FaqCategory (name, displayOrder, faqs)
    SELECT name, displayOrder, faqs
    FROM @faqCategories;
END;
GO