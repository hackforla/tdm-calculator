USE [master]
GO
/****** Object:  Database [tdmdev]    Script Date: 6/21/2020 4:47:54 PM ******/
CREATE DATABASE [tdmdev]
GO
ALTER DATABASE [tdmdev] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [tdmdev].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [tdmdev] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [tdmdev] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [tdmdev] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [tdmdev] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [tdmdev] SET ARITHABORT OFF 
GO
ALTER DATABASE [tdmdev] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [tdmdev] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [tdmdev] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [tdmdev] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [tdmdev] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [tdmdev] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [tdmdev] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [tdmdev] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [tdmdev] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [tdmdev] SET  DISABLE_BROKER 
GO
ALTER DATABASE [tdmdev] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [tdmdev] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [tdmdev] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [tdmdev] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [tdmdev] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [tdmdev] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [tdmdev] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [tdmdev] SET RECOVERY FULL 
GO
ALTER DATABASE [tdmdev] SET  MULTI_USER 
GO
ALTER DATABASE [tdmdev] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [tdmdev] SET DB_CHAINING OFF 
GO
ALTER DATABASE [tdmdev] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [tdmdev] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [tdmdev] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [tdmdev] SET QUERY_STORE = OFF
GO
USE [tdmdev]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [tdmdev]
GO
--/****** Object:  User [entrotech]    Script Date: 6/21/2020 4:47:57 PM ******/
--CREATE USER [entrotech] FOR LOGIN [entrotech] WITH DEFAULT_SCHEMA=[dbo]
--GO
--ALTER ROLE [db_owner] ADD MEMBER [entrotech]
--GO
--/****** Object:  Table [dbo].[CalculationRule]    Script Date: 6/21/2020 4:47:58 PM ******/
--SET ANSI_NULLS ON
--GO
--SET QUOTED_IDENTIFIER ON
--GO
CREATE TABLE [dbo].[CalculationRule](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[calculationId] [int] NOT NULL,
	[code] [varchar](50) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[category] [varchar](20) NOT NULL,
	[dataType] [varchar](20) NOT NULL,
	[units] [nvarchar](50) NOT NULL,
	[value] [nvarchar](200) NULL,
	[functionBody] [nvarchar](max) NULL,
	[displayOrder] [int] NOT NULL,
	[inactive] [bit] NOT NULL,
	[calculationPanelId] [int] NULL,
	[used] [bit] NOT NULL,
	[displayFunctionBody] [nvarchar](max) NOT NULL,
	[minValue] [numeric](6, 2) NULL,
	[maxValue] [numeric](6, 2) NULL,
	[choices] [nvarchar](max) NULL,
	[calcCode] [varchar](50) NULL,
	[required] [bit] NOT NULL,
	[minStringLength] [int] NULL,
	[maxStringLength] [int] NULL,
	[displayComment] [bit] NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[mask] [varchar](50) NULL,
	[link] [varchar](100) NULL,
 CONSTRAINT [PK_Rule] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[CalculationRuleCalculation]    Script Date: 6/21/2020 4:47:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[CalculationRuleCalculation] as 
select * from calculationrule 
where category = 'calculation'
GO
/****** Object:  View [dbo].[CalculationRuleInput]    Script Date: 6/21/2020 4:47:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[CalculationRuleInput] as 
select * from calculationrule 
where category = 'input'
GO
/****** Object:  View [dbo].[CalculationRuleMeasure]    Script Date: 6/21/2020 4:47:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[CalculationRuleMeasure] as 
select * from calculationrule 
where category = 'measure'
GO
/****** Object:  Table [dbo].[Calculation]    Script Date: 6/21/2020 4:47:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Calculation](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[description] [nvarchar](400) NOT NULL,
	[deprecated] [bit] NOT NULL,
	[dateCreated] [datetime2](7) NOT NULL,
	[dateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Calculation] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CalculationPanel]    Script Date: 6/21/2020 4:48:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CalculationPanel](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[calculationId] [int] NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[cssClass] [nvarchar](100) NOT NULL,
	[displayOrder] [int] NOT NULL,
 CONSTRAINT [PK_CalculationPanel] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Faq]    Script Date: 6/21/2020 4:48:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Faq](
	[faqId] [int] IDENTITY(1,1) NOT NULL,
	[question] [varchar](250) NULL,
	[answer] [varchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Login]    Script Date: 6/21/2020 4:48:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Login](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [nvarchar](50) NOT NULL,
	[lastName] [nvarchar](50) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[dateCreated] [datetime2](7) NOT NULL,
	[emailConfirmed] [bit] NOT NULL,
	[isAdmin] [bit] NOT NULL,
	[passwordHash] [nvarchar](200) NULL,
	[isSecurityAdmin] [bit] NOT NULL,
 CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Project]    Script Date: 6/21/2020 4:48:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](200) NOT NULL,
	[address] [nvarchar](200) NOT NULL,
	[formInputs] [nvarchar](max) NOT NULL,
	[dateCreated] [datetime2](7) NOT NULL,
	[dateModified] [datetime2](7) NOT NULL,
	[loginId] [int] NOT NULL,
	[calculationId] [int] NOT NULL,
	[description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SecurityToken]    Script Date: 6/21/2020 4:48:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SecurityToken](
	[token] [nvarchar](200) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[dateCreated] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Calculation] ON 

INSERT [dbo].[Calculation] ([id], [name], [description], [deprecated], [dateCreated], [dateModified]) VALUES (1, N'TDM', N'Traffic Data Management', 0, CAST(N'2019-07-13T15:05:29.0333333' AS DateTime2), CAST(N'2019-07-13T15:05:29.0333333' AS DateTime2))
INSERT [dbo].[Calculation] ([id], [name], [description], [deprecated], [dateCreated], [dateModified]) VALUES (2, N'Test', N'Test Calculation', 0, CAST(N'2019-07-13T15:05:29.0333333' AS DateTime2), CAST(N'2019-07-13T15:05:29.0333333' AS DateTime2))
INSERT [dbo].[Calculation] ([id], [name], [description], [deprecated], [dateCreated], [dateModified]) VALUES (3, N'Carbon Emissions', N'Carbon Emission Calculation', 0, CAST(N'2019-07-13T15:09:01.1333333' AS DateTime2), CAST(N'2019-07-13T15:13:15.9366667' AS DateTime2))
INSERT [dbo].[Calculation] ([id], [name], [description], [deprecated], [dateCreated], [dateModified]) VALUES (5, N'Test Calculation Insert', N'Traffic Data Management', 0, CAST(N'2019-07-13T16:03:43.8300000' AS DateTime2), CAST(N'2019-07-13T16:03:43.8300000' AS DateTime2))
INSERT [dbo].[Calculation] ([id], [name], [description], [deprecated], [dateCreated], [dateModified]) VALUES (6, N'test', N'deprecated rules', 0, CAST(N'2020-01-30T19:45:21.1700000' AS DateTime2), CAST(N'2020-01-30T19:45:21.1700000' AS DateTime2))
INSERT [dbo].[Calculation] ([id], [name], [description], [deprecated], [dateCreated], [dateModified]) VALUES (7, N'Test Calculation Insert', N'Traffic Data Management', 0, CAST(N'2020-03-05T16:54:09.2000000' AS DateTime2), CAST(N'2020-03-05T16:54:09.2000000' AS DateTime2))
INSERT [dbo].[Calculation] ([id], [name], [description], [deprecated], [dateCreated], [dateModified]) VALUES (8, N'Test Calculation Insert', N'Traffic Data Management', 0, CAST(N'2020-04-01T23:03:22.5166667' AS DateTime2), CAST(N'2020-04-01T23:03:22.5166667' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Calculation] OFF
SET IDENTITY_INSERT [dbo].[CalculationPanel] ON 

INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (5, 1, N'Land Uses', N'summaryPanel', 100)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (6, 1, N'Residential Inputs', N'landUse', 200)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (7, 1, N'Commercial Inputs', N'landUse', 300)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (8, 1, N'Institutional Inputs', N'landUse', 400)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (9, 1, N'Other Land Use Inputs', N'landUse', 500)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (10, 1, N'Target Points', N'strategies', 1000)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (11, 1, N'Metrics', N'metrics', 2000)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (13, 1, N'Accessibility', N'strategies', 1100)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (14, 1, N'Affordable Housing', N'strategies', 1200)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (15, 1, N'Bicycle Facilities', N'strategies', 1300)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (16, 1, N'Car Sharing', N'strategies', 1400)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (17, 1, N'Child Care', N'strategies', 1450)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (18, 1, N'High Occupancy Vehicles', N'strategies', 1500)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (19, 1, N'Information', N'strategies', 1550)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (20, 1, N'Mixed Use', N'strategies', 1600)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (21, 1, N'Mobility Hubs', N'strategies', 1650)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (22, 1, N'Parking', N'strategies', 1700)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (23, 1, N'Shared Mobility', N'strategies', 1750)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (24, 1, N'Transit Access', N'strategies', 1800)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (25, 1, N'Transportation Management Organizations', N'strategies', 1850)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (26, 1, N'User-Defined Strategy', N'strategies', 1900)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (27, 1, N'Package Bonus', N'strategies', 1050)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (28, 1, N'Retail Inputs', N'landUse', 250)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (29, 1, N'School Inputs', N'landUse', 450)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (30, 1, N'Hotel / Motel', N'landUse', 250)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (31, 1, N'Project', N'landUse', 50)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (32, 1, N'Telecommute', N'strategy', 1755)
INSERT [dbo].[CalculationPanel] ([Id], [calculationId], [name], [cssClass], [displayOrder]) VALUES (33, 1, N'Telecommute', N'strategy', 1755)
SET IDENTITY_INSERT [dbo].[CalculationPanel] OFF
SET IDENTITY_INSERT [dbo].[CalculationRule] ON 

INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (1, 1, N'SF_TOTAL', N'Total Square Footage', N'input', N'number', N'sq ft', NULL, NULL, 1001, 0, 5, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (3, 1, N'LAND_USE_RESIDENTIAL', N'Residential', N'calculation', N'boolean', N'', NULL, N'return !!<<UNITS_HABIT_LT3>> || !!<<UNITS_HABIT_3>> || !!<<UNITS_HABIT_GT3>> || !!<<UNITS_CONDO>> || !!<<PARK_CONDO>>;', 1010, 0, 5, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (4, 1, N'LAND_USE_COMMERCIAL', N'Commercial', N'calculation', N'boolean', N'', NULL, N'
		return !!<<SF_RESTAURANT>> || !!<<SF_RESTAURANT_TAKEOUT>> || !!<<SF_OFFICE>> || !!<<SF_HEALTH_CLUB>> || !!<<SF_WAREHOUSE>>;
	', 1020, 0, 5, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (5, 1, N'LAND_USE_INSTITUTIONAL', N'Institutional', N'calculation', N'boolean', N'', NULL, N'
		return !!<<BED_HOSPITAL>> || !!<<SF_INST_GOV>> || !!<<SF_INST_OTHER>> || !!<<BED_CONVALESCENT>>;
	', 1030, 0, 5, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (6, 1, N'LAND_USE_OTHER', N'Other', N'calculation', N'boolean', N'', NULL, N'
		return !!<<SEAT_AUDITORIUM>> || !!<<SF_AUDITORIUM_NO_SEATS>>;
	', 1040, 0, 5, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (7, 1, N'PARK_SPACES', N'Parking Provided', N'measure', N'number', N'spcs', NULL, NULL, 985, 0, 10, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (8, 1, N'SF_RETAIL', N'Sq Ft - Retail', N'input', N'number', N'sq ft', NULL, NULL, 3040, 0, 28, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (10, 1, N'SF_RESTAURANT', N'Sq Ft - Restaurant/Bar/General', N'input', N'number', N'sq ft', NULL, NULL, 3010, 0, 7, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (12, 1, N'TARGET_POINTS_PARK', N'Target Points', N'calculation', N'number', N'pts', NULL, N'if (!<<PARK_REQUIREMENT>> || <<PROJECT_LEVEL>> === 0) {
	return 0;
 }
 const ratio =  <<CALC_PARK_RATIO>> / 100 - 0.00001;
 const ratioPenalty = Math.min(Math.floor((Math.max(ratio,1.0) - 1.0) * 10) * 2, 10);
 return (10 + <<PROJECT_LEVEL>> * 5) + ratioPenalty;', 110, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (13, 1, N'PARK_REQUIREMENT', N'Baseline Parking', N'calculation', N'number', N'spcs', NULL, N'
//<<LAND_USE_RESIDENTIAL>>
//<<LAND_USE_HOTEL>>
//<<LAND_USE_RETAIL>>
//<<LAND_USE_COMMERCIAL>>
//<<LAND_USE_INSTITUTIONAL>>
//<<LAND_USE_OTHER>>
//<<LAND_USE_SCHOOL>>

return <<PARK_RESIDENTIAL>> 
+ <<PARK_HOTEL>>
+ <<PARK_RETAIL_SUBTOTAL>>
+ <<PARK_COMMERCIAL>>
+ <<PARK_INSTITUTIONAL>>
+ <<PARK_SCHOOL>>
+ <<PARK_OTHER>>;
', 100, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (14, 1, N'PARK_RESTAURANT', N'Parking Requirement - Restaurant', N'calculation', N'number', N'spcs', NULL, N'if (<<SF_RESTAURANT>> < 1000){
	return <<SF_RESTAURANT>>/1000 * 5;
} else {
	return <<SF_RESTAURANT>>/1000  * 10;
}', 140, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (15, 1, N'PARK_RETAIL', N'Parking Requirement - Retail', N'calculation', N'number', N'spcs', NULL, N'return <<SF_RETAIL>>/1000 * 4;', 150, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (16, 1, N'LEVEL', N'Project Level', N'measure', N'none', N'', NULL, NULL, 1007, 0, 10, 1, N'return true;', NULL, NULL, NULL, N'PROJECT_LEVEL', 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (20, 1, N'UNITS_HABIT_LT3', N'# Habitable Rooms < 3', N'input', N'number', N'dwelling units', NULL, NULL, 2200, 0, 6, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (21, 1, N'UNITS_HABIT_3', N'# Habitable Rooms = 3', N'input', N'number', N'dwelling units', NULL, NULL, 2210, 0, 6, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (22, 1, N'UNITS_HABIT_GT3', N'# Habitable Rooms > 3', N'input', N'number', N'dwelling units', NULL, NULL, 2220, 0, 6, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (44, 1, N'PARK_RESIDENTIAL', N'Parking Requirement - Residential', N'calculation', N'number', N'spcs', NULL, N'return Math.ceil(<<PARK_HABIT_LT3>> +
    <<PARK_HABIT_3>> +
    <<PARK_HABIT_GT3>> +
	<<PARK_CONDO>>);', 110, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (46, 1, N'PARK_COMMERCIAL', N'Parking Requirement - Commercial', N'calculation', N'number', N'spcs', NULL, N' return Math.ceil(<<PARK_RESTAURANT>> 
+ <<PARK_HEALTH_CLUB>>  
+ <<PARK_OFFICE>> 
+ <<PARK_RESTAURANT_TAKEOUT>>);', 120, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (48, 1, N'PARK_INSTITUTIONAL', N'Parking Requirement - Institutional', N'calculation', N'number', N'spaves', NULL, N'return Math.ceil(<<PARK_HOSPITAL>> + <<PARK_INST_OTHER>> + <<PARK_INST_GOV>> + <<PARK_CONVALESCENT>>);', 130, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (49, 1, N'PARK_SCHOOL', N'Parking Requirement - School', N'calculation', N'number', N'spcs', NULL, N'return Math.ceil( <<PARK_SCHOOL_ELEMENTARY>> + <<PARK_TRADE_SCHOOL>>);', 140, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (51, 1, N'PARK_HABIT_LT3', N'Parking Requirement - Habitable Rooms < 3', N'calculation', N'number', N'spcs', NULL, N'return <<UNITS_HABIT_LT3>>;', 510, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (52, 1, N'PARK_HABIT_3', N'Parking Requirement - Habitable Rooms = 3', N'calculation', N'number', N'spcs', NULL, N'return <<UNITS_HABIT_3>> * 1.5;', 520, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (53, 1, N'PARK_HABIT_GT3', N'Parking Requirement - Habitable Rooms > 3', N'calculation', N'number', N'spcs', NULL, N'return <<UNITS_HABIT_GT3>> * 2;', 530, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (75, 1, N'SF_HEALTH_CLUB', N'Sq Ft - Health Club', N'input', N'number', N'sq ft', NULL, N'', 3020, 0, 7, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (77, 1, N'SF_OFFICE', N'Sq Ft - Office, Business, Manufacturing, Industrial', N'input', N'number', N'sq ft', NULL, N'', 3050, 0, 7, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (78, 1, N'SF_FURNITURE', N'Sq Ft - Retail Furniture', N'input', N'number', N'sq ft', NULL, N'', 3060, 0, 28, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (79, 1, N'SF_WAREHOUSE', N'Sq Ft - Warehouse', N'input', N'number', N'sq ft', NULL, N'', 3070, 0, 7, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (80, 1, N'PARK_HEALTH_CLUB', N'Parking Requirement - Health Club', N'calculation', N'number', N'spcs', NULL, N'return <<SF_HEALTH_CLUB>>/1000 * 10;', 800, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (82, 1, N'PARK_OFFICE', N'Parking Requirement - Office, Business, Manufacturing, Industrial', N'calculation', N'number', N'spcs', NULL, N'return <<SF_OFFICE>>/1000 * 2;', 820, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (83, 1, N'PARK_FURNITURE', N'Parking Requirement - Retail Furniture', N'calculation', N'number', N'spcs', NULL, N'return <<SF_FURNITURE>>/1000 * 2;', 830, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (84, 1, N'PARK_WAREHOUSE', N'Parking Requirement - Warehouse > 10,000 sq ft', N'calculation', N'number', N'spcs', NULL, N'if (<<SF_WAREHOUSE>> >= 10000){
	return <<SF_WAREHOUSE>>/1000 * 0.2;
}
return <<SF_WAREHOUSE>>/1000 * 2.0;', 840, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (85, 1, N'BED_HOSPITAL', N'Patient Hospital Beds', N'input', N'number', N'beds', NULL, N'', 4045, 0, 8, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (86, 1, N'PARK_HOSPITAL', N'Parking Requirement - Hospital Beds', N'calculation', N'number', N'spcs', NULL, N'return <<BED_HOSPITAL>> * 2;', 860, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (87, 1, N'SF_INST_MEDICAL_SVC', N'Sq Ft - Medical Offices, Clinics, Service Facilities', N'input', N'number', N'sq ft', NULL, N'', 3070, 0, 28, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (88, 1, N'PARK_INST_MEDICAL_SVC', N'Parking Requirement - Medical Offices, Clinics, Service Facilities', N'calculation', N'number', N'spcs', NULL, N'return <<SF_INST_MEDICAL_SVC>>/1000  * 5;', 880, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (90, 1, N'SF_INST_OTHER', N'Sq Ft - Other Institutional', N'input', N'number', N'sq ft', NULL, N'', 4045, 0, 8, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (91, 1, N'PARK_INST_OTHER', N'Parking Requirement - Other Institutional', N'calculation', N'number', N'spcs', NULL, N'return <<SF_INST_OTHER>>/1000  * 2;', 910, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (92, 1, N'SF_INST_GOV', N'Sq Ft - Government Institution', N'input', N'number', N'sq ft', NULL, N'', 4040, 0, 8, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (94, 1, N'PARK_INST_GOV', N'Parking Requiremant - Government Institution', N'calculation', N'number', N'spcs', NULL, N'return <<SF_INST_GOV>>/1000  * 2;', 940, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (95, 1, N'BED_CONVALESCENT', N'Convalescent Institution Beds', N'input', N'number', N'beds', NULL, N'', 4050, 0, 8, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (96, 1, N'PARK_CONVALESCENT', N'Parking Requriement - Convalescent Institution', N'calculation', N'number', N'spcs', NULL, N'return <<BED_CONVALESCENT>> * 0.2;', 960, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (97, 1, N'SEAT_AUDITORIUM', N'# Seats - Auditorium', N'input', N'number', N'seats', NULL, N'', 5010, 0, 9, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (98, 1, N'PARK_AUDITORIUM', N'Parking Requirement - Auditorium', N'calculation', N'number', N'spcs', NULL, N'return <<SEAT_AUDITORIUM>>/5;', 980, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (99, 1, N'SF_AUDITORIUM_NO_SEATS', N'Sq Ft - Auditorium w/o Seats', N'input', N'number', N'sq ft', NULL, N'', 5020, 0, 9, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (101, 1, N'PARK_AUDITORIUM_NO_SEATS', N'Parking Requirement - Auditorium w/o Seats', N'calculation', N'number', N'spcs', NULL, N'return <<SF_AUDITORIUM_NO_SEATS>>/35;', 1010, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (102, 1, N'CLASSROOM_SCHOOL', N'Elementary School Classrooms', N'input', N'number', N'classrooms', NULL, N'', 5030, 0, 29, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (103, 1, N'PARK_SCHOOL_ELEMENTARY', N'Parking Requirement - Elementary School', N'calculation', N'number', N'spcs', NULL, N'return <<CLASSROOM_SCHOOL>>;', 1030, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (104, 1, N'SF_TRADE_SCHOOL', N'Trade School - Sq. Ft.', N'input', N'number', N'sq ft', NULL, N'', 5040, 0, 29, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (105, 1, N'PARK_TRADE_SCHOOL', N'Parking Requirement - Trade School', N'calculation', N'number', N'spcs', NULL, N'return <<SF_TRADE_SCHOOL>>/1000 * 20;', 1050, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (106, 1, N'SF_RESTAURANT_TAKEOUT', N'Sq Ft - Take-out Restaurant', N'input', N'number', N'sq ft', NULL, N'', 3035, 0, 7, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (107, 1, N'PARK_RESTAURANT_TAKEOUT', N'Parking Requirement - Take-out Restaurant', N'calculation', N'number', N'spcs', NULL, N'return <<SF_RESTAURANT_TAKEOUT>>/1000 * 4;', 815, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (110, 1, N'STRATEGY_PARKING_1', N'Pricing/Unbundling', N'measure', N'boolean', N'', NULL, N'', 1702, 0, 22, 0, N'return !!<<LAND_USE_RESIDENTIAL>>;', NULL, NULL, NULL, N'PTS_PARKING_1', 0, NULL, NULL, 0, N'Pricing of parking encourages sustainable modes of travel (non-SOV) and can be accomplished in several ways. Property managers and homeowner associations can unbundle the price of parking from rents or sale of units. In retail settings, parking fees can be charged to shoppers. Where on-street parking is highly utilized during the same time as proposed use, the existence or creation of a new residential area parking permit program will be a prerequisite for priced and unbundled parking strategies for employer and residential sites. Additional vehicle parking utilization studies may be required for this strategy.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (111, 1, N'STRATEGY_BIKE_1', N'Locate Near Bike Share', N'measure', N'boolean', N'', NULL, N'', 1310, 0, 15, 0, N'return true;', NULL, NULL, NULL, N'PTS_BIKE_1', 0, NULL, NULL, 0, N'Locate within 600 feet of an existing bike share station - Bike Share Location Map.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (112, 1, N'STRATEGY_INFO_1', N'Transit Displays', N'measure', N'boolean', N'', NULL, N'', 1551, 0, 19, 0, N'return true;', NULL, NULL, NULL, N'PTS_INFO_1', 0, NULL, NULL, 0, N'Provide real-time transit arrival displays at each major entrance of the project site. Display should capture transit options within 0.25 miles.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (113, 1, N'PTS_PARKING_1', N'Pts for Pricing/Unbundling', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_PARKING_1>> ? 8 : 0;', 1000000, 0, 22, 0, N'return true;', CAST(8.00 AS Numeric(6, 2)), CAST(8.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (114, 1, N'PTS_INFO_1', N'Pts for Transit Displays', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_INFO_1>> ? 2 : 0;', 1000000, 0, NULL, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (115, 1, N'PTS_BIKE_1', N'Points for Locate Near Bike Share', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_BIKE_1>> ? 2 : 0;', 1310, 0, 15, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (117, 1, N'PTS_EARNED', N'Earned Points', N'calculation', N'number', N'pts', NULL, N'return <<PTS_ACCESS>> 
+ <<PTS_AFFORDABLE>> 
+ <<PTS_BIKE>> 
+ <<PTS_CAR_SHARE>> 
+ <<PTS_CHILD_CARE>>
+ <<PTS_HOV>> 
+ <<PTS_INFO>> 
+ <<PTS_MIXED_USE>> 
+ <<PTS_MOBILITY_HUBS>>
+ <<PTS_PARKING>>
+ <<PTS_SHARED_MOBILITY>>
+ <<PTS_TELECOMMUTE>>
+ <<PTS_TRANSIT_ACCESS>>
+ <<PTS_TMO>>
+ <<PTS_APPLICANT>>
+ <<PTS_PKG_RESIDENTIAL>>
+ <<PTS_PKG_COMMERCIAL>>;', 120, 0, 11, 1, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (118, 1, N'PTS_DIFFERENCE', N'Points Earned - Point Target', N'calculation', N'number', N'pts', NULL, N'return <<PTS_EARNED>> - <<TARGET_POINTS_PARK>>;', 130, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (120, 1, N'STRATEGY_ACCESS_2', N'Intersection Improvements', N'measure', N'choice', N'', NULL, N'', 1120, 0, 13, 0, N'return true;', NULL, NULL, N'[{"id": "0", "name": "< 25% intersections improved"},
{"id": "25", "name": "25%+ intersections improved"},
{"id": "50", "name": "50%+ intersections improved"},
{"id": "75", "name": "75%+ intersections improved"},
{"id": "100", "name": "100% intersections improved"}]', N'PTS_ACCESS_2', 0, NULL, NULL, 0, N'Intersection improvement located near the project site. Point value is determined by the percent of intersections within project area with traffic calming improvements.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (123, 1, N'PTS_ACCESS_3', N'Network Improvement', N'measure', N'number', N'pts', NULL, N'', 1122, 0, 13, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), CAST(100.00 AS Numeric(6, 2)), NULL, N'PTS_ACCESS_3', 0, NULL, NULL, 0, N'Contribute to local infrastructure improvements near the High Injury Network (HIN) corridors or corridors identified in the Mobility Plan 2035. Point value relative to improvement and location, and determined in coordination with LADOT staff.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (124, 1, N'STRATEGY_AFFORDABLE', N'Affordable Housing Level', N'measure', N'choice', N'', NULL, N'', 1210, 0, 14, 0, N'return !!<<LAND_USE_RESIDENTIAL>>;', NULL, NULL, N'[{"id": "", "name": "< 35% of State Density Bonus"},
{"id": "1", "name": "35% of State Density Bonus"},
{"id": "2", "name": "TOC Tier 1"},
{"id": "3", "name": "TOC Tier 4"},
{"id": "4", "name": "100% Affordable"}]', N'PTS_AFFORDABLE', 0, NULL, NULL, 0, N'<div>
	<p>&lt; 35% of State Density Bonus: Projects that do not meet any of the below criteria</p>
	<hr />
	<p>35% of State Density Bonus: Projects that receive 35% of California’s Density Bonus and provide a minimum of:</p>
	<ul style="list-style-type:disc;margin-left:2em">
		<li>11% Low Income; or</li>
		<li>8% Very Low Income.</li>
	</ul>
	<hr />
	<p>TOC Tier 1: Projects that provide the following Affordable Housing percentages:</p>
	<ul style="list-style-type:disc;margin-left:2em">
		<li>20% Low Income;
		<li>11% Very Low Income; or
		<li>8% Extremely Low Income.
	</ul>
	<hr/>
	<p>TOC Tier 4: Projects that provide the following Affordable Housing percentages:</p>
	<ul style="list-style-type:disc;margin-left:2em">
		<li>25% Low Income;</li>
		<li>15% Very Low Income; or</li>
		<li>11% Extremely Low Income.</li>
	</ul>
	<hr />
	<p>100% Affordable: Projects in which 100% of the housing units (exclusive of any manager’s units) are restricted affordable.</p>
	</div>
', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (125, 1, N'STRATEGY_ACCESS_1', N'Correct Substandard Infrastructure', N'measure', N'choice', N'', NULL, N'', 1110, 0, 13, 0, N'return true;', NULL, NULL, N'[{"id": "0", "name": "< 25% streets improved"},
{"id": "25", "name": "25%+ streets improved"},
{"id": "50", "name": "50%+ streets improved"},
{"id": "75", "name": "75%+ streets improved"},
{"id": "100", "name": "100% streets improved"}]', N'PTS_ACCESS_1', 0, NULL, NULL, 0, N'Correct an existing substandard sidewalk width or curb dimension, provide one mid-block improvement near the project site, or an intersection improvement to one adjacent street segment, such as a single curb extension. Point value is determined by the percent of streets within project area with traffic calming improvements.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (137, 1, N'PTS_ACCESS', N'Pts for Accessibility Strategies', N'calculation', N'number', N'pts', NULL, N'return <<PTS_ACCESS_1>> + <<PTS_ACCESS_2>> + <<PTS_ACCESS_3>>;', 1190, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (138, 1, N'PTS_AFFORDABLE', N'Pts for Affordability', N'calculation', N'number', N'pts', NULL, N'	switch (<<STRATEGY_AFFORDABLE>>){
		case 1:
			return 2;
		case 2:
			return 4;
		case 3:
			return 6;
		case 4:
			return 10;
		default:
			return 0;
	};', 1210, 0, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(10.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (139, 1, N'STRATEGY_BIKE_2', N'Bike Share Station', N'measure', N'boolean', N'', NULL, N'', 1312, 0, 15, 0, N'return true;', NULL, NULL, NULL, N'PTS_BIKE_2', 0, NULL, NULL, 0, N'Install a publicly accessible bike share station. Must meet LADOT Bike Share Siting Guidelines and be pre-approved by qualified LADOT bike share program staff.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (140, 1, N'PTS_BIKE_2', N'Pts for Bike Share Station', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_BIKE_2>> ? 5 : 0;', 1312, 0, 11, 0, N'return true;', CAST(5.00 AS Numeric(6, 2)), CAST(5.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (141, 1, N'STRATEGY_BIKE_3', N'Bike Share Memberships', N'measure', N'boolean', N'', NULL, N'', 1314, 0, 15, 0, N'return true;', NULL, NULL, NULL, N'PTS_BIKE_3', 0, NULL, NULL, 0, N'Offer bike share membership passes to employees and/or residents (applicable for locations within 0.25 miles from an existing or planned bike share station - Bike Share Location Map).', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (142, 1, N'PTS_BIKE_3', N'Pts for Bike Share Memberships', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_BIKE_3>> ? 5 : 0;', 1314, 0, 11, 0, N'return true;', CAST(5.00 AS Numeric(6, 2)), CAST(5.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (143, 1, N'STRATEGY_BIKE_4', N'Bike Parking', N'measure', N'boolean', N'', NULL, N'', 1316, 0, 15, 0, N'return true;', NULL, NULL, NULL, N'PTS_BIKE_4', 0, NULL, NULL, 0, N'Install and maintain on-site bicycle parking at or above ratios as determined in Sections 12.03, 12.21, and 12.21.1 of the L.A.M.C. ', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (144, 1, N'PTS_BIKE_4', N'Pts for Bicycle Parking', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_BIKE_4>> ? 2 : 0;', 1316, 0, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (145, 1, N'STRATEGY_BIKE_5', N'Changing / Shower / Locker Facilities', N'measure', N'boolean', N'', NULL, N'', 1318, 0, 15, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_BIKE_5', 0, NULL, NULL, 0, N'Provide clothes changing and/or shower facilities for employees or students at or above ratios as determined in Sections 91.6307 of the L.A.M.C.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (146, 1, N'PTS_BIKE_5', N'Pts for Changing / Shower / Locker Facilities', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_BIKE_5>> ? 2 : 0;', 1318, 0, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (147, 1, N'PTS_BIKE_BONUS', N'Bicycle Facilities Bonus', N'calculation', N'number', N'pts', NULL, N'	// <<STRATEGY_BIKE_BONUS>>
	return Math.max(0, Math.sign(<<PTS_BIKE_1>>) 
		+ Math.sign(<<PTS_BIKE_2>>) 
		+ Math.sign(<<PTS_BIKE_3>>) 
		+ Math.sign(<<PTS_BIKE_4>>) 
		+ Math.sign(<<PTS_BIKE_5>>)
		-1);', 1320, 0, 11, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), CAST(4.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (148, 1, N'PTS_BIKE', N'Pts for Bicycle Facilities', N'calculation', N'number', N'pts', NULL, N'return <<PTS_BIKE_1>> + <<PTS_BIKE_2>> + <<PTS_BIKE_3>> + <<PTS_BIKE_4>> + <<PTS_BIKE_5>> + <<PTS_BIKE_BONUS>>;', 1000000, 0, NULL, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (149, 1, N'STRATEGY_CAR_SHARE_1', N'Car Share Parking', N'measure', N'boolean', N'', NULL, N'', 1410, 0, 16, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_RESIDENTIAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_CAR_SHARE_1', 0, NULL, NULL, 0, N'Provide at least one car share space per 25 employees/units, with a minimum of two car-share parking spaces. Requires cooperation with a car share service provider.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (150, 1, N'PTS_CAR_SHARE_1', N'Pts for Car Share Parking', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_CAR_SHARE_1>> ? 3 : 0;', 1410, 0, 11, 0, N'return true;', CAST(3.00 AS Numeric(6, 2)), CAST(3.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (151, 1, N'STRATEGY_CAR_SHARE_2', N'Car Share Memberships', N'measure', N'boolean', N'', NULL, N'', 1412, 0, 16, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_RESIDENTIAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_CAR_SHARE_2', 0, NULL, NULL, 0, N'Offer an annual car share membership (through a third party car share service operator other than Blue LA) for at least 50% of residents or employees. ', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (152, 1, N'PTS_CAR_SHARE_2', N'Pts for Car Share Memberships', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_CAR_SHARE_2>> ? 3 : 0;', 1412, 0, 11, 0, N'return true;', CAST(3.00 AS Numeric(6, 2)), CAST(3.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (153, 1, N'STRATEGY_CAR_SHARE_3', N'Blue LA Car Share Memberships', N'measure', N'boolean', N'', NULL, N'', 1414, 0, 16, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_RESIDENTIAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_CAR_SHARE_3', 0, NULL, NULL, 0, N'Offer annual Blue LA car share membership (not including trip fees) for at least 50% of residents or employees (applicable for locations within 0.25 miles of an existing or planned Blue LA station).', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (154, 1, N'PTS_CAR_SHARE_3', N'Pts for Blue LA Car Share Memberships', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_CAR_SHARE_3>> ? 4 : 0;', 1414, 0, 11, 0, N'return true;', CAST(4.00 AS Numeric(6, 2)), CAST(4.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (155, 1, N'STRATEGY_CAR_SHARE_4', N'Private Car Share Fleet', N'measure', N'boolean', N'', NULL, N'', 1416, 0, 16, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_RESIDENTIAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_CAR_SHARE_4', 0, NULL, NULL, 0, N'Provide a car share fleet to all building occupants', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (156, 1, N'PTS_CAR_SHARE_4', N'Pts for Private Car Share Fleet', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_CAR_SHARE_4>> ? 5 : 0;', 1416, 0, 11, 0, N'return true;', CAST(5.00 AS Numeric(6, 2)), CAST(5.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (157, 1, N'PTS_CAR_SHARE_BONUS', N'Pts for Car Share Bonus', N'calculation', N'number', N'pts', NULL, N'
// <<STRATEGY_CAR_SHARE_BONUS>>
 return  (Math.sign(<<PTS_CAR_SHARE_1>>) 
	+ Math.sign(<<PTS_CAR_SHARE_2>>) 
	+ Math.sign(<<PTS_CAR_SHARE_3>>) 
	+ Math.sign(<<PTS_CAR_SHARE_4>>) > 1) ? 2 : 0;', 1417, 0, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (158, 1, N'STRATEGY_CAR_SHARE_ELECTRIC', N'Electric Vehicle Bonus', N'measure', N'boolean', N'', NULL, N'', 1418, 0, 16, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_RESIDENTIAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_CAR_SHARE_ELECTRIC', 0, NULL, NULL, 0, N'Provide 100% electric vehicle fleet or membership to electric vehicle car share program.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (159, 1, N'PTS_CAR_SHARE_ELECTRIC', N'Pts for Electric Vehicle Bonus', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_CAR_SHARE_ELECTRIC>> ? 1 : 0;', 1418, 0, 11, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(1.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (160, 1, N'PTS_CAR_SHARE', N'Pts for Car Share', N'calculation', N'number', N'pts', NULL, N'return <<PTS_CAR_SHARE_1>> + 
	<<PTS_CAR_SHARE_2>> + 
	<<PTS_CAR_SHARE_3>> + 
	<<PTS_CAR_SHARE_4>> + 
	<<PTS_CAR_SHARE_BONUS>> + 
	<<PTS_CAR_SHARE_ELECTRIC>> ;', 1420, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (161, 1, N'STRATEGY_CHILD_CARE', N'Child Care', N'measure', N'boolean', N'', NULL, N'', 1450, 0, 17, 0, N'return true;', NULL, NULL, NULL, N'PTS_CHILD_CARE', 0, NULL, NULL, 0, N'On-site child care provided by a licensed childcare provider.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (162, 1, N'PTS_CHILD_CARE', N'Pts for Child Care', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_CHILD_CARE>> ? 2 : 0;', 1450, 0, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (163, 1, N'STRATEGY_HOV_1', N'Ride Matching', N'measure', N'boolean', N'', NULL, N'', 1502, 0, 18, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_HOV_1', 0, NULL, NULL, 0, N'Implement, promote, and maintain a ride-matching service that is open to all employees', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (164, 1, N'PTS_HOV_1', N'Pts for Ride Matching', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_HOV_1>> ? 2 : 0;', 1502, 0, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (165, 1, N'STRATEGY_HOV_2', N'Guaranteed Return Trip', N'measure', N'boolean', N'', NULL, N'', 1504, 0, 18, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_HOV_2', 0, NULL, NULL, 0, N'Provide at least six taxi or Transporation Network Company (TNC) fares for at least 50% of employees who travel by non-drive alone trips.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (166, 1, N'PTS_HOV_2', N'Pts for Guaranteed Return Trip', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_HOV_2>> ? 2 : 0;', 1504, 0, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (167, 1, N'STRATEGY_HOV_3', N'HOV Parking', N'measure', N'boolean', N'', NULL, N'', 1506, 0, 18, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_HOV_3', 0, NULL, NULL, 0, N'Provide free, reserved HOV parking spaces (carpool, vanpool, etc.). Should be closer to the building entrance than other non-HOV parking spaces (excluding ADA stalls).', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (168, 1, N'PTS_HOV_3', N'Pts for HOV Parking', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_HOV_3>> ? 2 : 0;', 1506, 0, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (169, 1, N'STRATEGY_HOV_4', N'HOV Program', N'measure', N'boolean', N'', NULL, N'', 1508, 0, 18, 0, N'return !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_RESIDENTIAL>> || !!<<LAND_USE_OTHER>> || !!<<LAND_USE_SCHOOL>>;', NULL, NULL, NULL, N'PTS_HOV_4', 0, NULL, NULL, 0, N'HOV Program where school administrators, employers, residential property managers, or homeowners associations coordinate a HOV program to match individuals, groups, parents and/or families available to share rides on a regular basis ', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (170, 1, N'PTS_HOV_4', N'Pts for HOV Program', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_HOV_4>> ? 2 : 0;', 1508, 0, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (171, 1, N'STRATEGY_HOV_5', N'Required Trip-Reduction Program', N'measure', N'boolean', N'', NULL, N'', 1510, 0, 18, 0, N'return !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_HOV_5', 0, NULL, NULL, 0, N'Deploying an employee-focused travel behavior change program that targets individual attitudes, goals, and travel behaviors, educating participants on the impacts of travel choices and opportunities to alter their habits. The program typically includes a coordinated ride-sharing, vanpool and/or carpooling program, and requires a program coordinator, and includes program monitoring, reporting and evaluation', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (172, 1, N'PTS_HOV_5', N'Pts for Required Trip-Reduction Program', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_HOV_5>> ? 6 : 0;', 1510, 0, 11, 0, N'return true;', CAST(6.00 AS Numeric(6, 2)), CAST(6.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
GO
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (173, 1, N'PTS_HOV', N'Pts for HOV', N'calculation', N'number', N'pts', NULL, N'return <<PTS_HOV_1>> +
	<<PTS_HOV_2>> +
	<<PTS_HOV_3>> +
	<<PTS_HOV_4>> +
	<<PTS_HOV_5>>;', 1512, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (174, 1, N'STRATEGY_INFO_2', N'Wayfinding', N'measure', N'boolean', N'', NULL, N'', 1552, 0, 19, 0, N'return true;', NULL, NULL, NULL, N'PTS_INFO_2', 0, NULL, NULL, 0, N'Post wayfinding signage near major entrances directing building users to rail stations, bus stops, bicycle facilities, bicycle parking, car sharing kiosks, and other sustainable (non-SOV) travel options, provided inside and/or outside of the building.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (175, 1, N'PTS_INFO_2', N'Pts for Wayfinding', N'calculation', N'number', N'pts', NULL, N'
	return <<STRATEGY_INFO_2>> ? 1 : 0;', 1552, 0, 11, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(1.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (176, 1, N'STRATEGY_INFO_3', N'Encouragement Program', N'measure', N'choice', N'', NULL, N'', 1554, 0, 19, 0, N'return true;', CAST(4.00 AS Numeric(6, 2)), CAST(6.00 AS Numeric(6, 2)), N'[{"id": "0", "name": "none"},
{"id": "1", "name": "Education, Marketing & Outreach"},
{"id": "2", "name": "Voluntary Behavior Change Program"}]', N'PTS_INFO_3', 0, NULL, NULL, 0, N'<div>
	<ul style="list-style-type:disc;">
	<li> Education, Marketing and Outreach: Offer new employees and residents a packet of materials and/or provide personal consultation detailing sustainable (non-SOV) travel options. These materials or consultation must be available on an ongoing basis and/or on permanent online channels. Packet must include the distribution of a one Metro TAP card pre-loaded with a trip, to each employee or residential unit.</li>
	<li> Travel Behavior Change Program: A multi-faceted program typically involving two-way communication campaigns and travel feedback that actively engages participants to target individual attitudes, goals, and travel behaviors to alter their travel choices and habits. Program must include the distribution of a one Metro TAP card pre-loaded with a trip, to each employee or residential unit. Selection of this strategy requires a coordinator to manage the program. May not be combined with Information 3.</li>
	</ul>
	</div>
>', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (177, 1, N'PTS_INFO_3', N'Pts for Education, Marketing, OUtreach', N'calculation', N'number', N'pts', NULL, N' 
switch (<<STRATEGY_INFO_3>>){
	case 1:
		return 4;
	case 2:
		return 6;
	default:
		return 0;
};', 1554, 0, 11, 0, N'return true;', CAST(4.00 AS Numeric(6, 2)), CAST(6.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (180, 1, N'PTS_INFO', N'Pts for Information', N'calculation', N'number', N'pts', NULL, N'
return <<PTS_INFO_1>> +
	<<PTS_INFO_2>> +
	<<PTS_INFO_3>> +
	<<PTS_INFO_5>>;', 1558, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (181, 1, N'STRATEGY_INFO_BONUS', N'Distribution of Metro TAP Card', N'measure', N'boolean', N'', NULL, N'', 1560, 1, 19, 0, N'return true;', NULL, NULL, NULL, N'PTS_INFO_BONUS', 0, NULL, NULL, 0, N'Implementation of two or more Information strategies for bonus points.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (182, 1, N'PTS_INFO_BONUS', N'Pts for Distibution of Metro TAP Card', N'calculation', N'number', N'pts', NULL, N'	if (<<PTS_INFO_1>> +
	<<PTS_INFO_2>> +
	<<PTS_INFO_3>> +
	<<PTS_INFO_4>> > 0){
		return <<STRATEGY_INFO_BONUS>> ? 2 : 0;
	}
	return 0;', 1560, 1, 11, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (183, 1, N'STRATEGY_MIXED_USE', N'Mixed Use', N'measure', N'boolean', N'', NULL, N'', 1602, 0, 20, 0, N'return true;', NULL, NULL, NULL, N'PTS_MIXED_USE', 0, NULL, NULL, 0, N'Projects that are zoned for mixed use and provide no more than 85% of floor area for a single land use', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (184, 1, N'PTS_MIXED_USE', N'Pts for Mixed User', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_MIXED_USE>> ? 5 : 0;', 1602, 0, 11, 0, N'return true;', CAST(5.00 AS Numeric(6, 2)), CAST(5.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (185, 1, N'STRATEGY_MOBILITY_HUBS', N'Mobility Hubs', N'measure', N'boolean', N'', NULL, N'', 1652, 0, 21, 0, N'return true;', NULL, NULL, NULL, N'PTS_MOBILITY_HUBS', 0, NULL, NULL, 0, N'Provide a Mobility Hub. Key components include colocation of services, real-time information, and a uniform payment platform across modes. A Mobility Hub must connect at a minimum of three different transportation modes/services. Applicants must work with LADOT to design their Mobility Hub.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (186, 1, N'PTS_MOBILITY_HUBS', N'Pts for Mobility Hubs', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_MOBILITY_HUBS>> ? 3 : 0;', 1652, 0, 11, 0, N'return true;', CAST(3.00 AS Numeric(6, 2)), CAST(3.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (187, 1, N'STRATEGY_PARKING_2', N'Cash-Out', N'measure', N'boolean', N'', NULL, N'', 1702, 0, 22, 0, N'return !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>>  || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_PARKING_2', 0, NULL, NULL, 0, N'Implement a “cash out” program, where employees who do not use a parking space are paid the value of the space instead.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (188, 1, N'PTS_PARKING_2', N'Pts for Cash-Out', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_PARKING_2>> ? 8 : 0;', 1702, 0, 11, 0, N'return true;', CAST(8.00 AS Numeric(6, 2)), CAST(8.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (189, 1, N'STRATEGY_PARKING_3', N'Shared Parking', N'measure', N'choice', N'', NULL, N'', 1706, 0, 22, 0, N'return true;', NULL, NULL, N'[{"id": "0", "name": "< 25% spaces shared"},
{"id": "25", "name": "25%+ spaces shared"},
{"id": "50", "name": "50%+ spaces shared"},
{"id": "75", "name": "75%+ spaces shared"},
{"id": "100", "name": "100% spaces shared"}]', N'PTS_PARKING_3', 0, NULL, NULL, 0, N'Share parking among different land uses or tenants within a mixed use development. Covenant or MOU agreement among tenants required to receive points.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (190, 1, N'PTS_PARKING_3', N'Pts for Shared Parking', N'calculation', N'number', N'pts', NULL, N'switch (<<STRATEGY_PARKING_3>>){
	case 25:
		return 1;
	case 50:
		return 2;
	case 75:
		return 3;
	case 100:
		return 4;
	default:
		return 0;
};', 1706, 0, 11, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(4.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (191, 1, N'STRATEGY_PARKING_4', N'Public Parking', N'measure', N'boolean', N'', NULL, N'', 1708, 0, 22, 0, N'return true;', NULL, NULL, NULL, N'PTS_PARKING_4', 0, NULL, NULL, 0, N'Provide public access to the property''s parking. Must be coupled with on-demand parking availability publicized through public signage and/or approved mobile application. This strategy is especially encouraged for properties that provide parking supply at rates above L.A.M.C. or a Specific Plan requirements. To earn points for this strategy, a project must provide the number of parking spaces available for public use. That supply must be, at a minimum, 5% of the total parking supply.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (192, 1, N'PTS_PARKING_4', N'Pts for Public Parking', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_PARKING_4>> ? 4 : 0;', 1708, 0, 11, 0, N'return true;', CAST(4.00 AS Numeric(6, 2)), CAST(4.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (193, 1, N'STRATEGY_PARKING_5', N'Reduced Parking Supply', N'measure', N'boolean', N'', NULL, N'', 1710, 0, 22, 0, N'return true;', NULL, NULL, NULL, N'PTS_PARKING_5', 0, NULL, NULL, 0, N'Reduction in parking supply below the minimum parking required by code, utilizing parking reduction mechanisms, including, but not limited to, TOC, Density Bonus, Bicycle Parking ordinance, or locating in Enterprise Zone or Specific Plan area. Points also awarded for projects seeking variances to reduce parking requirements allocated by the L.A.M.C.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (194, 1, N'PTS_PARKING_5', N'Pts for Reduced Parking Supply', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_PARKING_5>> ? 4 : 0;', 1710, 0, 11, 0, N'return true;', CAST(4.00 AS Numeric(6, 2)), CAST(4.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (195, 1, N'PTS_PARKING', N'Pts for Parking', N'calculation', N'number', N'pts', NULL, N'return <<PTS_PARKING_1>> +
	<<PTS_PARKING_2>> +
	<<PTS_PARKING_3>> +
	<<PTS_PARKING_4>> +
	<<PTS_PARKING_5>> ;', 1712, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (196, 1, N'STRATEGY_SHARED_MOBILITY_1', N'Existing Provider', N'measure', N'boolean', N'', NULL, N'', 1752, 0, 23, 0, N'return true;', NULL, NULL, NULL, N'PTS_SHARED_MOBILITY_1', 0, NULL, NULL, 0, N'Partner with a shared mobility company to provide discounted membership fees for building occupants and users. Make shared fleet devices accessible for easy identification and use.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (197, 1, N'PTS_SHARED_MOBILITY_1', N'Pts for Existing Provider', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_SHARED_MOBILITY_1>> ? 1 : 0;', 1752, 0, 11, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(1.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (198, 1, N'STRATEGY_SHARED_MOBILITY_2', N'Local Shared Fleet', N'measure', N'boolean', N'', NULL, N'', 1754, 0, 23, 0, N'return true;', NULL, NULL, NULL, N'PTS_SHARED_MOBILITY_2', 0, NULL, NULL, 0, N'Purchase and operate a shared fleet that is available on-site for use or rent.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (199, 1, N'PTS_SHARED_MOBILITY_2', N'Pts for Local Shared Fleet', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_SHARED_MOBILITY_2>> ? 1 : 0;', 1754, 0, 11, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(1.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (200, 1, N'PTS_SHARED_MOBILITY', N'Pts for Shared Mobility', N'calculation', N'number', N'pts', NULL, N'return <<PTS_SHARED_MOBILITY_1>> + <<PTS_SHARED_MOBILITY_2>>;', 1756, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (201, 1, N'STRATEGY_TRANSIT_ACCESS_1', N'Neighborhood Connection to Destinations', N'measure', N'boolean', N'', NULL, N'', 1802, 0, 24, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>>  || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_TRANSIT_ACCESS_1', 0, NULL, NULL, 0, N'Operate a neighborhood-serving transit service (shuttle/microtransit/etc.) along a route that 
	connects within the neighborhood but does not connect to high-quality transit stations. (May not be combined with Neighborhood Connection to Transit Station).', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (202, 1, N'PTS_TRANSIT_ACCESS_1', N'Pts for Neighborhood Connection to Destinations', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_TRANSIT_ACCESS_1>> ? 4 : 0;', 1802, 0, 11, 0, N'return true;', CAST(4.00 AS Numeric(6, 2)), CAST(4.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (203, 1, N'STRATEGY_TRANSIT_ACCESS_2', N'Neighborhood Connection to Transit Station', N'measure', N'boolean', N'', NULL, N'', 1804, 0, 24, 0, N'return true;', NULL, NULL, NULL, N'PTS_TRANSIT_ACCESS_2', 0, NULL, NULL, 0, N'Operate a transit service (shuttle/microtransit/etc.) along a route that connects 
	to high-quality transit station(s). (May not be combined with "Neighborhood Connection to Destinations).', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (204, 1, N'PTS_TRANSIT_ACCESS_2', N'Pts for Neighborhood Connection to Transit Station', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_TRANSIT_ACCESS_2>> ? 5 : 0;', 1804, 0, 11, 0, N'return true;', CAST(5.00 AS Numeric(6, 2)), CAST(5.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (205, 1, N'STRATEGY_TRANSIT_ACCESS_3', N'Transit Passes', N'measure', N'choice', N'', NULL, N'', 1806, 0, 24, 0, N'return true;', NULL, NULL, N'[{"id": "0", "name": "< 25% of Monthly Fare"},
{"id": "25", "name": "25%+ of Monthly Fare"},
{"id": "50", "name": "50%+ of Monthly Fare"},
{"id": "75", "name": "75%+ of Monthly Fare"},
{"id": "100", "name": "100% of Monthly Fare"}]', N'PTS_TRANSIT_ACCESS_3', 0, NULL, NULL, 0, N'Provide employees/units transit subsidies. Points awarded vary based on the amount of transit subsidy provided per employee or residential unit.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (206, 1, N'PTS_TRANSIT_ACCESS_3', N'Pts for Transit Passes', N'calculation', N'number', N'pts', NULL, N'switch (<<STRATEGY_TRANSIT_ACCESS_3>>){
	case 25:
		return 7;
	case 50:
		return 10;
	case 75:
		return 12;
	case 100:
		return 14;
	default:
		return 0;
};', 1806, 0, 11, 0, N'return true;', CAST(7.00 AS Numeric(6, 2)), CAST(14.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (207, 1, N'STRATEGY_TRANSIT_ACCESS_4', N'Improved Transit Service', N'measure', N'boolean', N'', NULL, N'', 1810, 0, 24, 0, N'return true;', NULL, NULL, NULL, N'PTS_TRANSIT_ACCESS_4', 0, NULL, NULL, 0, N'Provide funding to a local transit provider for improvements that improve service quality (reduce headways, etc.) at transit stops within ¼ mile radius of the project site. Funds could also contribute to a neighborhood circulator, if applicable (TAG Guidelines may apply).', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (208, 1, N'PTS_TRANSIT_ACCESS_4', N'Pts for Improved Transit Service', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_TRANSIT_ACCESS_4>> ? 3 : 0;', 1810, 0, 11, 0, N'return true;', CAST(3.00 AS Numeric(6, 2)), CAST(3.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (209, 1, N'PTS_TRANSIT_ACCESS', N'Pts for Transit Access', N'calculation', N'number', N'pts', NULL, N'return <<PTS_TRANSIT_ACCESS_1>> +
	<<PTS_TRANSIT_ACCESS_2>> +
	<<PTS_TRANSIT_ACCESS_3>> +
	<<PTS_TRANSIT_ACCESS_4>>;', 1812, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (210, 1, N'STRATEGY_TMO_1', N'Join TMO', N'measure', N'boolean', N'', NULL, N'', 1852, 0, 25, 0, N'return true;', NULL, NULL, NULL, N'PTS_TMO_1', 0, NULL, NULL, 0, N'Join an existing TMO', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (211, 1, N'PTS_TMO_1', N'Pts for Join TMO', N'calculation', N'calculation', N'pts', NULL, N'return <<STRATEGY_TMO_1>> ? 1 : 0;', 1852, 0, 11, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(1.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (212, 1, N'STRATEGY_TMO_2', N'Start a New TMO', N'measure', N'boolean', N'', NULL, N'', 1854, 0, 25, 0, N'return true;', NULL, NULL, NULL, N'PTS_TMO_2', 0, NULL, NULL, 0, N'Create a new TMO in an area where there is not already an existing TMO service. ', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (213, 1, N'PTS_TMO_2', N'Pts for Start TMO', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_TMO_2>> ? 3 : 0;', 1854, 0, 11, 0, N'return true;', CAST(3.00 AS Numeric(6, 2)), CAST(3.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (214, 1, N'PTS_TMO', N'Pts for TMO', N'calculation', N'number', N'pts', NULL, N'return <<PTS_TMO_1>> + <<PTS_TMO_2>>;', 1856, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (215, 1, N'STRATEGY_APPLICANT', N'User-Defined Strategy', N'measure', N'number', N'pts', NULL, N'', 1902, 0, 26, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), CAST(100.00 AS Numeric(6, 2)), NULL, N'STRATEGY_APPLICANT', 0, NULL, NULL, 1, N'Additional approved custom strategy.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (216, 1, N'PTS_APPLICANT', N'Pts for Applicant-Defined Strategy', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_APPLICANT>>;', 1902, 0, 11, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(100.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (218, 1, N'UNITS_GUEST', N'# Guest Rooms', N'input', N'number', N'rooms', NULL, NULL, 2500, 0, 30, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (219, 1, N'PARK_GUEST', N'Parking Requirement - Guest Rooms < 30', N'calculation', N'number', N'spcs', NULL, N'if (<<UNITS_GUEST>> <= 30){
return <<UNITS_GUEST>>;
} else if (<<UNITS_GUEST>> <= 60 ) {
return 30 + (<<UNITS_GUEST>> - 30) * 0.5;
} else {
return 45 + (<<UNITS_GUEST>> - 60) * 0.3;
}', 540, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (220, 1, N'STRATEGY_INFO_5', N'School Safety Campaign', N'measure', N'boolean', N'', NULL, N'', 1558, 0, 19, 0, N'return true;', NULL, NULL, NULL, N'PTS_INFO_5', 0, NULL, NULL, 0, N'The yearlong Safety Campaign targets parents and students to heighten their awareness of the importance of traffic safety.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (221, 1, N'PTS_INFO_5', N'Pts for School Safety Campaign', N'calculation', N'number', N'pts', NULL, N'return <<STRATEGY_INFO_5>> ? 4 : 0;', 1560, 0, 11, 0, N'return true;', CAST(4.00 AS Numeric(6, 2)), CAST(4.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (222, 1, N'STRATEGY_BIKE_BONUS', N'Bike Bonus', N'measure', N'none', N'', NULL, N'', 1324, 0, 15, 0, N'return true;', NULL, NULL, NULL, N'PTS_BIKE_BONUS', 0, NULL, NULL, 0, N'Implementation of two or more Bicycle Facilities strategies for bonus points. ', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (223, 1, N'PROJECT_LEVEL', N'Project Level', N'calculation', N'number', N'', NULL, N'// <<LEVEL>>
// <<LAND_USE_RESIDENTIAL>>

if(!!<<LAND_USE_MAJOR>>){
	return 3;
}

let hotelLevel = 0;
const hotelUnits = <<UNITS_GUEST>> || 0;
if(hotelUnits >= 150 ){
	hotelLevel = 3;
} else if (hotelUnits >= 50) {
	hotelLevel = 2;
} else if (hotelUnits >= 16) {
	hotelLevel = 1;
}

let residentialLevel = 0;
const residentialUnits = (<<UNITS_HABIT_LT3>> || 0) 
	+ (<<UNITS_HABIT_3>> || 0) 
	+ (<<UNITS_HABIT_GT3>> || 0) 
	+ (<<UNITS_CONDO>> || 0);

if(<<STRATEGY_AFFORDABLE>> === 4){
	return residentialUnits < 16 ? 0 : 1;
}

if (residentialUnits >= 250){
	residentialLevel = 3;
} else if ( residentialUnits >=  50 ){
	residentialLevel = 2;
} else if (residentialUnits >= 16 ) {
	residentialLevel = 1;
}

let auditoriumLevel = 0;
const auditoriumSeats = (<<SEAT_AUDITORIUM>> || 0) ;

if (auditoriumSeats >= 650){
	auditoriumLevel = 3;
} else if ( auditoriumSeats >=  350 ){
	auditoriumLevel = 2;
} else if (auditoriumSeats >= 150) {
	auditoriumLevel = 1;
}

let auditoriumSFLevel = 0;
const auditoriumSF = (<<SF_AUDITORIUM_NO_SEATS>> || 0) ;

if (auditoriumSF >= 250000){
	auditoriumSFLevel = 3;
} else if ( auditoriumSF >=  50000 ){
	auditoriumSFLevel = 2;
} else if (auditoriumSF >= 25000) {
	auditoriumSFLevel = 1;
}

let retailLevel = 0;
const retailSF = (<<SF_RETAIL>> || 0)  + (<<SF_FURNITURE>> || 0)  + (<<SF_INST_MEDICAL_SVC>> || 0);
if (retailSF >= 250000){
	retailLevel = 3;
} else if ( retailSF >=  100000){
	retailLevel = 2;
} else if ( retailSF >=  50000){
	retailLevel = 1;
} 

let warehouseLevel = 0;
const warehouseSF = (<<SF_WAREHOUSE>> || 0) ;
if (warehouseSF >= 250000){
	warehouseLevel = 3;
} 

let commercialLevel = 0;
const commercialSF = (<<SF_RESTAURANT>> || 0) 
	+ (<<SF_HEALTH_CLUB>> || 0)
	+ (<<SF_OFFICE>> || 0)
	+ (<<SF_RESTAURANT_TAKEOUT>> || 0);

if (commercialSF >= 100000){
	commercialLevel = 3;
} else if ( commercialSF >=  50000 ){
	commercialLevel = 2;
} else if (commercialSF >= 25000) {
	commercialLevel = 1;
}

let institutionalSFLevel = 0;
const institutionalSF = 
	(<<SF_INST_OTHER>> || 0)
	+ (<<SF_INST_GOV>> || 0);
if (institutionalSF >= 100000){
	institutionalSFLevel = 3;
} else if ( institutionalSF >=  50000 ){
	institutionalSFLevel = 2;
} else if (institutionalSF >= 25000) {
	institutionalSFLevel = 1;
}

let schoolLevel = 0;
const schoolStudents = (<<STUDENTS_ELEMENTARY>> || 0)
	+ (<<STUDENTS_TRADE_SCHOOL>> || 0);
if (schoolStudents >= 500){
	schoolLevel = 3;
} else if ( schoolStudents >=  249 ){
	schoolLevel = 2;
} else if (schoolStudents >= 100) {
	schoolLevel = 1;
}

return Math.max(residentialLevel, hotelLevel, auditoriumLevel, 
	auditoriumSFLevel, retailLevel, warehouseLevel, 
	commercialLevel, institutionalSFLevel, schoolLevel);
', 160, 0, 12, 1, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (225, 1, N'PTS_ACCESS_1', N'Pts for Correct Substandard Infrastructure', N'calculation', N'number', N'pts', NULL, N'switch (<<STRATEGY_ACCESS_1>>){
	case 25:
		return 2;
	case 50:
		return 3;
	case 75:
		return 4;
	case 100:
		return 5;
	default:
		return 0;
};', 100, 0, 13, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(5.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (226, 1, N'PTS_ACCESS_2', N'Pts for Intersection Improvement', N'calculation', N'number', N'pts', NULL, N'switch (<<STRATEGY_ACCESS_2>>){
	case 25:
		return 2;
	case 50:
		return 3;
	case 75:
		return 4;
	case 100:
		return 5;
	default:
		return 0;
};', 100, 0, 13, 0, N'return true;', CAST(2.00 AS Numeric(6, 2)), CAST(5.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (227, 1, N'PKG_RESIDENTIAL', N'TDM Residential  Package', N'measure', N'none', N'', NULL, N'', 1904, 0, 27, 0, N'return !!<<LAND_USE_RESIDENTIAL>>;', NULL, NULL, NULL, N'PTS_PKG_RESIDENTIAL', 0, NULL, NULL, 0, N'Bonus points for combination of Residential Strategies', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (228, 1, N'PTS_PKG_RESIDENTIAL', N'TDM Package Bonus', N'calculation', N'none', N'pts', NULL, N'// <<PKG_RESIDENTIAL>>
return (!!<<STRATEGY_BIKE_4>> && !!<<STRATEGY_INFO_3>> && !!<<STRATEGY_PARKING_1>>) ? 1 : 0;', 1005, 0, 12, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(1.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (231, 1, N'STRATEGY_CAR_SHARE_BONUS', N'Car Share Bonus', N'measure', N'none', N'', NULL, N'', 1420, 0, 16, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_RESIDENTIAL>> || !!<<LAND_USE_HOTEL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_CAR_SHARE_BONUS', 0, NULL, NULL, 0, N'Implementation of two or more Car Share strategies for bonus points. ', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (232, 1, N'LAND_USE_SCHOOL', N'School', N'calculation', N'boolean', N'', NULL, N'
		return !!<<CLASSROOM_SCHOOL>> || !!<<SF_TRADE_SCHOOL>>;
	', 1035, 0, 5, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (233, 1, N'LAND_USE_RETAIL', N'Retail', N'calculation', N'boolean', N'', NULL, N'
		return !!<<SF_RETAIL>> || !!<<SF_FURNITURE>> || !!<<SF_INST_MEDICAL_SVC>>;
	', 1015, 0, 5, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (234, 1, N'INPUT_PARK_REQUIREMENT', N'Citywide Parking Baseline', N'measure', N'none', N'', NULL, N'', 995, 0, 10, 1, N'return true;', NULL, NULL, NULL, N'PARK_REQUIREMENT', 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (235, 1, N'PARK_RATIO', N'Parking Provided / Baseline', N'measure', N'none', N'', NULL, N'', 1005, 0, 10, 1, N'return true;', NULL, NULL, NULL, N'CALC_PARK_RATIO', 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (236, 1, N'CALC_PARK_RATIO', N'Parking Provided / Baseline', N'calculation', N'number', N'%', NULL, N' return <<PARK_REQUIREMENT>> ?  <<PARK_SPACES>> / <<PARK_REQUIREMENT>> * 100 : 0;', 1000000, 0, 12, 1, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (237, 1, N'INPUT_TARGET_POINTS_PARK', N'Target TDM Points', N'measure', N'none', N'', NULL, N'', 1010, 0, 10, 1, N'return true;', NULL, NULL, NULL, N'TARGET_POINTS_PARK', 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (238, 1, N'PARK_CONDO', N'Condo - Enter Parking Space Req''d', N'input', N'number', N'spcs', NULL, N'', 3000, 0, 6, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (239, 1, N'LAND_USE_HOTEL', N'Hotel', N'calculation', N'boolean', N'', NULL, N'
		return !!<<UNITS_GUEST>>;
	', 1015, 0, 5, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (240, 1, N'PROJECT_NAME', N'Project Name', N'input', N'string', N'', NULL, N'', 50, 0, 31, 1, N'return true;', NULL, NULL, NULL, NULL, 1, NULL, 200, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (241, 1, N'PROJECT_ADDRESS', N'Address', N'input', N'string', N'', NULL, N'', 53, 0, 31, 1, N'return true;', NULL, NULL, NULL, NULL, 1, NULL, 200, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (242, 1, N'PROJECT_DESCRIPTION', N'Project Description', N'input', N'textarea', N'', NULL, N'', 65, 0, 31, 1, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (243, 1, N'PARK_OTHER', N'Parking Requirement - Other', N'calculation', N'number', N'spcs', NULL, N'return Math.ceil(<<PARK_AUDITORIUM>> + <<PARK_AUDITORIUM_NO_SEATS>>);', 142, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (244, 1, N'PARK_HOTEL', N'Parking Requirement - Hotel', N'calculation', N'number', N'spcs', NULL, N'return Math.ceil(<<PARK_GUEST>>);', 112, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (245, 1, N'PARK_RETAIL_SUBTOTAL', N'Parking Requirement - Retail', N'calculation', N'number', N'spcs', NULL, N'return Math.ceil(<<PARK_RETAIL>> + <<PARK_FURNITURE>> + <<PARK_WAREHOUSE>> + <<PARK_INST_MEDICAL_SVC>>);', 118, 0, 11, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (246, 1, N'LAND_USE_MAJOR', N'Major Development Project - CUP', N'input', N'boolean', N'', NULL, N'', 1045, 1, 5, 1, N'return false;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (247, 1, N'UNITS_CONDO', N'Condo - Units', N'input', N'number', N'dwelling units', NULL, N'', 2990, 0, 6, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (248, 1, N'STUDENTS_ELEMENTARY', N'Elementary School - Students', N'input', N'number', N'students', NULL, N'', 5031, 0, 29, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (249, 1, N'STUDENTS_TRADE_SCHOOL', N'Trade School - Students', N'input', N'number', N'students', NULL, N'', 5041, 0, 29, 0, N'return true;', CAST(0.00 AS Numeric(6, 2)), NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (252, 1, N'PKG_COMMERCIAL', N'TDM Employment Package', N'measure', N'none', N'', NULL, N'', 1906, 0, 27, 0, N'return !!<<LAND_USE_RETAIL>> || !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>>  || !!<<LAND_USE_SCHOOL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_PKG_COMMERCIAL', 0, NULL, NULL, 0, N'Bonus points for combination of Employment Strategies', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (253, 1, N'PTS_PKG_COMMERCIAL', N'TDM Employment Package Bonus', N'calculation', N'number', N'pts', NULL, N'// <<PKG_COMMERCIAL>>
return (!!<<STRATEGY_BIKE_4>> && !!<<STRATEGY_INFO_3>> && !!<<STRATEGY_PARKING_2>>) ? 1 : 0;', 1006, 0, 12, 0, N'return true;', CAST(1.00 AS Numeric(6, 2)), CAST(1.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (254, 1, N'BUILDING_PERMIT', N'Building Permit # (Required to Submit)', N'input', N'string', N'', NULL, N'', 56, 0, 31, 1, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, 400, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (255, 1, N'CASE_NO_LADOT', N'LADOT Case #', N'input', N'string', N'', NULL, N'', 58, 0, 31, 1, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, 400, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (256, 1, N'VERSION_NO', N'Version #', N'input', N'string', N'', NULL, N'', 55, 0, 31, 1, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, 400, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (257, 1, N'CASE_NO_PLANNING', N'City Planning Case #', N'input', N'string', N'', NULL, N'', 59, 0, 31, 1, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, 400, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (261, 1, N'PTS_TELECOMMUTE', N'Pts for Telecommute', N'calculation', N'number', N'pts', NULL, N'return !!<<STRATEGY_TELECOMMUTE>> ? 2 : 0;', 1756, 0, 11, 0, N'return !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_OTHER>>;', CAST(2.00 AS Numeric(6, 2)), CAST(2.00 AS Numeric(6, 2)), NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (262, 1, N'STRATEGY_TELECOMMUTE', N'Telecommute', N'measure', N'boolean', N'', NULL, NULL, 1756, 0, 32, 0, N'return !!<<LAND_USE_COMMERCIAL>> || !!<<LAND_USE_INSTITUTIONAL>> || !!<<LAND_USE_OTHER>>;', NULL, NULL, NULL, N'PTS_TELECOMMUTE', 0, NULL, NULL, 0, N'Offer employees telecommute option for at least 1 day a week, which would allow employees to work from home rather than commute to the office.', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (265, 2, N'SF_TOTAL', N'Total Square Footage', N'input', N'number', N'sq ft', N'""', NULL, 1000, 0, NULL, 0, N'return true;', NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, N'', NULL, NULL)
INSERT [dbo].[CalculationRule] ([id], [calculationId], [code], [name], [category], [dataType], [units], [value], [functionBody], [displayOrder], [inactive], [calculationPanelId], [used], [displayFunctionBody], [minValue], [maxValue], [choices], [calcCode], [required], [minStringLength], [maxStringLength], [displayComment], [description], [mask], [link]) VALUES (271, 1, N'APN', N'AIN', N'input', N'mask', N'', NULL, NULL, 55, 0, 31, 1, N'return true;', NULL, NULL, NULL, NULL, 1, NULL, NULL, 0, N'', N'9999-999-999', N'http://maps.assessor.lacounty.gov/')
SET IDENTITY_INSERT [dbo].[CalculationRule] OFF
SET IDENTITY_INSERT [dbo].[Faq] ON 

INSERT [dbo].[Faq] ([faqId], [question], [answer]) VALUES (1, N'how do I make faqs? ', N'You become an admin')
INSERT [dbo].[Faq] ([faqId], [question], [answer]) VALUES (22, N'', N'')
INSERT [dbo].[Faq] ([faqId], [question], [answer]) VALUES (23, N'What is TDM?', N'Transportation Demand Management (TDM) is a set of practices intended to reduce the number of single-occupant drives in a community, in attempt to reduce traffic congestion and pollution, and promote health and well-being in a community.')
INSERT [dbo].[Faq] ([faqId], [question], [answer]) VALUES (24, N'What is TDM?', N'I don''t know')
INSERT [dbo].[Faq] ([faqId], [question], [answer]) VALUES (25, N'Test', N'Test')
INSERT [dbo].[Faq] ([faqId], [question], [answer]) VALUES (27, N'What is a project level?', N'It''s bases on Formulas and its related to how large your project is')
INSERT [dbo].[Faq] ([faqId], [question], [answer]) VALUES (28, N'', N'whatever question you want')
SET IDENTITY_INSERT [dbo].[Faq] OFF
SET IDENTITY_INSERT [dbo].[Login] ON 

INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (5, N'Jim', N'Darragh', N'jim@entrotech.net', CAST(N'2019-12-23T01:03:31.7600000' AS DateTime2), 0, 0, N'$2b$10$h/vbxgUR6i/9M.cVZLSeUui9LmW1JRU4Q86Eq6hWv/3d.hxhnDuEi', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (6, N'Joe', N'Darragh', N'joedarragh@dispostable.com', CAST(N'2019-12-23T01:08:11.3300000' AS DateTime2), 1, 0, N'$2b$10$EZJAfY9NGriUiIeZBRbr/usEJcBGlES7ZKov.bKWn6R9b1cj0N60O', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (7, N'Susan', N'Darragh', N'suedarragh@dispostable.com', CAST(N'2019-12-23T01:23:50.5700000' AS DateTime2), 1, 0, N'$2b$10$7OoilRP6wkE/jIvc5.QmXuEz26kuMf7YU3rkL90KEna8DYL.UpmZ2', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (8, N'Marty', N'Mazur', N'mazur@dispostable.com', CAST(N'2019-12-23T01:48:34.0500000' AS DateTime2), 1, 0, N'$2b$10$ik3S4uqoHL9.1KQaIjasEer1QzwgXazQUPfR58pON/zWQg9d6LwAC', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (11, N'Sue', N'Darragh', N'sdarragh@dispostable.com', CAST(N'2019-12-23T20:02:34.0400000' AS DateTime2), 1, 0, N'$2b$10$SMlWWgrYDxo6j.MjhQi0kOCGtipDO0.iHTKBmgy3diWViFCTP9Nkq', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (12, N'Andrew', N'Darragh', N'adarragh@dispostable.com', CAST(N'2019-12-24T00:14:36.1733333' AS DateTime2), 1, 0, N'$2b$10$Rq8yyWudPdFQCuveIk6/t.9Qwig.oCGuzqxckCGck1lDKp0WfLQHi', 1)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (13, N'Chuck', N'Darragh', N'chuckdarragh@dispostable.com', CAST(N'2019-12-24T00:18:31.7966667' AS DateTime2), 1, 0, N'$2b$10$UouYejqwGKIrzSDuxATX8.4sFL4imsWia99jPCkpaFu3szvIWHHNC', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (14, N'Catherine', N'Darragh', N'catherinedarragh@dispostable.com', CAST(N'2019-12-24T00:29:18.7833333' AS DateTime2), 1, 0, N'$2b$10$mZI3xXTH4SMOMAVcr/6oauGuEKoSoFsPdsXyJRbVA.TIKrakI6G/G', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (15, N'Hank', N'Smith', N'hsmith@dispostable.com', CAST(N'2019-12-24T01:56:29.9066667' AS DateTime2), 0, 0, N'$2b$10$gSnudpt6rapNxCsqs3lcqO6fgb2P9gm1nR8wn3cAFHB8Jc8tNJbKC', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (16, N'Bill', N'Jones', N'bjones@dispostable.com', CAST(N'2019-12-24T02:00:35.4200000' AS DateTime2), 1, 0, N'$2b$10$iaXORI7EdcpYRtZe3PeHy.VWrCK0EBwn8DNGUxOgPZ6DcNZirVme2', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (17, N'George', N'Washington', N'gw@dispostable.com', CAST(N'2019-12-24T02:06:47.3733333' AS DateTime2), 1, 0, N'$2b$10$KWvBJqEOQPB/du5b0mUoMuRRnfz5xxUaqBcpVQWzQLGm0eMCZQ4uO', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (18, N'Edna', N'Darragh', N'edna@dispostable.com', CAST(N'2019-12-24T07:06:18.9900000' AS DateTime2), 1, 0, N'$2b$10$tKEbWrCyPDJPXpP3dD1tauSHXutSmReb88iGi/NR0PVCIQS8rQtUy', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (19, N'Claire', N'Nguyen', N'claire1@tdm.calc', CAST(N'2019-12-29T02:33:31.8566667' AS DateTime2), 0, 0, N'$2b$10$T.Ju0HFR81e3UAsuVo8OheoqMp68btttTmcXnGGJX7yL2LdbdKESu', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (26, N'Bonnie', N'Wolfe', N'bonnie@hackforla.org', CAST(N'2020-01-01T06:42:10.4966667' AS DateTime2), 1, 1, N'$2b$10$d2oquskaTHWcIt73JVNfKebEPoV5EEmOB.L5OCByr9KzG/x6TO47O', 1)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (27, N'Bonnie', N'Wolfe', N'experimentsinhonesty@gmail.com', CAST(N'2020-01-02T21:52:13.0966667' AS DateTime2), 1, 1, N'$2b$10$bkSnUlGfO9Njp4PGhGkIFOkdGBOaZh89lOGNoAzzDYY3i3.Uw3jc2', 1)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (28, N'Bonnie', N'Wolfe', N'test@hackforla.org', CAST(N'2020-01-06T00:23:42.9100000' AS DateTime2), 0, 0, N'$2b$10$kxFnM5b3QWePt5nCvoz.c.IGpZR.WqFDU7M5sS3G4rBm35LgCA7yS', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (29, N'bonnie2', N'wolfe', N'bonnie2@hackforla.org', CAST(N'2020-01-06T18:57:58.0466667' AS DateTime2), 0, 0, N'$2b$10$YB0SJQjWNrdNlgNZYvqHnORpZVBjWIl.HsEmdxtfMCHYAzwbJCkIq', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (31, N'Claire', N'Nguyen', N'claire@tdm.com', CAST(N'2020-01-07T05:44:18.9433333' AS DateTime2), 0, 0, N'$2b$10$pGl1xTr2K5Sw.KYHRJLqjus1BS1Vh.ra.YzraTbhrUZiQtTKV4i56', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (32, N'Claire', N'Nguyen', N'claire@tdm.calc', CAST(N'2020-01-07T05:44:35.8833333' AS DateTime2), 0, 0, N'$2b$10$Jb90n3JqsgwhSMiq5HUd6uewWZxJaPhGvlqugMA.v76RlfeB0BEka', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (33, N'Test', N'Person', N'bradley@dispostable.com', CAST(N'2020-01-08T03:50:09.8633333' AS DateTime2), 1, 0, N'$2b$10$BSeEdQrcIz/cLTGaKsFcHO9Qr0FZHIBQpiDzb3HhLU4oXoTSNvFT6', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (35, N'John', N'Darragh', N'darragh@entrotech.net', CAST(N'2020-01-10T18:07:14.8300000' AS DateTime2), 1, 1, N'$2b$10$NEFCzmVFBHUdTzZCpyqtluWOGXRJnb6qqrfCAib8ehpXvMMKAsLte', 1)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (37, N'LA', N'DOT', N'ladot@dispostable.com', CAST(N'2020-01-10T22:13:30.3066667' AS DateTime2), 1, 1, N'$2b$10$Wis7xCVUKsRIxSds2WuTFOW2Kd7EoJ7EkZapuyTRA05Oe4n4uW0jq', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (40, N'Mindy', N'Morgan', N'multimindia@gmail.com', CAST(N'2020-01-14T05:08:04.1533333' AS DateTime2), 1, 0, N'$2b$10$yAkBzn/unJFRTPTA7lCpyuBBaxvd05cawLVrS5L4.9.9K3F4kW1X6', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (41, N'Bob', N'Saga', N'bob-saga@dispostable.com', CAST(N'2020-01-14T05:59:37.5066667' AS DateTime2), 1, 0, N'$2b$10$Zn6JdZwDAsxExeXdBuZ4cu1E9fDQMHwtzjPABHgHmTstwOocoSvoq', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (42, N'Keara', N'Darragh', N'keara@dispostable.com', CAST(N'2020-01-15T02:44:26.1300000' AS DateTime2), 0, 0, N'$2b$10$CtiU53d9r4YBBrEbHjtAA.fDNpfdtumL8n4dsZoa4gzC.MMTO0hMi', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (43, N'Fang', N'Liu', N'fang@dispostable.com', CAST(N'2020-01-16T00:31:49.6000000' AS DateTime2), 1, 0, N'$2b$10$hStiQR.tIJAA4YRZdsYuJeZWoJdwHstlBR0LzA2383Rsza/qVxs4a', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (44, N'Bonnie', N'Wolfe', N'testtdm@hackforla.org', CAST(N'2020-01-18T18:25:23.4600000' AS DateTime2), 0, 0, N'$2b$10$DQRb.m21IDcqlzu1UmBcIO49fuXTgE2lreV0nx4h6cXkcWkOvWlSu', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (46, N'Rance', N'Smith', N'rvsmith1@student.fullsail.edu', CAST(N'2020-01-20T20:05:46.9733333' AS DateTime2), 0, 0, N'$2b$10$hRDlurWceHEYTyb1XEyGFubiP0KbyaDqTgpeFyoVjYUiOIZO1Pjra', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (47, N'Mister', N'Us', N'mr.urbanswag@gmail.com', CAST(N'2020-01-20T20:29:34.1900000' AS DateTime2), 0, 0, N'$2b$10$uNgFWDlOdDvoE8xN8n9m2OsRwvtAmcu6s9vZKvRxfkOrt07BcJXP2', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (51, N'Kevin', N'Howley', N'Kphowley@gmail.com', CAST(N'2020-01-30T01:04:03.4133333' AS DateTime2), 1, 1, N'$2b$10$yB3HykuSJvG63Qz.8fZCYeGcEdvsz8ROCOXhtFBZKfr3wwuZ/ZFAm', 1)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (52, N'Rosemary', N'McCarron', N'rosemary.mccarron@lacity.org', CAST(N'2020-01-30T01:36:10.3933333' AS DateTime2), 1, 0, N'$2b$10$969k2lX3.eWh1MBpljOytebRJ3k3L.p1rHDDb17IxDL.siP9djx4G', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (55, N'Joel', N'Hendrerson', N'joel@joelparkerhenderson.com', CAST(N'2020-01-30T18:09:24.6300000' AS DateTime2), 1, 0, N'$2b$10$rDOWGcuzyGf034V.vQ9AIOLfvC1ryBhJDk.0ecai0.Xg5QM1jKXRm', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (57, N'Louis', N'Mazza', N'louismazza@gmail.com', CAST(N'2020-02-26T03:56:42.3600000' AS DateTime2), 0, 0, N'$2b$10$HUNAKAAd/dh1lx3DpDIHlOSefSadPtrxbV52hqwG48Cari8jceh56', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (59, N'Louis', N'Mazza', N'mazzawestfall815@gmail.com', CAST(N'2020-02-26T04:10:20.0300000' AS DateTime2), 1, 0, N'$2b$10$6r5S/T1ehdL5NlS31BDoj.q9DkveNH.e9NrIPxuBcrDXm6zFNe5OG', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (61, N'Test', N'Regular User', N'test_regular_user@dispostable.com', CAST(N'2020-03-31T04:33:18.5300000' AS DateTime2), 1, 0, N'$2b$10$auGeVwCoIIo6FqHJrU0TiuXvuYVAWocQ6Fnksykr79Kmd5NUBwosu', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (62, N'Test', N'Admin', N'test_admin@dispostable.com', CAST(N'2020-03-31T04:35:38.9366667' AS DateTime2), 1, 1, N'$2b$10$f84kxlPwuEDmtBo7piDNuesqXoLQf561jIiM/cH/S9eLztKbXG8yq', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (63, N'Test', N'Security Admin', N'test_security_admin@dispostable.com', CAST(N'2020-03-31T04:37:42.1700000' AS DateTime2), 1, 1, N'$2b$10$iR48RoZ.W.Ri089sxf2m.uer7WMeLb6t2wms6FjKdolrFAprgrQ/u', 1)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (66, N'Chuck', N'Darragh', N'charlesdarragh@dispostable.com', CAST(N'2020-04-01T22:20:37.2900000' AS DateTime2), 0, 0, N'$2b$10$FFB5a1JlnZN5pIPeCLdHGuFi.27BqOg4PqKQ1gmvxY9VV0d9j7CK6', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (67, N'David', N'Fridley', N'ddfridley@yahoo.com', CAST(N'2020-05-28T02:29:28.1933333' AS DateTime2), 1, 0, N'$2b$10$X.zkYBKf1uU4RZh6Qj31MuHcfQVacFckwMs1rbIEcC1ZPbapMkMdO', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (68, N'K', N'H', N'kh@dispostable.com', CAST(N'2020-06-04T01:51:14.1533333' AS DateTime2), 1, 0, N'$2b$10$Fdafj23Ond1AkHD/3Q91ceNtRNejT2ZpwqM0s5yUySvV7jzCLdfea', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (69, N'Alex', N'Test', N'alexchoiweb@gmail.com', CAST(N'2020-06-05T21:48:32.3400000' AS DateTime2), 1, 0, N'$2b$10$QCC7o6c1JPpitXVEl8ii1ukJrnXQ.5vGneF8AvmWsxxkSoHHu1Ifm', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (70, N'test', N'test', N'testtdm@dispostable.com', CAST(N'2020-06-07T19:32:04.5133333' AS DateTime2), 1, 0, N'$2b$10$rSEc8YgjdJaPkrL/wFacbOd4VuHFLB8GK6QQG2aP6oh1QYVEX533W', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (71, N'tdm', N'tdm', N'tdm-test-2@dispostable.com', CAST(N'2020-06-07T19:46:24.9166667' AS DateTime2), 1, 0, N'$2b$10$JKit.iBVbVwAwolEGWRvlO0Iap5sHqWxX1I8KKx6K3LZCp0HsiIhm', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (73, N'tdm', N'tdm', N'tdm-test-3@dispostable.com', CAST(N'2020-06-07T19:52:26.6333333' AS DateTime2), 1, 0, N'$2b$10$B/xAjSyK.hYQhZGijAivJu.gdIoPa2SbVkivhl0/3Fsh9VKpTh5WS', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (74, N'tdm', N'tdm', N'tdm-test-4@dispostable.com', CAST(N'2020-06-07T22:10:52.4766667' AS DateTime2), 1, 0, N'$2b$10$5H/CovWaLOpOwpwmphAKXuDC52jVtgE/z6xpj5k1PcfhiZ3ECQmiu', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (75, N'test', N'test', N'tdm-test-5@dispostable.com', CAST(N'2020-06-09T18:40:43.3600000' AS DateTime2), 1, 0, N'$2b$10$VDMZixmHwgaL6aQ63yKBZ.UwsFjWUvqxFliVGx4Jn94HZAAUbHJoO', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (77, N'test', N'test', N'tdm-test-6@dispostable.com', CAST(N'2020-06-10T23:41:18.8166667' AS DateTime2), 1, 0, N'$2b$10$po48wm96qyfC17U0klDgw.5/vg3ejfNcvtoHNQQzErrXZmWvmTe8a', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (78, N'test', N'test', N'tdm-test-7@dispostable.com', CAST(N'2020-06-15T17:56:09.9000000' AS DateTime2), 1, 0, N'$2b$10$OY9Hw8g0//7g1ds2i6UdBeztEjR1ojQ9ZewYp4KxaBgUvjpPdFPrS', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (79, N'test', N'test', N'tdm-test-8@dispostable.com', CAST(N'2020-06-16T16:23:11.6900000' AS DateTime2), 1, 0, N'$2b$10$smBX.fEGeBev29kxqsxKMOaKzWbvsXjD6WgXY.YrKQeUpxmMW7j/O', 0)
INSERT [dbo].[Login] ([id], [firstName], [lastName], [email], [dateCreated], [emailConfirmed], [isAdmin], [passwordHash], [isSecurityAdmin]) VALUES (80, N'test', N'test', N'tdm-test-9@dispostable.com', CAST(N'2020-06-18T00:00:09.6833333' AS DateTime2), 1, 0, N'$2b$10$cTujCqAhL7FpC.zgk.oE4.zztH34OFcFSe04KwPYgWDCXP4KXufNa', 0)
SET IDENTITY_INSERT [dbo].[Login] OFF
SET IDENTITY_INSERT [dbo].[Project] ON 

INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (2, N'Barrington Condos', N'825 S. Barrington Av', N'{"UNITS_CONDO":"46","PARK_CONDO":"92","STRATEGY_AFFORDABLE":"1","PROJECT_NAME":"Barrington Condos","PROJECT_ADDRESS":"825 S. Barrington Av","LAND_USE_RESIDENTIAL":true,"PARK_SPACES":"88","STRATEGY_ACCESS_1":"0","STRATEGY_BIKE_4":true,"STRATEGY_PARKING_1":true,"STRATEGY_PARKING_5":true}', CAST(N'2020-01-09T00:43:00.9200000' AS DateTime2), CAST(N'2020-02-18T17:14:35.3533333' AS DateTime2), 37, 1, N'')
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (3, N'Fountain Apartments', N'5460 W. Fountain Av.', N'{"UNITS_HABIT_LT3":"37","UNITS_HABIT_3":"36","UNITS_HABIT_GT3":"2","STRATEGY_AFFORDABLE":"1","STRATEGY_CAR_SHARE_1":true,"PROJECT_NAME":"Fountain Apartments","PROJECT_ADDRESS":"5460 W. Fountain Av.","PROJECT_DESCRIPTION":"A 75-unit six-story apartment building","LAND_USE_RESIDENTIAL":true,"PARK_SPACES":"108","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_PARKING_1":true,"STRATEGY_INFO_2":true,"STRATEGY_SHARED_MOBILITY_1":true,"BUILDING_PERMIT":"101"}', CAST(N'2020-01-10T23:43:17.2600000' AS DateTime2), CAST(N'2020-02-18T17:39:16.1000000' AS DateTime2), 37, 1, N'A 75-unit six-story apartment building')
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (4, N'Victory Hotel', N'12425 Victory Bl.', N'{"UNITS_GUEST":"80","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_1":true,"STRATEGY_HOV_3":true,"PROJECT_NAME":"Victory Hotel","PROJECT_ADDRESS":"12425 Victory Bl.","PROJECT_DESCRIPTION":"80-room four-story hotel. Spreadsheet has parkingcalc error.","LAND_USE_HOTEL":true,"PARK_SPACES":"76","STRATEGY_ACCESS_1":"25","STRATEGY_BIKE_4":true,"STRATEGY_INFO_1":true,"STRATEGY_INFO_2":true,"STRATEGY_INFO_3":true,"STRATEGY_TRANSIT_ACCESS_3":"25"}', CAST(N'2020-01-10T23:46:56.2300000' AS DateTime2), CAST(N'2020-02-18T17:39:37.2400000' AS DateTime2), 37, 1, N'80-room four-story hotel. Spreadsheet has parkingcalc error.')
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (5, N'Beatrice Building', N'12575 Beatrice St.', N'{"SF_RETAIL":"900","SF_RESTAURANT":"2500","SF_OFFICE":"283981","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_3":true,"STRATEGY_PARKING_2":true,"PROJECT_NAME":"Beatrice Building","PROJECT_ADDRESS":"12575 Beatrice St.","PROJECT_DESCRIPTION":"Sq Ft differs between spreadsheet and PDF supplied","LAND_USE_RETAIL":true,"LAND_USE_COMMERCIAL":true,"PARK_SPACES":"845","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_INFO_1":true,"STRATEGY_INFO_2":true,"STRATEGY_TRANSIT_ACCESS_3":"25"}', CAST(N'2020-01-11T00:44:08.2433333' AS DateTime2), CAST(N'2020-02-18T17:38:36.7433333' AS DateTime2), 37, 1, N'Sq Ft differs between spreadsheet and PDF supplied')
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (6, N'Clarendon Apartments', N'22055 W. Clarendon St.', N'{"UNITS_HABIT_LT3":"51","UNITS_HABIT_3":"134","UNITS_HABIT_GT3":"150","STRATEGY_AFFORDABLE":"1","STRATEGY_CAR_SHARE_1":true,"STRATEGY_CAR_SHARE_2":true,"PROJECT_NAME":"Clarendon Apartments","PROJECT_ADDRESS":"22055 W. Clarendon St.","PROJECT_DESCRIPTION":"335-unit five-story apartment building","LAND_USE_RESIDENTIAL":true,"PARK_SPACES":"564","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_PARKING_1":true,"APN":"123333"}', CAST(N'2020-01-11T00:47:15.5466667' AS DateTime2), CAST(N'2020-06-04T02:49:48.7800000' AS DateTime2), 37, 1, N'335-unit five-story apartment building')
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (7, N'Jewish Family Service - Social Services Center', N'320 N. Fairfax', N'{"SF_OFFICE":"28341","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_3":true,"PROJECT_NAME":"Jewish Family Service - Social Services Center","PROJECT_ADDRESS":"320 N. Fairfax","PROJECT_DESCRIPTION":"New 28,023 sf three-story building","LAND_USE_COMMERCIAL":true,"PARK_SPACES":"63","STRATEGY_BIKE_4":true,"STRATEGY_INFO_1":true,"STRATEGY_INFO_2":true,"STRATEGY_INFO_3":true}', CAST(N'2020-01-11T00:51:02.5666667' AS DateTime2), CAST(N'2020-02-18T17:40:25.4133333' AS DateTime2), 37, 1, N'New 28,023 sf three-story building')
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (9, N'Marina Towers Village', N'13428 Maxella Ave', N'{"UNITS_HABIT_LT3":"140","UNITS_HABIT_3":null,"UNITS_HABIT_GT3":null,"UNITS_SR_INDEPENDENT":null,"UNITS_SR_ASSISTED":null,"UNITS_SR_ASSISTED_GUEST":null,"UNITS_SKILLED_NURSING":null,"UNITS_DEMENTIA":null,"UNITS_CONDO":null,"PARK_CONDO":null,"UNITS_GUEST":null,"SF_RETAIL":null,"SF_FURNITURE":null,"SF_RESTAURANT":"30000","SF_HEALTH_CLUB":null,"SF_RESTAURANT_TAKEOUT":null,"SF_OFFICE":"100000","SF_WAREHOUSE":null,"SF_INST_MEDICAL_SVC":null,"SF_INST_OTHER":null,"SF_INST_GOV":null,"BED_HOSPITAL":null,"BED_CONVALESCENT":null,"CLASSROOM_SCHOOL":null,"STUDENTS_ELEMENTARY":null,"SF_TRADE_SCHOOL":null,"STUDENTS_TRADE_SCHOOL":null,"SEAT_AUDITORIUM":null,"SF_AUDITORIUM_NO_SEATS":null,"PKG_RESIDENTIAL":null,"PKG_COMMERCIAL":null,"STRATEGY_AFFORDABLE":null,"STRATEGY_BIKE_5":null,"STRATEGY_CAR_SHARE_1":null,"STRATEGY_CAR_SHARE_2":null,"STRATEGY_CAR_SHARE_3":null,"STRATEGY_CAR_SHARE_4":null,"STRATEGY_CAR_SHARE_ELECTRIC":null,"STRATEGY_CAR_SHARE_BONUS":null,"STRATEGY_HOV_1":null,"STRATEGY_HOV_2":null,"STRATEGY_HOV_3":null,"STRATEGY_HOV_4":null,"STRATEGY_HOV_5":null,"STRATEGY_PARKING_2":true,"STRATEGY_TRANSIT_ACCESS_1":null,"PROJECT_NAME":"Marina Towers Village","PROJECT_ADDRESS":"13428 Maxella Ave","PROJECT_DESCRIPTION":"A mixed use development scheduled for 2025","BUILDING_PERMIT":"No Building permit # yet","CASE_NO":"No Case # yet","LAND_USE_RESIDENTIAL":true,"LAND_USE_COMMERCIAL":true,"PARK_SPACES":"1000","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_PARKING_1":true,"STRATEGY_BIKE_2":true,"STRATEGY_BIKE_3":true,"VERSION_NO":"1"}', CAST(N'2020-01-11T18:20:04.5766667' AS DateTime2), CAST(N'2020-01-16T00:22:09.9766667' AS DateTime2), 27, 1, N'A mixed use development scheduled for 2025')
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (50, N'City Hall Redevelopment', N'200 N. Spring St.', N'{"UNITS_HABIT_LT3":null,"UNITS_HABIT_3":"150","UNITS_HABIT_GT3":null,"UNITS_SR_INDEPENDENT":null,"UNITS_SR_ASSISTED":null,"UNITS_SR_ASSISTED_GUEST":null,"UNITS_SKILLED_NURSING":null,"UNITS_DEMENTIA":null,"UNITS_CONDO":null,"PARK_CONDO":null,"UNITS_GUEST":null,"SF_RETAIL":null,"SF_FURNITURE":null,"SF_RESTAURANT":"250","SF_HEALTH_CLUB":null,"SF_RESTAURANT_TAKEOUT":null,"SF_OFFICE":null,"SF_WAREHOUSE":null,"SF_INST_MEDICAL_SVC":null,"SF_INST_OTHER":null,"SF_INST_GOV":null,"BED_HOSPITAL":null,"BED_CONVALESCENT":null,"CLASSROOM_SCHOOL":null,"STUDENTS_ELEMENTARY":null,"SF_TRADE_SCHOOL":null,"STUDENTS_TRADE_SCHOOL":null,"SEAT_AUDITORIUM":null,"SF_AUDITORIUM_NO_SEATS":null,"PKG_RESIDENTIAL":null,"PKG_COMMERCIAL":null,"STRATEGY_AFFORDABLE":null,"STRATEGY_BIKE_5":null,"STRATEGY_CAR_SHARE_1":null,"STRATEGY_CAR_SHARE_2":null,"STRATEGY_CAR_SHARE_3":null,"STRATEGY_CAR_SHARE_4":null,"STRATEGY_CAR_SHARE_ELECTRIC":null,"STRATEGY_CAR_SHARE_BONUS":null,"STRATEGY_HOV_1":null,"STRATEGY_HOV_2":null,"STRATEGY_HOV_3":null,"STRATEGY_HOV_4":null,"STRATEGY_HOV_5":null,"STRATEGY_PARKING_2":null,"STRATEGY_TRANSIT_ACCESS_1":null,"PROJECT_ADDRESS":"200 N. Spring St.","PROJECT_NAME":"City Hall Redevelopment","LAND_USE_RESIDENTIAL":true,"LAND_USE_COMMERCIAL":true,"PARK_SPACES":"250","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_PARKING_1":true,"STRATEGY_INFO_4":false,"STRATEGY_INFO_2":true,"STRATEGY_BIKE_1":true,"STRATEGY_BIKE_2":true}', CAST(N'2020-01-30T20:35:14.3100000' AS DateTime2), CAST(N'2020-01-30T20:35:14.3100000' AS DateTime2), 52, 1, NULL)
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (51, N'Test - Complex Project', N'5500 Torrance Bl, Suite 500', N'{"UNITS_HABIT_LT3":"14","UNITS_HABIT_3":"23","UNITS_HABIT_GT3":"47","UNITS_CONDO":"50","PARK_CONDO":"75","UNITS_GUEST":"50","SF_RETAIL":"3467","SF_RESTAURANT":"2879","SF_RESTAURANT_TAKEOUT":"1265","SF_OFFICE":"13456","SF_INST_MEDICAL_SVC":"4360","SF_INST_OTHER":"3280","SF_INST_GOV":"1453","BED_HOSPITAL":"45","STRATEGY_PARKING_2":true,"PROJECT_NAME":"Test - Complex Project","PROJECT_ADDRESS":"5500 Torrance Bl, Suite 500","LAND_USE_RESIDENTIAL":true,"LAND_USE_HOTEL":true,"LAND_USE_RETAIL":true,"LAND_USE_COMMERCIAL":true,"LAND_USE_INSTITUTIONAL":true,"LAND_USE_MAJOR":true,"PARK_SPACES":"543","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_PARKING_1":true,"STRATEGY_ACCESS_1":"25","STRATEGY_ACCESS_2":"25","CASE_NO_LADOT":"101010","CASE_NO_PLANNING":"202020"}', CAST(N'2020-02-18T23:02:42.9133333' AS DateTime2), CAST(N'2020-03-11T17:06:41.5400000' AS DateTime2), 37, 1, NULL)
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (52, N'Andy''s House Test', N'134 5th St., Del Mar, CA', N'{"UNITS_HABIT_GT3":"12","PROJECT_NAME":"Andy''s House","PROJECT_ADDRESS":"134 5th St., Del Mar, CA","LAND_USE_RESIDENTIAL":true,"PARK_SPACES":"32","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_PARKING_1":true,"STRATEGY_BIKE_1":true}', CAST(N'2020-03-07T17:07:26.7966667' AS DateTime2), CAST(N'2020-03-11T01:31:49.4400000' AS DateTime2), 12, 1, NULL)
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (53, N'test', N'test', N'{"PROJECT_NAME":"test","PROJECT_ADDRESS":"test","LAND_USE_RESIDENTIAL":true,"PARK_SPACES":"50","STRATEGY_BIKE_1":true,"STRATEGY_BIKE_2":true,"STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":true,"STRATEGY_PARKING_1":true,"STRATEGY_TMO_1":true}', CAST(N'2020-03-07T20:56:13.5866667' AS DateTime2), CAST(N'2020-03-09T03:52:34.5666667' AS DateTime2), 33, 1, NULL)
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (54, N'Sue''s Furniture', N'234 Meade Av., San Diego, CA', N'{"SF_FURNITURE":"65000","STRATEGY_HOV_3":true,"STRATEGY_PARKING_2":true,"PROJECT_NAME":"Sue''s Furniture","PROJECT_ADDRESS":"234 Meade Av., San Diego, CA","VERSION_NO":"1","LAND_USE_RETAIL":true,"PARK_SPACES":"145","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":1}', CAST(N'2020-03-23T16:37:52.4233333' AS DateTime2), CAST(N'2020-03-23T16:37:52.4233333' AS DateTime2), 11, 1, NULL)
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (109, N'test', N'test', N'{"PROJECT_NAME":"test","PROJECT_ADDRESS":"test","LAND_USE_INSTITUTIONAL":true}', CAST(N'2020-04-02T03:14:51.7833333' AS DateTime2), CAST(N'2020-04-02T03:14:51.7833333' AS DateTime2), 33, 1, NULL)
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (273, N'Project Posted via Postman id 273', N'Project Address', N'{"UNITS_HABIT_LT3":"10","UNITS_HABIT_3":"20","UNITS_GUEST":"90","STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_2":true,"PROJECT_NAME":"Project 1","PROJECT_ADDRESS":"Project Address","LAND_USE_RESIDENTIAL":true,"LAND_USE_HOTEL":true,"PARK_SPACES":"110","STRATEGY_BIKE_4":true,"STRATEGY_INFO_3":1,"STRATEGY_PARKING_1":true,"STRATEGY_INFO_1":true}', CAST(N'2020-04-30T02:55:57.2266667' AS DateTime2), CAST(N'2020-04-30T03:00:46.3700000' AS DateTime2), 62, 1, N'loginId 61;')
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (312, N'Louis-Test', N'asdf', N'{"PROJECT_NAME":"Louis-Test","PROJECT_ADDRESS":"asdf","UNITS_HABIT_LT3":"123132","SF_RESTAURANT":"23131","PARK_SPACES":"23452","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_2":true}', CAST(N'2020-05-19T21:40:35.0600000' AS DateTime2), CAST(N'2020-05-19T21:40:35.0600000' AS DateTime2), 59, 1, NULL)
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (323, N'banana farms', N'123 mainstreet', N'{"PROJECT_NAME":"banana farms","PROJECT_ADDRESS":"123 mainstreet","UNITS_HABIT_LT3":"3","UNITS_CONDO":"100","PARK_SPACES":"200","STRATEGY_BIKE_3":true,"STRATEGY_BIKE_4":true,"STRATEGY_INFO_2":true,"STRATEGY_PARKING_1":true,"STRATEGY_SHARED_MOBILITY_2":true,"STRATEGY_TRANSIT_ACCESS_2":true,"STRATEGY_TMO_2":true,"STRATEGY_BIKE_1":true,"STRATEGY_BIKE_2":true}', CAST(N'2020-05-28T02:34:13.9000000' AS DateTime2), CAST(N'2020-05-28T02:34:13.9000000' AS DateTime2), 67, 1, NULL)
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (326, N'Marina Towers Village', N'13248 Maxella Ave.', N'{"PROJECT_NAME":"Marina Towers Village","PROJECT_ADDRESS":"13248 Maxella Ave.","UNITS_HABIT_LT3":"2","UNITS_HABIT_GT3":"400","UNITS_GUEST":"21","PARK_SPACES":"1","APN":"1___-___-___","STRATEGY_CAR_SHARE_4":true,"SF_INST_OTHER":"2","STRATEGY_INFO_3":"0","STRATEGY_PARKING_2":true,"STRATEGY_PARKING_1":true,"STRATEGY_TRANSIT_ACCESS_3":"50","STRATEGY_HOV_1":true}', CAST(N'2020-06-05T22:12:38.5866667' AS DateTime2), CAST(N'2020-06-18T19:38:11.3700000' AS DateTime2), 69, 1, NULL)
INSERT [dbo].[Project] ([id], [name], [address], [formInputs], [dateCreated], [dateModified], [loginId], [calculationId], [description]) VALUES (350, N'Jewish Family Service - Social Services Center (COPY)', N'320 N. Fairfax', N'{"SF_OFFICE":"28341","STRATEGY_BIKE_5":true,"STRATEGY_CAR_SHARE_1":true,"STRATEGY_HOV_3":true,"PROJECT_NAME":"Jewish Family Service - Social Services Center (COPY)","PROJECT_ADDRESS":"320 N. Fairfax","PROJECT_DESCRIPTION":"New 28,023 sf three-story building","LAND_USE_COMMERCIAL":true,"PARK_SPACES":"63","STRATEGY_BIKE_4":true,"STRATEGY_INFO_1":true,"STRATEGY_INFO_2":true,"STRATEGY_INFO_3":true}', CAST(N'2020-06-18T06:08:29.7966667' AS DateTime2), CAST(N'2020-06-18T06:08:29.7966667' AS DateTime2), 37, 1, N'New 28,023 sf three-story building')
SET IDENTITY_INSERT [dbo].[Project] OFF
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'b80e3ca5-b190-4669-b5cb-799f0ee092cd', N'jim@entrotech.net', CAST(N'2019-12-24T00:04:22.3600000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'a8d8f9cf-98a2-40ad-92b7-1bb11f373674', N'joedarragh@dispostable.com', CAST(N'2019-12-24T00:04:22.3600000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'ea22f756-6069-48bb-b953-e04f70a65976', N'suedarragh@dispostable.com', CAST(N'2019-12-24T00:04:22.3600000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'7ebf7951-7bc6-4ae4-b4dd-3e86fa413346', N'mazur@dispostable.com', CAST(N'2019-12-24T00:04:22.3600000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'01c24198-114e-4f0c-b374-54be2e341ff2', N'sdarragh@dispostable.com', CAST(N'2019-12-24T00:04:22.3600000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'ebec41cf-4bae-48e8-a2b3-8a7d7a0d9926', N'edna@dispostable.com', CAST(N'2019-12-24T07:06:19.0800000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'6fea4210-5a84-4c9b-8189-42039c90ee82', N'claire1@tdm.calc', CAST(N'2019-12-29T02:33:31.9200000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'274154fd-8ef8-4700-9ff4-d5c77386eaad', N'velile4661@wmail1.co', CAST(N'2019-12-29T20:40:56.4866667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'c87ccc96-1a28-4f3d-b556-2c2ec5c24dc5', N'velile4661@wmail1.com', CAST(N'2019-12-29T20:44:44.3000000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'e12b0f30-8c11-4d9a-94db-6b72f3320527', N'correlationtype@bitsharesbts.com', CAST(N'2019-12-29T20:47:13.9066667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'910328ff-cae7-4c4b-95c4-4c8c260a160c', N'correlationtype@ggijhd.com', CAST(N'2019-12-29T20:49:18.6866667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'2aa38787-3349-4962-ba94-4cc01961a623', N'correlationtype@urbanfamilyfoundation.org', CAST(N'2019-12-29T21:05:59.9500000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'a18e9c14-3735-40da-9f31-f5388c55acf1', N'experimentsinhonesty@gmail.com', CAST(N'2020-01-02T21:52:13.1766667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'10d51d7c-023f-44ef-aea5-43ebc5ad7a9a', N'bonnie2@hackforla.org', CAST(N'2020-01-06T18:57:58.1400000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'4a5dd7be-e399-41e4-8a6e-b4c1eeac0a62', N'gogib32674@seo-mailer.com', CAST(N'2020-01-07T05:13:29.2933333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'334d5909-7181-4701-8b57-871705fd8014', N'claire@tdm.com', CAST(N'2020-01-07T05:44:18.9900000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'020f904b-48f6-4c81-b3b0-fedd2caee7bf', N'claire@tdm.calc', CAST(N'2020-01-07T05:44:35.9300000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'd7a993d6-a778-40e4-a87d-8d1164e5b1ff', N'bradley@dispostable.com', CAST(N'2020-01-08T04:53:51.8366667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'6725be6f-0be5-4cbb-b75d-9bc1db362a1f', N'test@test.com', CAST(N'2020-01-08T05:16:23.6500000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'4d6ff684-0e02-4169-8df7-53b2df07ac46', N'bradley@dispostable.com', CAST(N'2020-01-09T03:31:10.9533333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'ca32e157-5ed1-4ed1-ba5d-a67b5ff3f6d1', N'darragh@entrotech.net', CAST(N'2020-01-10T18:07:14.8766667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'50be4522-9f46-4fd4-9a6f-3f4ff165ab94', N'darragh@entrotech.net', CAST(N'2020-01-10T18:35:49.2466667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'30753875-0284-4ffe-bc08-1f481ea38b07', N'darragh@entrotech.net', CAST(N'2020-01-10T18:37:12.1566667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'acc9b1e7-382b-4878-b463-5faff62add63', N'darragh@entrotech.net', CAST(N'2020-01-10T18:44:10.7866667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'74f9b9c5-8818-4a8a-8d37-9afcce488a82', N'ladot@dispostable.com', CAST(N'2020-01-10T22:13:30.3533333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'9dd76a10-e181-4336-87f9-e25689b48e59', N'bradley@dispostable.com', CAST(N'2020-01-12T05:19:27.3633333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'77f78d4b-c5c3-4024-b44d-0b58f940a4e6', N'bradley@dispostable.com', CAST(N'2020-01-12T05:20:57.4900000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'301b2646-4cd0-44ac-b905-9cdffc3e039c', N'bradley@dispostable.com', CAST(N'2020-01-12T05:22:00.8800000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'980244c4-8186-485e-aede-169922bd8f64', N'something@dispostable.com', CAST(N'2020-01-12T09:34:55.5266667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'2284af66-3bd6-4763-883d-ee509929e7f1', N'testAccount@dispostable.com', CAST(N'2020-01-13T03:51:28.2633333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'f0491578-8e15-45d7-b790-2ae19978cbb1', N'bob-saga@dispostable.com', CAST(N'2020-01-14T05:59:37.5700000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'370db131-c3b8-481a-a69d-f569053d35bc', N'experimentsinhonesty@gmail.com', CAST(N'2020-01-16T00:19:20.6633333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'f015bdbd-ad26-431e-9aff-0ee053f14ca5', N'testtdm@hackforla.org', CAST(N'2020-01-18T18:25:23.5400000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'93ee438a-aebe-4336-990c-75a60133639b', N'claire@dispostable.com', CAST(N'2020-01-18T21:04:11.6100000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'67d28c10-bea4-461e-a380-0c3b54eafde5', N'mr.urbanswag@gmail.com', CAST(N'2020-01-20T20:29:34.2833333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'df35d18f-476d-412c-8f86-a4428b9dddef', N'multimindia@gmail.com', CAST(N'2020-01-22T02:32:54.7366667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'a0d4d6b6-8a6a-4d0a-ba4c-80c21e3f6e57', N'testuser@dispostable.com', CAST(N'2020-01-24T00:02:02.4700000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'29fe0d46-12f8-4371-adc6-303a870dc3c6', N'blahblah@dispostable.com', CAST(N'2020-01-25T02:26:32.1800000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'e1449669-982a-4a4c-bbff-2dce5ae372bb', N'Kphowley@gmail.com', CAST(N'2020-01-30T01:04:03.5066667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'db0dec95-29ad-4e9b-9e61-e629eeede49f', N'rosemary.mccarron@lacity.org', CAST(N'2020-01-30T01:36:10.4900000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'1d8241c2-1b1c-47d6-adff-16ea8365fd9d', N'123@123.com', CAST(N'2020-01-30T03:16:55.6433333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'977ff59b-bf43-4e23-b7b4-5e285db9f82f', N'2y@gmail.com', CAST(N'2020-01-30T03:40:30.1600000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'191f26a5-3106-4eec-8798-64203dbd39aa', N'kphowley@gmail.com', CAST(N'2020-02-05T03:20:07.4733333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'23165397-172f-4aa3-a076-b1f3e3c22f35', N'kphowley@gmail.com', CAST(N'2020-02-05T03:20:08.2166667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'0788c878-f43d-471c-822c-33b7ff713c62', N'kphowley@gmail.com', CAST(N'2020-02-05T03:22:31.4166667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'8d9cd1a1-d0d3-45bd-9b0e-4e2353adc1af', N'kphowley@gmail.com', CAST(N'2020-02-05T03:22:49.3233333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'08343198-3ebe-47e3-b901-a30835728244', N'kphowley@gmail.com', CAST(N'2020-02-05T03:22:49.5900000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'e94ea6c1-6c1d-4804-8ac4-668983fe7d9c', N'kphowley@gmail.com', CAST(N'2020-02-05T03:22:49.9800000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'feeac2e7-3162-4478-a382-2154d1e1ca0d', N'er@er.com', CAST(N'2020-02-18T21:41:47.6733333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'9629efeb-a5cd-4c3d-b3e5-4b8fbaae20f6', N'adarragh@dispostable.com', CAST(N'2019-12-24T00:14:36.2200000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'a630bba7-1f9b-45bc-bbf0-40c537ffc1b7', N'chuckdarragh@dispostable.com', CAST(N'2019-12-24T00:18:31.8433333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'f29d1162-3483-4166-8839-844e88f48d4f', N'hsmith@dispostable.com', CAST(N'2019-12-24T01:56:30.0000000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'58282db0-38a4-48b2-abff-b21e1755eaf6', N'correlationtype@uu39.space', CAST(N'2019-12-29T20:01:47.0400000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'ae0c17f2-e0e5-4ba9-9e00-9930d49f5f9b', N'bradley@dispostable.com', CAST(N'2020-01-12T04:30:23.6233333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'69a2cfed-00c5-4f23-a19f-9ac358350407', N'bradley@dispostable.com', CAST(N'2020-01-12T04:30:27.3433333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'a75266d2-2edc-45d2-90f4-76c66eda6ec9', N'bradley@dispostable.com', CAST(N'2020-01-12T05:15:21.9266667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'5e0b8801-09d3-472b-b18c-49d546dee538', N'bradley@dispostable.com', CAST(N'2020-01-12T05:15:24.3166667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'3b07cd80-76cd-48e2-808c-01a762c0fe35', N'bradley@dispostable.com', CAST(N'2020-01-12T05:16:24.9600000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'acf3c2db-d3be-46f4-81fa-9de772f91ff3', N'bradley@dispostable.com', CAST(N'2020-01-12T05:50:12.5200000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'c5c43d77-76da-4e37-b8da-470cb6f3f94a', N'bradley@dispostable.com', CAST(N'2020-01-12T17:22:58.3600000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'27f53773-772d-4c6d-94ff-63fb98ec0a15', N'keara@dispostable.com', CAST(N'2020-01-15T02:44:26.2233333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'b1d13432-402d-4610-ac9e-080d4b92ed31', N'fang@dispostable.com', CAST(N'2020-01-16T00:31:49.6766667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'2a6e3cce-8120-4b80-9988-7281a3a91008', N'rvsmith1@student.fullsail.edu', CAST(N'2020-01-20T20:05:47.0666667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'37e600d1-3575-4cf9-8192-523545186ab2', N'blah@dispostable.com', CAST(N'2020-01-25T02:24:54.2266667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'0495b4a1-d68a-420c-9e2f-af95171c2f83', N'joel@joelparkerhenderson.com', CAST(N'2020-01-30T18:09:24.7066667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'2f9c63f2-edbf-4de2-b677-e3d167d323ca', N'bradley@dispostable.com', CAST(N'2020-02-05T03:32:01.2100000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'adb4ee85-8bd5-429f-a7ca-7b13129a83eb', N'bradley@dispostable.com', CAST(N'2020-02-05T03:33:04.1500000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'a2b4a9f9-6e5d-4598-ab3a-483ae917d679', N'bradley@dispostable.com', CAST(N'2020-02-05T03:33:34.5400000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'788695b1-8e20-410b-af5c-784e83685221', N'bradley@dispostable.com', CAST(N'2020-02-05T03:33:56.8066667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'd08c6f51-c5b4-475d-b7c0-758ac2a3f262', N'catherinedarragh@dispostable.com', CAST(N'2019-12-24T00:29:18.8266667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'9d27a1b7-c142-409e-87fa-cc1dd817d0c6', N'bonnie@hackforla.org', CAST(N'2020-01-01T06:42:10.5800000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'4eaced8a-2e76-452e-9c46-738e8c1f81df', N'test@hackforla.org', CAST(N'2020-01-06T00:23:43.0033333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'e353547c-ab20-46bb-9f49-a6525152936a', N'bradley@dispostable.com', CAST(N'2020-01-08T03:50:09.9500000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'086059fa-0688-408a-bba1-ab36ce18f4d3', N'bradley@dispostable.com', CAST(N'2020-01-12T05:13:34.0700000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'2f9728a9-8795-45e7-9da3-10f2ae795657', N'multimindia@gmail.com', CAST(N'2020-01-14T05:08:04.2166667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'741d2f4b-f5b5-42ad-bead-e5262cb71fed', N'bradley@dispostable.com', CAST(N'2020-02-05T03:27:02.8833333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'77ffd441-f5b1-49c3-a1ab-cf34cda3bbb2', N'bradley@dispostable.com', CAST(N'2020-02-05T03:27:22.0233333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'b9622e8e-3eed-4a53-a36e-e351b2a47606', N'bjones@dispostable.com', CAST(N'2019-12-24T02:00:35.4666667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'1c648466-e489-4d28-b86a-60c72e3e772d', N'gw@dispostable.com', CAST(N'2019-12-24T02:06:47.6400000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'25be0a24-8f0a-4964-bbfe-4e5a6aa7ec15', N'bradley@dispostable.com', CAST(N'2020-01-08T04:45:40.8700000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'194a5a57-5357-4f92-82d2-74b377870cfc', N'bradley@dispostable.com', CAST(N'2020-01-08T04:50:31.6366667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'fa73865d-0fbd-43a2-80b9-453838d7dede', N'darragh@entrotech.net', CAST(N'2020-02-18T23:28:10.3500000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'a67c01af-c455-499a-8d23-13e2c7f151d1', N'louismazza@gmail.com', CAST(N'2020-02-26T03:56:42.4233333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'7ef2e3c9-2098-4c97-831c-4b3758e359d4', N'louismazza@gmail.com', CAST(N'2020-02-26T04:09:14.0400000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'ac83bf23-13ec-4646-89ef-63f78e33342d', N'mazzawestfall815@gmail.com', CAST(N'2020-02-26T04:10:20.0766667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'0710c701-0a74-479c-acb4-bbb4ed45e20a', N'kphowley@gmail.com', CAST(N'2020-02-29T17:49:09.2366667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'f40f6db2-dcc5-4e73-97bb-bb5ca6589434', N'tdmadmin@dispostable.com', CAST(N'2020-03-23T19:23:01.4800000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'fcc7afbd-6481-4ceb-8b7d-c12a73e3be03', N'test_regular_user@dispostable.com', CAST(N'2020-03-31T04:33:18.6100000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'a6f1dfbb-e25f-428b-8902-74ad091a3681', N'test_admin@dispostable.com', CAST(N'2020-03-31T04:35:39.0166667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'50eb2171-e6e2-480c-9275-2e26b74301e0', N'test_security_admin@dispostable.com', CAST(N'2020-03-31T04:37:42.2500000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'f633dd94-3434-4c24-8b2d-1a5d6affcd90', N'ddfridley@yahoo.com', CAST(N'2020-05-28T02:29:28.4266667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'50e257b1-4e1c-40d8-9095-b1854016b611', N'alexchoiweb@gmail.com', CAST(N'2020-06-05T21:48:32.5600000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'9920cdb9-de9b-48a8-b67d-af0100c21ce6', N'testtdm@dispostable.com', CAST(N'2020-06-07T19:32:04.7000000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'1e6603b3-d45b-414b-affd-b4e07baaf49e', N'tdm-test-3@dispostable.com', CAST(N'2020-06-07T19:52:26.6800000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'b0e55bfe-b1a0-49eb-b461-fb7981ea0f36', N'kphowley@gmail.com', CAST(N'2020-03-04T21:13:00.1900000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'aae14d9d-8ae8-4e7e-a44c-4bdb737f0f38', N'test@dispostable.com', CAST(N'2020-03-31T19:04:52.3733333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'2eabe29d-4690-4974-9af5-6c3bb8541b1a', N'tdm-test-2@dispostable.com', CAST(N'2020-06-07T19:46:24.9800000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'53843eba-6d4d-4961-b7db-fe84d0e26c5d', N'tdm-test-7@dispostable.com', CAST(N'2020-06-15T17:56:09.9500000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'd670d037-70f6-40c8-be7a-3565997e9d41', N'charlesdarragh@dispostable.com', CAST(N'2020-04-01T22:20:37.3400000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'8692645d-410b-4bf3-8f39-c4691a39b2ab', N'kh@dispostable.com', CAST(N'2020-06-04T01:51:14.2366667' AS DateTime2))
GO
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'8bf4d4d4-b52d-4c25-ad79-77afe1092ed2', N'tdm-test-4@dispostable.com', CAST(N'2020-06-07T22:10:52.5433333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'd7270d7f-1aef-49b5-8e1f-821794158657', N'tdm-test-5@dispostable.com', CAST(N'2020-06-09T18:40:43.4066667' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'e6a785ed-11ad-433b-9f03-d1bbd2f29626', N'tdm-test-6@dispostable.com', CAST(N'2020-06-10T23:41:18.8633333' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'b656d301-e4e6-4c91-8d26-9ff7ac2e4d80', N'tdm-test-8@dispostable.com', CAST(N'2020-06-16T16:23:11.7400000' AS DateTime2))
INSERT [dbo].[SecurityToken] ([token], [email], [dateCreated]) VALUES (N'8fa99680-38fb-4c09-aa80-2f8269a70cf3', N'tdm-test-9@dispostable.com', CAST(N'2020-06-18T00:00:09.7366667' AS DateTime2))
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_CalculationRule]    Script Date: 6/21/2020 4:48:06 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CalculationRule] ON [dbo].[CalculationRule]
(
	[calculationId] ASC,
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Login]    Script Date: 6/21/2020 4:48:06 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Login] ON [dbo].[Login]
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Calculation] ADD  CONSTRAINT [DF_Calculation_description]  DEFAULT ('') FOR [description]
GO
ALTER TABLE [dbo].[Calculation] ADD  CONSTRAINT [DF_Calculation_deprecared]  DEFAULT ((0)) FOR [deprecated]
GO
ALTER TABLE [dbo].[Calculation] ADD  CONSTRAINT [DF_Calculation_dateCreated]  DEFAULT (getutcdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[Calculation] ADD  CONSTRAINT [DF_Calculation_dateModified]  DEFAULT (getutcdate()) FOR [dateModified]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  CONSTRAINT [DF_Rule_category]  DEFAULT ('') FOR [category]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  CONSTRAINT [DF_Rule_dataType]  DEFAULT ('') FOR [dataType]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  CONSTRAINT [DF_Rule_units]  DEFAULT ('') FOR [units]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  CONSTRAINT [DF_Rule_functionBody]  DEFAULT ('') FOR [functionBody]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  CONSTRAINT [DF_Rule_displayOrder]  DEFAULT ((1000000)) FOR [displayOrder]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  CONSTRAINT [DF_CalculationRule_deprecated]  DEFAULT ((0)) FOR [inactive]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  CONSTRAINT [DF_CalculationRule_used]  DEFAULT ((0)) FOR [used]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  CONSTRAINT [DF_CalculationRule_displayFunctionBody]  DEFAULT ('return true;') FOR [displayFunctionBody]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  CONSTRAINT [DF_CalculationRule_required]  DEFAULT ((0)) FOR [required]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  DEFAULT ((0)) FOR [displayComment]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  DEFAULT ('') FOR [description]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  DEFAULT ('') FOR [mask]
GO
ALTER TABLE [dbo].[CalculationRule] ADD  DEFAULT ('') FOR [link]
GO
ALTER TABLE [dbo].[Login] ADD  CONSTRAINT [DF_Login_dateCreated]  DEFAULT (getutcdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[Login] ADD  CONSTRAINT [DF_Login_emailConfirmed]  DEFAULT ((0)) FOR [emailConfirmed]
GO
ALTER TABLE [dbo].[Login] ADD  DEFAULT ((0)) FOR [isAdmin]
GO
ALTER TABLE [dbo].[Login] ADD  DEFAULT ((0)) FOR [isSecurityAdmin]
GO
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_dateCreated]  DEFAULT (getutcdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_dateModified]  DEFAULT (getutcdate()) FOR [dateModified]
GO
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_description]  DEFAULT ('') FOR [description]
GO
ALTER TABLE [dbo].[SecurityToken] ADD  CONSTRAINT [DF_SecurityToken_dateCreated]  DEFAULT (getutcdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[CalculationPanel]  WITH CHECK ADD  CONSTRAINT [FK_CalculationPanel_Calculation] FOREIGN KEY([calculationId])
REFERENCES [dbo].[Calculation] ([id])
GO
ALTER TABLE [dbo].[CalculationPanel] CHECK CONSTRAINT [FK_CalculationPanel_Calculation]
GO
ALTER TABLE [dbo].[CalculationRule]  WITH CHECK ADD  CONSTRAINT [FK_CalculationRule_CalculationRule] FOREIGN KEY([calculationId], [calcCode])
REFERENCES [dbo].[CalculationRule] ([calculationId], [code])
GO
ALTER TABLE [dbo].[CalculationRule] CHECK CONSTRAINT [FK_CalculationRule_CalculationRule]
GO
ALTER TABLE [dbo].[CalculationRule]  WITH CHECK ADD  CONSTRAINT [FK_Rule_Calculation] FOREIGN KEY([calculationId])
REFERENCES [dbo].[Calculation] ([id])
GO
ALTER TABLE [dbo].[CalculationRule] CHECK CONSTRAINT [FK_Rule_Calculation]
GO
ALTER TABLE [dbo].[Project]  WITH CHECK ADD  CONSTRAINT [FK_Project_Calculation] FOREIGN KEY([calculationId])
REFERENCES [dbo].[Calculation] ([id])
GO
ALTER TABLE [dbo].[Project] CHECK CONSTRAINT [FK_Project_Calculation]
GO
ALTER TABLE [dbo].[Project]  WITH CHECK ADD  CONSTRAINT [FK_Project_Login] FOREIGN KEY([loginId])
REFERENCES [dbo].[Login] ([id])
GO
ALTER TABLE [dbo].[Project] CHECK CONSTRAINT [FK_Project_Login]
GO
/****** Object:  StoredProcedure [dbo].[Account_Login]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Account_Login]
	@email varchar(255)
AS 

-- exec TDM.dbo.Account_Login email


SELECT id, email, confirmed, password, role from Account where email = @email;
GO
/****** Object:  StoredProcedure [dbo].[Account_Register]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Account_Register]
	@email varchar(255) output,
	@password varchar(72)
AS 

-- exec TDM.dbo.Account_Register email password null

INSERT INTO Account (
		email, 
		password
	)
	VALUES (
	@email,
	@password
	);

SELECT id, email, confirmed, role from Account where id = SCOPE_IDENTITY();
GO
/****** Object:  StoredProcedure [dbo].[Calculation_Delete]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Calculation_Delete] 
	@id int
AS
BEGIN
/*

	EXEC dbo.Calculation_Delete <args> 

*/


	DELETE Calculation
	WHERE 
		id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[Calculation_Insert]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Calculation_Insert] 
	@name nvarchar(50)
	, @description nvarchar(400)
	, @deprecated bit = 0
	, @id int output
AS
BEGIN
/*

	DECLARE @name nvarchar(50) = 'Car=bon Emissions'
	DECLARE @description nvarchar(400) = 'Calculates Carbon Emission Credits'
	DECLARE @Id int

	EXEC dbo.Calculation_Insert 
		@name
		, @description
		, @Id = @Id output

	select @Id

*/

	INSERT Calculation
	(
		name
		, description
		, deprecated
	)
	VALUES 
	(
		@name
		, @description
		, @deprecated
	)

	SET @id = SCOPE_IDENTITY() 
END
GO
/****** Object:  StoredProcedure [dbo].[Calculation_SelectAll]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Calculation_SelectAll] 
AS
BEGIN

/*

	EXEC dbo.Calculation_SelectAll 

*/

	SELECT 
		id
		, name
		, description
		, deprecated
		, dateCreated
		, dateModified
	FROM Calculation

END
GO
/****** Object:  StoredProcedure [dbo].[Calculation_SelectById]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Calculation_SelectById] 
	@id int
AS
BEGIN
/*

	EXEC dbo.Calculation_SelectById 1

*/


	SELECT 
		id
		, name
		, description
		, deprecated
		, dateCreated
		, dateModified
	FROM Calculation
	WHERE 
		id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[Calculation_Update]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Calculation_Update] 
	@id int
	, @name nvarchar(50)
	, @description nvarchar(400)
	, @deprecated bit = 0
AS
BEGIN
/*

	DECLARE @name nvarchar(50) = 'Carbon Emissions'
	DECLARE @description nvarchar(400) = 'Carbon Emission Calculation'
	DECLARE @deprecated bit = 0
	DECLARE @Id int = 3

	EXEC dbo.Calculation_Update 
		@name = @name
		, @description = @description
		, @deprecated = @deprecated
		, @Id = @id

*/

	UPDATE Calculation SET 
		name = @name
		, description = @description
		, deprecated = @deprecated
		, dateModified = getutcDate()
	WHERE 
		id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[CalculationRule_Delete]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CalculationRule_Delete] 
	@id int
AS
BEGIN
/*

	EXEC dbo.CalculationRule_Delete <args> 

*/


	DELETE CalculationRule
	WHERE 
		id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[CalculationRule_Insert]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CalculationRule_Insert] 
	@calculationId int
	, @code varchar(50)
	, @name nvarchar(100)
	, @category varchar(20)
	, @dataType varchar(20)
	, @units nvarchar(50)
	, @value nvarchar(200)
	, @functionBody nvarchar(max)
	, @displayOrder int
	, @id int output
AS
BEGIN
/*

	DECLARE @calculationId int = <value>
	DECLARE @code varchar(50) = <value>
	DECLARE @name nvarchar(100) = <value>
	DECLARE @category varchar(20) = <value>
	DECLARE @dataType varchar(20) = <value>
	DECLARE @units nvarchar(50) = <value>
	DECLARE @value nvarchar(200) = <value>
	DECLARE @functionBody nvarchar(max) = <value>
	DECLARE @displayOrder int = <value>
	DECLARE @Id int

	EXEC dbo.CalculationRule_Insert 
		@calculationId
		, @code
		, @name
		, @category
		, @dataType
		, @units
		, @value
		, @functionBody
		, @displayOrder
		, @Id = @Id output

*/

	INSERT CalculationRule
	(
		calculationId
		, code
		, name
		, category
		, dataType
		, units
		, value
		, functionBody
		, displayOrder
	)
	VALUES 
	(
		@calculationId
		, @code
		, @name
		, @category
		, @dataType
		, @units
		, @value
		, @functionBody
		, @displayOrder
	)

	SET @id = SCOPE_IDENTITY() 
END
GO
/****** Object:  StoredProcedure [dbo].[CalculationRule_SelectAll]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[CalculationRule_SelectAll] 
AS
BEGIN

/*

	EXEC dbo.CalculationRule_SelectAll 

*/

	SELECT 
		id
		, calculationId
		, code
		, name
		, category
		, dataType
		, units
		, value
		, functionBody
		, displayOrder
		, inactive
		, calculationPanelId
		, used
		, displayFunctionBody
		, minValue
		, maxValue
		, choices
		, calcCode
		, required
		, minStringLength
		, maxStringLength
		, displayComment
		, description
		, mask
		, link
	FROM CalculationRule

END
GO
/****** Object:  StoredProcedure [dbo].[CalculationRule_SelectByCalculationId]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[CalculationRule_SelectByCalculationId] 
	@calculationId int
AS
BEGIN
/*

	EXEC dbo.CalculationRule_SelectByCalculationId 1

*/


	SELECT 
		cr.id
		, cr.calculationId
		, cr.code
		, cr.name
		, cr.category
		, cr.dataType
		, cr.units
		, cr.value
		, cr.functionBody
		, cr.displayOrder
		, cp.name as panelName
		, cp.cssClass
		, cp.displayOrder as panelDisplayOrder
		, cp.id as calculationPanelId
		, cr.used
		, cr.displayFunctionBody
		, cr.minValue
		, cr.maxValue
		, cr.choices
		, cr.calcCode
		, cr.required
		, cr.minStringLength
		, cr.maxStringLength
		, cr.displayComment
		, cr.description
		, cr.mask
		, cr.link
	FROM CalculationRule cr
		LEFT JOIN CalculationPanel cp on cr.calculationPanelId = cp.id 
	WHERE 
		cr.calculationId = @calculationId
	ORDER BY cp.displayOrder, cr.displayOrder, cr.name

END
GO
/****** Object:  StoredProcedure [dbo].[CalculationRule_SelectById]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CalculationRule_SelectById] 
	@id int
AS
BEGIN
/*

	EXEC dbo.CalculationRule_SelectById <args> 

*/


	SELECT 
		id
		, calculationId
		, code
		, name
		, category
		, dataType
		, units
		, value
		, functionBody
		, displayOrder
		, inactive
		, calculationPanelId
		, used
		, displayFunctionBody
		, minValue
		, maxValue
		, choices
		, calcCode
		, required
		, minStringLength
		, maxStringLength
		, displayComment
		, description
		, mask
		, link
	FROM CalculationRule
	WHERE 
		id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[CalculationRule_Update]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CalculationRule_Update] 
	@id int
	, @calculationId int = null -- Cannot actually change parent calculation
	, @code varchar(50)
	, @name nvarchar(100)
	, @category varchar(20)
	, @dataType varchar(20)
	, @units nvarchar(50)
	, @value nvarchar(200)
	, @functionBody nvarchar(max)
	, @displayOrder int
AS
BEGIN
/*

	DECLARE @code varchar(50) = <value>
	DECLARE @name nvarchar(100) = <value>
	DECLARE @category varchar(20) = <value>
	DECLARE @dataType varchar(20) = <value>
	DECLARE @units nvarchar(50) = <value>
	DECLARE @value nvarchar(200) = <value>
	DECLARE @functionBody nvarchar(max) = <value>
	DECLARE @displayOrder int = <value>
	DECLARE @id int

	EXEC dbo.CalculationRule_Update 
		@code = @code
		, @name = @name
		, @category = @category
		, @dataType = @dataType
		, @units = @units
		, @value = @value
		, @functionBody = @functionBody
		, @displayOrder = @displayOrder
		, @id  = @id

	select @id

*/

	UPDATE CalculationRule SET 
		code = @code
		, name = @name
		, category = @category
		, dataType = @dataType
		, units = @units
		, value = @value
		, functionBody = @functionBody
		, displayOrder = @displayOrder
	WHERE 
		id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[Create_Account]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Create_Account]
	@email varchar(255) output,
	@password varchar(72)
AS 

-- exec dbo.Create_Account email password null

INSERT INTO Account (
		email, 
		password
	)
	VALUES (
	@email,
	@password
	);

SELECT id, email, confirmed, role from Account where id = SCOPE_IDENTITY();
GO
/****** Object:  StoredProcedure [dbo].[Faq_Delete]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Faq_Delete] 
	@faqId int
AS
BEGIN
/*

	EXEC TDM.dbo.Faq_Delete <args> 

*/


	DELETE Faq
	WHERE 
		faqId = @faqId
END
GO
/****** Object:  StoredProcedure [dbo].[Faq_Insert]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Faq_Insert] 
	@question varchar(250)
	, @answer varchar(500)
	, @faqId int output
	
AS
BEGIN
/*

	DECLARE @name nvarchar(50) = 'Car=bon Emissions'
	DECLARE @description nvarchar(400) = 'Calculates Carbon Emission Credits'
	DECLARE @Id int

	EXEC dbo.Faq_Insert 
		@question
		, @answer
		, @Id = @Id output

	select @Id

*/

	INSERT Faq
	(
		question
		, answer
	)
	VALUES 
	(
		@question
		, @answer
		
	)

	SET @faqId = SCOPE_IDENTITY() 
END
GO
/****** Object:  StoredProcedure [dbo].[Faq_SelectAll]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Faq_SelectAll] 
AS
BEGIN

/*

	EXEC dbo.Faq_SelectAll 

*/

	SELECT *
	FROM Faq

END
GO
/****** Object:  StoredProcedure [dbo].[Faq_Update]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Faq_Update] 
	@faqId int
	, @question varchar(250)
	, @answer varchar(500)
	
AS
BEGIN
/*

	DECLARE @name nvarchar(50) = 'Carbon Emissions'
	DECLARE @description nvarchar(400) = 'Carbon Emission Calculation'
	DECLARE @deprecated bit = 0
	DECLARE @Id int = 3

	EXEC TDM.dbo.Faq_Update 
		@faqId = @faqId
 		, @question = @question
		, @answer = @answer

*/

	UPDATE Faq SET 
		question = @question
		, answer = @answer
	WHERE 
		faqId = @faqId

END
GO
/****** Object:  StoredProcedure [dbo].[GenerateCrud]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[GenerateCrud] 
@TableName varchar(100)
as
begin
/*

	This is a utility procedure that generates standard CRUD
	StoredProcedures.  You just pass it the table name and it will
	generate text results that you can paste into an SSMS query window
	and execute to create the five basic stored procedures for the 
	table.

*/
/*
	exec GenerateCrud 'Meetings'

*/
	declare @cols varchar(max) = ''
	declare @parms varchar(max) = ''
	declare @colparms varchar(4000) = ''
	declare @sproc varchar(max)
	declare @args varchar(max) = ''
	declare @nl varchar(2) = char(10) --+ char(13)
	declare @tab varchar(1) = char(9)
	declare @nltab varchar(3) = @nl + @tab
	declare @nltab2 varchar(4) = @nltab + @tab
	declare @where varchar(max) = ''
	declare @identityColName varchar(100)
	declare @scopeIdentityFragment varchar(150) = ''
	declare @testDeclarations nvarchar(4000)

	create table #cols
	(
		OrdinalPosition int,
		ColumnName varchar(100),
		ColumnUpdate varchar(200),
		ColumnDataType varchar(100),
		IsPrimaryKey bit,
		IsIdentity bit,
		IsSpecial bit  -- special cols are provided by defaults or custom code (vs. sproc args)
	)

	insert #cols (OrdinalPosition, ColumnName, ColumnUpdate, ColumnDataType, IsPrimaryKey,  IsIdentity, IsSpecial)
	select c.ordinal_position, c.column_name, c.column_name + ' = @' + c.column_name,
		c.data_type + 
		case when c.character_maximum_length is not null then '(' 
		+ case when c.character_maximum_length = -1 then 'max' else convert(varchar, c.character_maximum_length) end + ')' 
		when c.numeric_precision is not null and data_type in ('decimal', 'numeric') then '(' + convert(varchar, c.numeric_precision) + ',' + convert(varchar, c.numeric_scale) + ')'
		when c.datetime_precision > 0 then '(' + convert(varchar, c.datetime_precision) + ')'
		else '' end,
		0, COLUMNPROPERTY(object_id(c.table_name), c.column_name, 'IsIdentity'),
		case when c.column_name in ('dateCreated', 'dateModified') then 1 else 0 end
	from information_schema.columns c
	where table_name = @TableName

	select @identityColName = ColumnName
	from #cols where IsIdentity = 1

	update #cols set IsPrimaryKey = 1
	where ColumnName in
	(
		SELECT Col.Column_Name from 
			INFORMATION_SCHEMA.TABLE_CONSTRAINTS Tab, 
			INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE Col 
		WHERE 
			Col.Constraint_Name = Tab.Constraint_Name
			AND Col.Table_Name = Tab.Table_Name
			AND Constraint_Type = 'PRIMARY KEY'
			AND Col.Table_Name = @TableName
	)

	/*
		Build insert sproc
	*/
	set @args = ''

	select @args = @args + case when @args = '' then 
			@nltab + '@' + ColumnName + ' ' + ColumnDataType
		else 
			@nltab + ', @' + ColumnName + ' ' + ColumnDataType
		end
	from #cols
	where IsIdentity = 0
		and IsSpecial = 0
	order by OrdinalPosition

	select @args = @args + case when @args = '' then 
			@nltab + '@' + ColumnName + ' ' + ColumnDataType + ' output'
		else 
			@nltab + ', @' + ColumnName + ' ' + ColumnDataType + ' output'
		end
	from #cols
	where IsIdentity = 1
	order by OrdinalPosition

	set @cols = ''
	select @cols = @cols + case when @cols = '' then 
			@nltab2 +  ColumnName 
		else 
			@nltab2 + ', ' + ColumnName 
		end
	from #cols
	where IsIdentity = 0
		and IsSpecial = 0
	order by OrdinalPosition

	set @parms = ''
	select @parms = @parms + case when @parms = '' then 
			@nltab2 + '@' + ColumnName 
		else 
			@nltab2 + ', @' + ColumnName 
		end
	from #cols
	where IsIdentity = 0
		and IsSpecial = 0
	order by OrdinalPosition

	if( @identityColName is not null)
	begin
		select @scopeIdentityFragment = @nltab + 'SET @' + convert(varchar,@identityColName) + ' = SCOPE_IDENTITY() ' 
	end

	set @testDeclarations = ''

	select @testDeclarations = @testDeclarations + 
			@nltab + 'DECLARE @' + ColumnName + ' ' + ColumnDataType + ' = <value>'
	from #cols
	where IsIdentity = 0
		and IsSpecial = 0
	order by OrdinalPosition


	set @sproc ='CREATE PROC dbo.' + @TableName + '_Insert '
		+ @args
		+ @nl + 'AS' 
		+ @nl + 'BEGIN' 
		+ @nl + '/*' 
		+ @nl
		+ @testDeclarations
		+ @nltab + 'DECLARE @Id int'
		+ @nl
		+ @nltab + 'EXEC dbo.' + @TableName + '_Insert ' 
		+ @parms
		+ @nltab2 + ', @Id = @Id output'
		+ @nl 
		+ @nl + '*/'
		+ @nl
		+ @nltab + 'INSERT ' + @TableName + @nltab +  '('
		+ @cols
		+ @nltab + ')'
		+ @nltab + 'VALUES ' + @nltab + '('
		+ @parms
		+ @nltab + ')'
		+ @nl + @scopeIdentityFragment
		+ @nl + 'END'

	select @sproc as "Insert"

	/*
		Build update sproc
	*/

	set @args = ''
	select @args = @args + case when @args = '' then 
			@nltab + '@' + ColumnName + ' ' + ColumnDataType
		else 
			@nltab + ', @' + ColumnName + ' ' + ColumnDataType
		end
	from #cols
	where IsSpecial = 0
	order by OrdinalPosition
	
	set @cols = ''
	select @cols = @cols + case when @cols = '' then 
			@nltab2 + ColumnName +  ' = @' + ColumnName 
		else 
			@nltab2 + ', ' + ColumnName +  ' = @' + ColumnName 
		end
	from #cols
	where IsPrimaryKey = 0
		and IsSpecial = 0
	order by OrdinalPosition

	if exists (select * from #cols where ColumnName = 'DateModified')
	begin 
		set @cols = @cols + @nltab2 + ', DateModified = getutcdate()'
	end

	set @where = ''
	select @where = @where +
		case when @where = '' then
			@nltab + 'WHERE ' + @nltab2  + ColumnUpdate
		else
			@nltab2 +'AND ' + ColumnUpdate
		end 
	from #cols c
	where IsPrimaryKey = 1


	set @sproc ='CREATE PROC dbo.' + @TableName + '_Update '
		+ @args
		+ @nl + 'AS' 
		+ @nl + 'BEGIN' 
		+ @nl + '/*' 
		+ @nl
		+ @testDeclarations
		+ @nltab + 'DECLARE @Id int'
		+ @nl
		+ @nltab + 'EXEC dbo.' + @TableName + '_Update ' 
		+ @parms
		+ @nltab2 + ', @Id '
		+ @nl 
		+ @nl + '*/'
		+ @nl
		+ @nltab + 'UPDATE ' + @TableName + ' SET '
		+ @cols
		+ @where
		+ @nl
		+ @nl + 'END'

	select @sproc as "Update"

	/*
		Build delete sproc
	*/
	set @args = ''
	select @args = @args + case when @args = '' then 
			@nltab + '@' + ColumnName + ' ' + ColumnDataType
		else 
			@nltab + ', @' + ColumnName + ' ' + ColumnDataType
		end
	from #cols
	where IsPrimaryKey = 1
	order by OrdinalPosition

	select @sproc = 'CREATE PROC dbo.' + @TableName + '_Delete '
		+ @args 
		+ @nl + 'AS' 
		+ @nl + 'BEGIN' 
		+ @nl + '/*' 
		+ @nl
		+ @nltab + 'EXEC dbo.' + @TableName + '_Delete <args> ' 
		+ @nl 
		+ @nl + '*/'
		+ @nl
		+ @nl
		+ @nltab + 'DELETE ' + @TableName
		+ @where
		+ @nl + 'END'

	select @sproc as "Delete"

	/*
		SelectById
	*/

	set @cols = ''
	select @cols = @cols + case when @cols = '' then 
			@nltab2 +  ColumnName 
		else 
			@nltab2 + ', ' + ColumnName 
		end
	from #cols
	where IsSpecial = 0
	order by OrdinalPosition

	set @args = ''
	select @args = @args + case when @args = '' then 
			@nltab + '@' + ColumnName + ' ' + ColumnDataType
		else 
			@nltab + ', @' + ColumnName + ' ' + ColumnDataType
		end
	from #cols
	where IsPrimaryKey = 1
	order by OrdinalPosition

	select @sproc = 'CREATE PROC dbo.' + @TableName + '_SelectById '
		+ @args 
		+ @nl + 'AS' 
		+ @nl + 'BEGIN' 
		+ @nl + '/*' 
		+ @nl
		+ @nltab + 'EXEC dbo.' + @TableName + '_SelectById <args> ' 
		+ @nl 
		+ @nl + '*/'
		+ @nl
		+ @nl
		+ @nltab + 'SELECT ' + @cols
		+ @nltab + 'FROM ' + @TableName
		+ @where
		+ @nl
		+ @nl + 'END'

	select @sproc as "SelectById"

	/*
		SelectAll
	*/

	select @sproc = 'CREATE PROC dbo.' + @TableName + '_SelectAll '
		+ @nl + 'AS' 
		+ @nl + 'BEGIN' 
		+ @nl 
		+ @nl + '/*' 
		+ @nl
		+ @nltab + 'EXEC dbo.' + @TableName + '_SelectAll ' 
		+ @nl 
		+ @nl + '*/'
		+ @nl
		+ @nltab + 'SELECT ' + @cols
		+ @nltab + 'FROM ' + @TableName
		+ @nl
		+ @nl + 'END'

	select @sproc as "SelectAll"
		

end
GO
/****** Object:  StoredProcedure [dbo].[Login_ChangePassword]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[Login_ChangePassword]
@email nvarchar(100),
@passwordHash nvarchar(200)
AS
BEGIN

	UPDATE Login SET passwordHash = @passwordHash
	WHERE email = @email

END
GO
/****** Object:  StoredProcedure [dbo].[Login_ConfirmEmail]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[Login_ConfirmEmail]
@email nvarchar(100)
AS
BEGIN

	UPDATE Login SET emailConfirmed = 1
	WHERE email = @email

END
GO
/****** Object:  StoredProcedure [dbo].[Login_Insert]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[Login_Insert]
@firstName nvarchar(50),
@lastName nvarchar(50),
@email nvarchar(100),
@passwordHash nvarchar(200),
@id int OUTPUT
AS
BEGIN

	INSERT Login (firstName, lastName, email, passwordHash)
	VALUES(@firstName, @lastName, @email, @passwordHash)

	SET @id = SCOPE_IDENTITY() 


END
GO
/****** Object:  StoredProcedure [dbo].[Login_SelectAll]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Login_SelectAll] 
AS
BEGIN
	SELECT w.id, w.firstName, w.lastName, w.email, w.dateCreated, 
      w.emailConfirmed, w.isAdmin, w.passwordHash, w.isSecurityAdmin
    FROM login w
    ORDER BY w.lastName, w.firstName, w.dateCreated
END
GO
/****** Object:  StoredProcedure [dbo].[Login_SelectByEmail]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Login_SelectByEmail]
@email nvarchar(100)
AS
BEGIN

/*

	EXEC Login_SelectByEmail 'darragh@entrotech.net'

*/
	SELECT w.id, w.firstName, w.lastName, w.email, w.dateCreated, 
      w.emailConfirmed, w.isAdmin, w.passwordHash, w.isSecurityAdmin
    FROM login w
    WHERE w.email like @email
END
GO
/****** Object:  StoredProcedure [dbo].[Login_SelectById]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Login_SelectById]
@id int
AS
BEGIN

/*

	EXEC Login_SelectById 1

*/
	SELECT w.id, w.firstName, w.lastName, w.email, w.dateCreated, 
      w.emailConfirmed, w.isAdmin, w.passwordHash, w.isSecurityAdmin
    FROM login w
    WHERE w.id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[Login_UpdateRoles]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Login_UpdateRoles]
@isAdmin bit,
@isSecurityAdmin bit,
@id int
AS
BEGIN

	UPDATE Login SET
		isAdmin = @isAdmin,
		isSecurityAdmin = @isSecurityAdmin
	FROM Login
	WHERE id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[Project_Copy]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Create date: June 13, 2020
-- Description:	Copy/duplicate an existing project
-- =============================================
CREATE PROC [dbo].[Project_Copy]
    @id int,
    @loginId int
AS
BEGIN
    INSERT INTO Project
        (
        Project.name,
        Project.address,
        Project.formInputs,
        Project.loginId,
        Project.calculationId,
        Project.description
        )
    (   
        SELECT
        Project.name + ' (COPY)',
        Project.address,
        Project.formInputs,
        Project.loginId,
        Project.calculationId,
        Project.description
    FROM Project
    WHERE Project.id = @id AND Project.loginId = @loginId
    )
END
GO
/****** Object:  StoredProcedure [dbo].[Project_Delete]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Project_Delete] 
	@loginId int,
	@id int
AS
BEGIN

	DELETE Project
	WHERE 
		id = @id and loginId = @loginId

END
GO
/****** Object:  StoredProcedure [dbo].[Project_Insert]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Project_Insert] 
	@name nvarchar(200)
	, @address nvarchar(200)
	, @formInputs nvarchar(max)
	, @loginId int
	, @calculationId int
	, @description nvarchar(max)
	, @id int output
AS
BEGIN
/*

	DECLARE @name nvarchar(200) = <value>
	DECLARE @address nvarchar(200) = <value>
	DECLARE @formInputs nvarchar(max) = <value>
	DECLARE @loginId int = <value>
	DECLARE @calculationId int = <value>
	DECLARE @Id int

	EXEC dbo.Project_Insert 
		@name
		, @address
		, @formInputs
		, @loginId
		, @calculationId
		, @Id = @Id output

*/

	INSERT Project
	(
		name
		, address
		, formInputs
		, loginId
		, calculationId
		, description
	)
	VALUES 
	(
		@name
		, @address
		, @formInputs
		, @loginId
		, @calculationId
		, @description
	)

	SET @id = SCOPE_IDENTITY() 
END
GO
/****** Object:  StoredProcedure [dbo].[Project_SelectAll]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Project_SelectAll] 
@loginId int = null
AS
BEGIN

/*
	// LADOT (i.e., Admin) user sees all projects
	EXEC dbo.Project_SelectAll @loginId = 37

	// Regular user sees only his/her projects
	EXEC dbo.Project_SelectAll @loginId = 11

*/
	IF EXISTS(SELECT 1 FROM Login WHERE id = @LoginId and isAdmin = 1)
	BEGIN
		-- Admin can see all projects
		SELECT 
			p.id
			, p.name
			, p.address
			, p.formInputs
			, p.loginId
			, p.calculationId
			, p.dateCreated
			, p.dateModified
			, p.description
			, author.firstName
			, author.lastName
		FROM Project p
		JOIN Login author on p.loginId = author.id
	END
	ELSE
	BEGIN
		-- User can only see their own projects
		SELECT 
			p.id
			, p.name
			, p.address
			, p.formInputs
			, p.loginId
			, p.calculationId
			, p.dateCreated
			, p.dateModified
			, p.description
			, author.firstName
			, author.lastName
		FROM Project p
		JOIN Login author on p.loginId = author.id
		WHERE author.id = ISNULL(@loginId, author.id)
	END

	
	
	

END
GO
/****** Object:  StoredProcedure [dbo].[Project_SelectById]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Project_SelectById] 
	@loginId int = null,
	@id int
AS
BEGIN
/*

	EXEC dbo.Project_SelectById @loginId = 37, @id = 2

	EXEC dbo.Project_SelectById @loginId = 11, @id = 2

*/

IF EXISTS(SELECT 1 FROM Login WHERE id = @LoginId and isAdmin = 1)
	BEGIN
		SELECT 
			p.id
			, p.name
			, p.address
			, p.formInputs
			, p.loginId
			, p.calculationId
			, p.dateCreated
			, p.dateModified
			, p.description
			, l.firstName
			, l.lastName
		FROM Project p
		JOIN Login l on p.loginId = l.id
		WHERE 
			p.id = @id
	END
	ELSE
	BEGIN
		SELECT 
			p.id
			, p.name
			, p.address
			, p.formInputs
			, p.loginId
			, p.calculationId
			, p.dateCreated
			, p.dateModified
			, p.description
			, l.firstName
			, l.lastName
		FROM Project p
		JOIN Login l on p.loginId = l.id
		WHERE 
			p.id = @id
			AND p.loginId = ISNULL(@loginId, p.loginId)
	END

END
GO
/****** Object:  StoredProcedure [dbo].[Project_Update]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Project_Update] 
	@id int
	, @name nvarchar(200)
	, @address nvarchar(200)
	, @formInputs nvarchar(max)
	, @loginId int
	, @calculationId int
	, @description nvarchar(max)
AS
BEGIN
/*

	DECLARE @name nvarchar(200) = <value>
	DECLARE @address nvarchar(200) = <value>
	DECLARE @formInputs nvarchar(max) = <value>
	DECLARE @loginId int = <value>
	DECLARE @calculationId int = <value>
	DECLARE @Id int

	EXEC dbo.Project_Update 
		@name
		, @address
		, @formInputs
		, @loginId
		, @calculationId
		, @Id 

*/

	UPDATE Project SET 
		name = @name
		, address = @address
		, formInputs = @formInputs
		, loginId = @loginId
		, calculationId = @calculationId
		, description = @description
		, DateModified = getutcdate()
	WHERE 
		id = @id

END
GO
/****** Object:  StoredProcedure [dbo].[SecurityToken_Insert]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SecurityToken_Insert]
	@token nvarchar(200),
	@email nvarchar(100)
AS
BEGIN
	INSERT SecurityToken (token, email ) 
    VALUES (@token, @email)
END
GO
/****** Object:  StoredProcedure [dbo].[SecurityToken_SelectByToken]    Script Date: 6/21/2020 4:48:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SecurityToken_SelectByToken]
	@token nvarchar(200)
AS
BEGIN
	SELECT token, email, dateCreated
	FROM SecurityToken 
	WHERE token = @token
END
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Surrogate Primary Key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Calculation', @level2type=N'COLUMN',@level2name=N'id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'User-friendly name of the calculation - e..g, "LA TDM"' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Calculation', @level2type=N'COLUMN',@level2name=N'name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Optional description of the calculation''s purpose' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Calculation', @level2type=N'COLUMN',@level2name=N'description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indicates that the calculation is obsolete if true' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Calculation', @level2type=N'COLUMN',@level2name=N'deprecated'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Date calculation was entered' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Calculation', @level2type=N'COLUMN',@level2name=N'dateCreated'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Date calculation was last modified' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Calculation', @level2type=N'COLUMN',@level2name=N'dateModified'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Header record for a set of rules that define a calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Calculation'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Surrogate Primary Key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationPanel', @level2type=N'COLUMN',@level2name=N'Id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'FK to the parent calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationPanel', @level2type=N'COLUMN',@level2name=N'calculationId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Name of the panel as it should appear in the UI' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationPanel', @level2type=N'COLUMN',@level2name=N'name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'CSS Class name used to render the panel in the UI' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationPanel', @level2type=N'COLUMN',@level2name=N'cssClass'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Determines how panels are sorted when rendered in the UI' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationPanel', @level2type=N'COLUMN',@level2name=N'displayOrder'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A UI Panel for grouping / sorting related rules in a calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationPanel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Surrogate Primary Key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'FK to parent calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'calculationId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Mnemonic code that uniquely identifes the rule within the calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'code'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Name of the rule as it should appear in the UI' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Category identifying the rule as input, measure or calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'category'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Data Type of the rule: string, textarea, boolean, number, choice to determine what UI component is  used  to render the rule' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'dataType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Applicable units for the value' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'units'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'For input or measure the input value, for a calculation, the  result of the calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'value'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'JavaScript snippet used to calculate the value of a calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'functionBody'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Number that controls the sort order of rules in the UI' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'displayOrder'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indicates that the rule is obsolete if true' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'inactive'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'FK identifying which CalculationPanel the rules should appear on' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'calculationPanelId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Set to true to force rule to be rendered in UI, even if not need for calculation. ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'used'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Javascript snippet that should return true if rule should be displayed. Used to selectively show/hide inputs and measures depending on other  rule values (especially land uses)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'displayFunctionBody'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Client-side validation minimum value for numeric dataType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'minValue'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Client-side validation maximum value for numeric dataType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'maxValue'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'For choice inputs/measures, an array of objects with id and name properties, representing the choice options' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'choices'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'For inputs/measures with a closely related calculation rule, the code of the calculation rule. This allows showing the result of the calculation next to the input or measure int the UI.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'calcCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'If True, client-side validation treats the input/measure as a required field' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'required'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Client-side validation minimum string length for string or text dataType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'minStringLength'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Client-side validation maximum string length for string or text dataType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule', @level2type=N'COLUMN',@level2name=N'maxStringLength'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Each record represents a rule (input, strategy or calculation) that belongs to an overall calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CalculationRule'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Frequently Asked Questions with Answers' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Faq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Surrogate primary key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login', @level2type=N'COLUMN',@level2name=N'id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Users first name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login', @level2type=N'COLUMN',@level2name=N'firstName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Users last name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login', @level2type=N'COLUMN',@level2name=N'lastName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Users email address - also used as a unique user name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login', @level2type=N'COLUMN',@level2name=N'email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Date the row was created' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login', @level2type=N'COLUMN',@level2name=N'dateCreated'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indicates that users email address has been confirmed. Must be true for user to be allowed to log in.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login', @level2type=N'COLUMN',@level2name=N'emailConfirmed'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'True if the user is granted Administrator rights' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login', @level2type=N'COLUMN',@level2name=N'isAdmin'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Hashed version of the users password' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login', @level2type=N'COLUMN',@level2name=N'passwordHash'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'True is user has been granted Security Administrator rights' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login', @level2type=N'COLUMN',@level2name=N'isSecurityAdmin'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Represents a user account' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Login'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Surrogate Primary Key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'User-Assigned Name of the Project' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Project Address' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'address'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'JSON representation of the calculation input and measure values as an array of objects with code and value  properties' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'formInputs'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Date and time the project was first saved' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'dateCreated'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Date and time the project was most recently modified' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'dateModified'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'FK to Login record of the user who first saved the project' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'loginId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'FK to the calculation used for the project' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'calculationId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Optional textual description of the project, which the user can use for their own purposes' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project', @level2type=N'COLUMN',@level2name=N'description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Each record represent a real estate project, along with the inputs and strategy values for it''s TDM calculation' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Project'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Used internally by the authentication and authorization system to validate email confirmations, etc.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SecurityToken'
GO
USE [master]
GO
ALTER DATABASE [tdmdev] SET  READ_WRITE 
GO
