/* Drop existing stored procedures for FaqCategory table */
IF OBJECT_ID('dbo.FaqCategory_InsertAll', 'P') IS NOT NULL
    DROP PROCEDURE dbo.FaqCategory_InsertAll;
GO

/* Drop existing table type for FaqCategory if it exists */
IF EXISTS (SELECT * FROM sys.types WHERE name = 'FaqCategoryType' AND is_table_type = 1)
    DROP TYPE dbo.FaqCategoryType;
GO

/* Create user-defined table type for FaqCategory */
CREATE TYPE dbo.FaqCategoryType AS TABLE
(
    id INT,
    name VARCHAR(250),
    displayOrder INT,
    faqs NVARCHAR(MAX)
);
GO

/* Drop existing stored procedures for FaqCategory table */
IF OBJECT_ID('dbo.FaqCategory_InsertAll', 'P') IS NOT NULL
    DROP PROCEDURE dbo.FaqCategory_InsertAll;
GO

/* Create stored procedure for inserting multiple FaqCategory records */
CREATE OR ALTER PROC dbo.FaqCategory_InsertAll
    @faqCategories dbo.FaqCategoryType READONLY
AS
BEGIN
    SET NOCOUNT ON;

    /* Insert new records into FaqCategory table */
    INSERT INTO dbo.FaqCategory (id, name, displayOrder, faqs)
    SELECT id, name, displayOrder, faqs
    FROM @faqCategories;
END;
GO