/*
  Modify FAQ to support foreign ID, faqCategoryId
*/

/* Delete the contents of the FAQ table, since we will replace all the rows. */
DELETE FROM Faq


/*  Create and populate the FaqCategory before referencing it from the Faq Table. */
CREATE TABLE [dbo].[FaqCategory]
(
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](250) NULL,
	displayOrder int NOT NULL DEFAULT 1000
	PRIMARY KEY(id)
) 
GO

SET IDENTITY_INSERT FaqCategory ON
GO

INSERT FaqCategory (id, name, displayOrder)
VALUES (1, 'Important Updates' , 10)

INSERT FaqCategory (id, name, displayOrder)
VALUES (2, 'Getting Started' , 20)

INSERT FaqCategory (id, name, displayOrder)
VALUES (3, 'Point System' , 30)

INSERT FaqCategory (id, name, displayOrder)
VALUES (4, 'Strategy Selection' , 40)

INSERT FaqCategory (id, name, displayOrder)
VALUES (5, 'Relationship to Other Development Requirements' , 50)

INSERT FaqCategory (id, name, displayOrder)
VALUES (6, 'Next Steps' , 60)

SET IDENTITY_INSERT FaqCategory OFF
GO

/* Add the displayOrder and faqCategoryId Foreign Key to the Faq table */
ALTER TABLE [dbo].[Faq]
ADD displayOrder int NOT NULL DEFAULT 10000,
faqCategoryId int NOT NULL FOREIGN KEY REFERENCES faqCategory(id)
GO

/*
  Set FAQ to include foreign ID, faqCategoryId, and displayOrder 
*/

SET IDENTITY_INSERT [dbo].[Faq] ON 
GO

INSERT [dbo].[Faq] ([faqid], [faqCategoryId], [question], [answer], displayOrder) 
VALUES (1, 1, N'What does TDM mean?', N'Lorem ipsum dolor sit amet.', 10)
GO
INSERT [dbo].[Faq] ([faqid], [faqCategoryId], [question], [answer], displayOrder) 
VALUES (2, 2, N'How can I find out what a term in the Calculator means?', N'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 10)
GO
INSERT [dbo].[Faq] ([faqid], [faqCategoryId], [question], [answer], displayOrder) 
VALUES (3, 1, N'Ut enim ad minim veniam?', N'Quis nostrud exercitation ullamco.', 30)
GO
INSERT [dbo].[Faq] ([faqid], [faqCategoryId], [question], [answer], displayOrder) 
VALUES (4, 2, N'Laboris nisi ut aliquip?', N'Ex ea commodo consequat.', 5)
GO
INSERT [dbo].[Faq] ([faqid], [faqCategoryId], [question], [answer], displayOrder) 
VALUES (5, 2, N'Duis aute irure dolor in reprehenderit?', N'In voluptate velit esse cillum.', 30)
GO
INSERT [dbo].[Faq] ([faqid], [faqCategoryId], [question], [answer], displayOrder) 
VALUES (6, 3, N'Dolore eu fugiat nulla pariatur?', N'Excepteur sint occaecat cupidatat.', 100)

SET IDENTITY_INSERT [dbo].[Faq] OFF
GO

/*
select * from faqcategory

select f.*, fc.name 
from faq f join faqcategory fc
on f.faqcategoryid = fc.id
order by fc.displayOrder, f.displayOrder
*/