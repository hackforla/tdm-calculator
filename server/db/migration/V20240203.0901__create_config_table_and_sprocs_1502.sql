
IF NOT EXISTS (SELECT * FROM SysObjects where name = 'Config' and xtype = 'U')
	CREATE TABLE [dbo].[Config](
		[code] [nvarchar](250) NOT NULL,
		[value] [nvarchar](max) NULL,
		CONSTRAINT PK_Config PRIMARY KEY CLUSTERED (code)
	) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE OR ALTER  PROC Config_SelectAll 
AS 
BEGIN  
/*   

EXEC Config_SelectAll  

*/   

SELECT  code, value
FROM Config  

END
GO

CREATE OR ALTER  PROC Config_Select
@code nvarchar(max)
AS 
BEGIN  
/*   

EXEC Config_Select 'Dummy'  

*/   

	SELECT  code, value
	FROM Config 
	WHERE code = @code

END
GO

CREATE OR ALTER  PROC Config_Insert
@code nvarchar(max),
@value nvarchar(max)
AS 
BEGIN  
/*   

EXEC Config_Insert 'Dummy', 'A Test Value'  

*/   

INSERT Config (code, value)
VALUES (@code, @value) 

END
GO

CREATE OR ALTER  PROC Config_Update
@code nvarchar(max),
@value nvarchar(max)
AS 
BEGIN 
/*

EXEC Config_Update 'Dummy', 'A New Value'

*/

UPDATE Config SET
	value = @value
WHERE code = @code

END
GO

CREATE OR ALTER  PROC Config_Delete
@code nvarchar(max)
AS 
/*
	EXEC Config_Delete 'Dummy'
*/
BEGIN    

	DELETE FROM Config
	WHERE code = @code

END
GO

/* 
Populate initially with Okta Development Settings. For other environments, the 
Confic values will need to be set manually or with another script.
*/
IF NOT EXISTS (SELECT * FROM Config){
  EXEC Config_Insert 'OKTA_ENABLE', 'T'
  EXEC Config_Insert 'OKTA_CLIENT_ID', '0oaeecq7dzuXwy5go5d7'
  EXEC Config_Insert 'OKTA_ISSUER', 'https://dev-50564150.okta.com/oauth2/default'
}

