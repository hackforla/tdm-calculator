CREATE TABLE ProjectShare (
    id INT PRIMARY KEY IDENTITY(1,1), 
    email NVARCHAR(100) NOT NULL,
    projectId INT NOT NULL FOREIGN KEY REFERENCES Project(id)
);
GO