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

    DELETE FROM dbo.FaqCategory

    /* Insert new records into FaqCategory table */
    INSERT INTO dbo.FaqCategory (name, displayOrder, faqs)
    SELECT name, displayOrder, faqs
    FROM @faqCategories;
END;
GO