
if not exists (select * from sysobjects where name='InvoiceStatus' and xtype='U')
CREATE TABLE InvoiceStatus(
	id int NOT NULL,
	name nvarchar(50) NOT NULL,
	displayOrder int NOT NULL,
	description nvarchar(50) NULL,
	PRIMARY KEY CLUSTERED (id ASC)
)
GO

IF (SELECT COUNT(*) FROM InvoiceStatus) = 0
BEGIN
	INSERT INTO InvoiceStatus
           ([id]
           ,[name]
           ,[displayOrder]
           ,[description])
     VALUES
           (1, 'Not Sent', 10, 'Invoice Not Generated'),
		   (2, 'Sent', 20, 'Invoice Sent'),
		   (3, 'Paid', 30, 'Invoice Paid')
           
END

GO
if not exists (select * from sysobjects where name='ApprovalStatus' and xtype='U')
CREATE TABLE ApprovalStatus(
	id int NOT NULL,
	name nvarchar(50) NOT NULL,
	displayOrder int NOT NULL,
	description nvarchar(50) NULL,
	PRIMARY KEY CLUSTERED (id ASC)
)
GO

IF (SELECT COUNT(*) FROM ApprovalStatus) = 0
BEGIN
	INSERT INTO ApprovalStatus
           ([id]
           ,[name]
           ,[displayOrder]
           ,[description])
     VALUES
           (1, 'Pending', 10, 'Pending'),
		   (2, 'Terminated', 20, 'Terminated'),
		   (3, 'Withdrawn', 30, 'Withdrawn'),
		   (4, 'Denied', 40, 'Denied'),
		   (5, 'Approved', 50, 'Approved'),
		   (6, 'Approved with Conditions', 60, 'Approved with Conditions')
           
END

GO
ALTER TABLE Project 
	ADD loginIdAssigned int null,
	dateAssigned datetime2(7) null,
	invoiceStatusId int not null default 1,
	dateInvoicePaid datetime2(7) null,
	onHold bit DEFAULT 0 not null,
	approvalStatusId int not null default 1,
	dateCoO datetime2(7) null,
	dateStatus datetime2(7) null,
	loginIdStatus int null,
	CONSTRAINT FK_Project_InvoiceStatus FOREIGN KEY (invoiceStatusId)
	 REFERENCES InvoiceStatus(id),
	CONSTRAINT FK_Project_ApprovalStatus FOREIGN KEY (approvalStatusId)
	 REFERENCES ApprovalStatus(id),
	CONSTRAINT FK_Project_LoginAssigned FOREIGN KEY (loginIdAssigned)
	 REFERENCES Login(id),
	CONSTRAINT FK_Project_LoginStatus FOREIGN KEY (loginIdStatus)
	 REFERENCES Login(id)

GO

GO
CREATE TABLE ProjectLog (
	id int IDENTITY(1,1) NOT NULL,
	projectId int not null,
	droId int null,
	adminNotes nvarchar(max) null,
	dateModifiedAdmin datetime2(7) null,
	loginIdAssigned int null,
	dateAssigned datetime2(7) null,
	invoiceStatusId int null,
	dateInvoicePaid datetime2(7) null,
	onHold bit DEFAULT 0 not null,
	approvalStatusId int null,
	dateCoO datetime2(7) null,
	dateStatus datetime2(7) null,
	loginIdStatus int null,
	CONSTRAINT FK_ProjectLog_Project FOREIGN KEY (projectId)
	 REFERENCES Project(id)
)

GO
CREATE OR ALTER PROC [dbo].[ProjectSubmission_SelectByLoginId]
   @loginId int = null
AS
BEGIN
/* 
	This is used to populate the Submissions page, which displays
	the status of projects submitted by a particular user
*/
    SELECT
        p.id
		, p.name
		, p.address
		, p.projectLevel
		, p.dateSubmitted
		, p.dateStatus
		, p.loginIdStatus
		, ls.firstName as statusFirstName
		, ls.LastName as statusLastName
		, p.projectLevel
		, p.droId 
		, p.loginIdAssigned
		, la.firstName as assignedFirstName
		, la.lastName as assignedLastName
		, p.dateAssigned
		, p.invoiceStatusId
		, p.dateInvoicePaid
		, p.onHold
		, p.approvalStatusId
		, p.dateCoO
		, p.dateTrashed
		, p.dateSnapshotted
    FROM Project p
    JOIN Login author ON p.loginId = author.id
	LEFT JOIN Login ls ON p.loginIdStatus = ls.id
	LEFT JOIN Login la ON p.loginIdAssigned = ls.id
    WHERE author.id = @loginId
	AND p.dateSubmitted IS NOT NULL
	AND p.dateTrashed IS NULL
END
GO

GO
CREATE OR ALTER PROC [dbo].[ProjectSubmission_SelectAdmin]
   @loginId int = null -- loginId of Admin user
AS
BEGIN
/* 
	This is used to populate the Submission/Snapshot Admin page, 
	which allows an admin to view and process submitted snapshots.
*/
	
    SELECT
        p.id
		, p.name
		, p.address
		, p.projectLevel
		, p.dateSubmitted
		, p.dateStatus
		, p.loginIdStatus
		, ls.firstName as statusFirstName
		, ls.LastName as statusLastName
		, p.projectLevel
		, p.droId 
		, p.loginIdAssigned
		, la.firstName as assignedFirstName
		, la.lastName as assignedLastName
		, p.dateAssigned
		, p.invoiceStatusId
		, p.dateInvoicePaid
		, p.onHold
		, p.approvalStatusId
		, p.dateCoO
		, p.dateTrashed
		, p.dateSnapshotted
		, p.adminNotes
		, p.dateModifiedAdmin
		, p.loginId
		, author.firstName as authorFirstName
		, author.lastName as authorLastName
    FROM Project p
		LEFT JOIN ProjectHidden ph ON ph.projectId = p.id AND ph.loginId = @loginId
		JOIN Login author ON p.loginId = author.id
		LEFT JOIN Login ls ON p.loginIdStatus = ls.id
		LEFT JOIN Login la ON p.loginIdAssigned = ls.id
    WHERE p.dateSubmitted IS NOT NULL -- IS a Submission
		AND p.dateTrashed IS NULL -- IS NOT deleted
		AND ph.dateCreated IS NULL -- IS NOT hidden
		AND EXISTS (SELECT 1 FROM Login WHERE id = @loginId AND isAdmin = 1)
END
GO

GO
CREATE OR ALTER PROC [dbo].[ProjectSubmission_Update]
@projectId int,
@loginId int, -- loginId of Admin user making change
@droId int,
@adminNotes nvarchar(max),
@dateModifiedAdmin datetime2(7),
@loginIdAssigned int,
@dateAssigned datetime2(7),
@invoiceStatusId int,
@dateInvoicePaid datetime2(7),
@onHold bit,
@approvalStatusId int,
@dateCoO datetime2(7)
AS
BEGIN
/* 
	This is used to update the status of submitted snapshots by 
	an admin.
*/
DECLARE @adminNotesUnchanged INT
DECLARE @dateModifiedAdminNew datetime2(7)

	-- Determine whether adminNotes are being changed
	SELECT @adminNotesUnchanged = COUNT(*) FROM Project 
		WHERE id = @projectId AND adminNotes = @adminNotes
	SELECT @dateModifiedAdminNew = CASE
		WHEN @adminNotesUnchanged = 1 
		THEN @dateModifiedAdmin
		ELSE getutcdate() END

	INSERT INTO ProjectLog
        (projectId
        ,droId
        ,adminNotes
        ,dateModifiedAdmin
        ,loginIdAssigned
        ,dateAssigned
        ,invoiceStatusId
        ,dateInvoicePaid
        ,onHold
        ,approvalStatusId
        ,dateCoO
        ,dateStatus
        ,loginIdStatus)
	SELECT id
        ,droId
        ,adminNotes
        ,dateModifiedAdmin
        ,loginIdAssigned
        ,dateAssigned
        ,invoiceStatusId
        ,dateInvoicePaid
        ,onHold
        ,approvalStatusId
        ,dateCoO
        ,dateStatus
        ,loginIdStatus
	FROM Project
	WHERE id = @projectId

    UPDATE Project SET
		dateStatus = getutcdate()
		, loginIdStatus = @loginId
		, droId = @droId
		, loginIdAssigned = @loginIdAssigned
		, dateAssigned = @dateAssigned
		, invoiceStatusId = @invoiceStatusId
		, dateInvoicePaid = @dateInvoicePaid
		, onHold = @onHold
		, approvalStatusId  = @approvalStatusId
		, dateCoO  = @dateCoO
		, adminNotes = @adminNotes
		, dateModifiedAdmin = @dateModifiedAdminNew
    WHERE id = @projectId

END

GO
CREATE or alter  PROC [dbo].[ProjectLog_SelectByProjectId]
   @projectId int,
   @loginId int
AS
BEGIN

	SELECT 
		pl.id
		, pl.projectId
		, pl.droId
		, pl.adminNotes
		, pl.dateModifiedAdmin
		, pl.loginIdAssigned
		, la.firstName as assignedFirstName
		, la.lastName as assignedLastName
		, pl.dateAssigned
		, pl.invoiceStatusId
		, pl.dateInvoicePaid
		, pl.onHold
		, pl.approvalStatusId
		, pl.dateCoO
		, pl.dateStatus
		, pl.loginIdStatus
		, ls.firstName as statusFirstName
		, ls.LastName as statusLastName
  FROM ProjectLog pl
  LEFT JOIN Login ls ON pl.loginIdStatus = ls.id
		LEFT JOIN Login la ON pl.loginIdAssigned = ls.id
  WHERE pl.projectId = @projectId
	AND EXISTS (SELECT 1 FROM Login l WHERE l.id = @loginId and l.isAdmin = 1)
  ORDER BY pl.id DESC

END

GO