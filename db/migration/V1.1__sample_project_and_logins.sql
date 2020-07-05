DELETE FROM CalculationRule WHERE calculationId > 1;
DELETE FROM Calculation WHERE id > 1;

SET IDENTITY_INSERT [dbo].[Login] ON 
GO

INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) 
VALUES (37, N'LA', N'DOT', N'ladot@dispostable.com', CAST(N'2020-01-10T22:13:30.3066667' AS DateTime2), 
1, 1, N'$2b$10$Wis7xCVUKsRIxSds2WuTFOW2Kd7EoJ7EkZapuyTRA05Oe4n4uW0jq', 0)
GO

INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) 
VALUES (82, N'Security', N'Admin', N'securityadmin@dispostable.com', CAST(N'2020-07-05T16:23:06.7000000' AS DateTime2), 
1, 0, N'$2b$10$tlsJVMOD1HL838/hsPv52OY/TkwIomFswqw5tuN9hZlfOcifi3DoK', 1)
GO

SET IDENTITY_INSERT [dbo].[Login] OFF
GO

SET IDENTITY_INSERT [dbo].[Project] ON 
GO
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) 
VALUES (2, N'Barrington Condos', N'825 S. Barrington Av', N'{"UNITS_CONDO":"46","PARK_CONDO":"92","STRATEGY_AFFORDABLE":"1","PROJECT_NAME":"Barrington Condos","PROJECT_ADDRESS":"825 S. Barrington Av","LAND_USE_RESIDENTIAL":true,"PARK_SPACES":"88","STRATEGY_ACCESS_1":"0","STRATEGY_BIKE_4":true,"STRATEGY_PARKING_1":true,"STRATEGY_PARKING_5":true}', CAST(N'2020-01-09T00:43:00.9200000' AS DateTime2), CAST(N'2020-02-18T17:14:35.3533333' AS DateTime2), 37, 1, N'')
GO
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) 
VALUES (3, N'Fountain Apartments', N'5460 W. Fountain Av.', N'{"UNITS_HABIT_LT3":"37","UNITS_HABIT_3":"36","UNITS_HABIT_GT3":"2","STRATEGY_AFFORDABLE":"1","STRATEGY_CAR_SHARE_1":true,"PROJECT_NAME":"Fountain Apartments","PROJECT_ADDRESS":"5460 W. Fountain Av.","PROJECT_DESCRIPTION":"A 75-unit six-story apartment building","LAND_USE_RESIDENTIAL":true,"PARK_SPACES":"108","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_PARKING_1":true,"STRATEGY_INFO_2":true,"STRATEGY_SHARED_MOBILITY_1":true,"BUILDING_PERMIT":"101"}', CAST(N'2020-01-10T23:43:17.2600000' AS DateTime2), CAST(N'2020-02-18T17:39:16.1000000' AS DateTime2), 37, 1, N'A 75-unit six-story apartment building')
GO
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) 
VALUES (4, N'Victory Hotel', N'12425 Victory Bl.', N'{"UNITS_GUEST":"80","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_1":true,"STRATEGY_HOV_3":true,"PROJECT_NAME":"Victory Hotel","PROJECT_ADDRESS":"12425 Victory Bl.","PROJECT_DESCRIPTION":"80-room four-story hotel. Spreadsheet has parkingcalc error.","LAND_USE_HOTEL":true,"PARK_SPACES":"76","STRATEGY_ACCESS_1":"25","STRATEGY_BIKE_4":true,"STRATEGY_INFO_1":true,"STRATEGY_INFO_2":true,"STRATEGY_INFO_3":true,"STRATEGY_TRANSIT_ACCESS_3":"25"}', CAST(N'2020-01-10T23:46:56.2300000' AS DateTime2), CAST(N'2020-02-18T17:39:37.2400000' AS DateTime2), 37, 1, N'80-room four-story hotel. Spreadsheet has parkingcalc error.')
GO
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) 
VALUES (5, N'Beatrice Building', N'12575 Beatrice St.', N'{"SF_RETAIL":"900","SF_RESTAURANT":"2500","SF_OFFICE":"283981","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_3":true,"STRATEGY_PARKING_2":true,"PROJECT_NAME":"Beatrice Building","PROJECT_ADDRESS":"12575 Beatrice St.","PROJECT_DESCRIPTION":"Sq Ft differs between spreadsheet and PDF supplied","LAND_USE_RETAIL":true,"LAND_USE_COMMERCIAL":true,"PARK_SPACES":"845","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_INFO_1":true,"STRATEGY_INFO_2":true,"STRATEGY_TRANSIT_ACCESS_3":"25"}', CAST(N'2020-01-11T00:44:08.2433333' AS DateTime2), CAST(N'2020-02-18T17:38:36.7433333' AS DateTime2), 37, 1, N'Sq Ft differs between spreadsheet and PDF supplied')
GO
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) 
VALUES (6, N'Clarendon Apartments', N'22055 W. Clarendon St.', N'{"UNITS_HABIT_LT3":"51","UNITS_HABIT_3":"134","UNITS_HABIT_GT3":"150","STRATEGY_AFFORDABLE":"1","STRATEGY_CAR_SHARE_1":true,"STRATEGY_CAR_SHARE_2":true,"PROJECT_NAME":"Clarendon Apartments","PROJECT_ADDRESS":"22055 W. Clarendon St.","PROJECT_DESCRIPTION":"335-unit five-story apartment building","LAND_USE_RESIDENTIAL":true,"PARK_SPACES":"564","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":"0","STRATEGY_PARKING_1":true,"APN":"123333"}', CAST(N'2020-01-11T00:47:15.5466667' AS DateTime2), CAST(N'2020-06-30T17:42:52.9166667' AS DateTime2), 37, 1, N'335-unit five-story apartment building')
GO
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) 
VALUES (7, N'Jewish Family Service - Social Services Center', N'320 N. Fairfax', N'{"SF_OFFICE":"28341","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_3":true,"PROJECT_NAME":"Jewish Family Service - Social Services Center","PROJECT_ADDRESS":"320 N. Fairfax","PROJECT_DESCRIPTION":"New 28,023 sf three-story building","LAND_USE_COMMERCIAL":true,"PARK_SPACES":"63","STRATEGY_BIKE_4":true,"STRATEGY_INFO_1":true,"STRATEGY_INFO_2":true,"STRATEGY_INFO_3":true}', CAST(N'2020-01-11T00:51:02.5666667' AS DateTime2), CAST(N'2020-02-18T17:40:25.4133333' AS DateTime2), 37, 1, N'New 28,023 sf three-story building')
GO

SET IDENTITY_INSERT [dbo].[Project] OFF
GO


