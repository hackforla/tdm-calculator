-- Create Dro table
CREATE TABLE Dro (
    id INT PRIMARY KEY IDENTITY(1,1), 
    name NVARCHAR(200) NOT NULL,     
    displayOrder INT NOT NULL DEFAULT 10
);
GO

-- Add new columns to Project table
ALTER TABLE Project
ADD
    droId INT NULL,
    adminNotes VARCHAR(MAX) NULL, 
    dateModifiedAdmin DATETIME2(7) NULL;
GO

-- Add the foreign key constraint to link droId in Project to id in Dro
ALTER TABLE Project
ADD CONSTRAINT FK_Project_Dro FOREIGN KEY (droId)
REFERENCES Dro(id);
GO
