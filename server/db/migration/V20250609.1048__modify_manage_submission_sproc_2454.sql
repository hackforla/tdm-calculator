
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
		, ls.firstName as statuserFirstName
		, ls.lastName as statuserLastName
		, p.droId 
		, d.name as droName
		, p.loginIdAssigned
		, la.firstName as assigneeFirstName
		, la.lastName as assigneeLastName
		, p.dateAssigned
		, p.invoiceStatusId
		, i.name as invoiceStatusName
		, p.dateInvoicePaid
		, p.onHold
		, p.approvalStatusId
		, a.name as approvalStatusName
		, p.dateCoO
		, p.dateTrashed
		, p.dateSnapshotted
		, p.adminNotes
		, p.dateModifiedAdmin
		, p.loginId
		, author.firstName as authorFirstName
		, author.lastName as authorLastName
		, author.email as authorEmail
    FROM Project p
		LEFT JOIN ProjectHidden ph ON ph.projectId = p.id AND ph.loginId = @loginId
		JOIN Login author ON p.loginId = author.id
		LEFT JOIN Login ls ON p.loginIdStatus = ls.id
		LEFT JOIN Login la ON p.loginIdAssigned = la.id
		LEFT JOIN Dro d on p.droId = d.id
		LEFT JOIN InvoiceStatus i on p.invoiceStatusId = i.id
		LEFT JOIN ApprovalStatus a on p.approvalStatusId = a.id
    WHERE p.dateSubmitted IS NOT NULL -- IS a Submission
		AND p.dateTrashed IS NULL -- IS NOT deleted
		AND ph.dateCreated IS NULL -- IS NOT hidden
		AND EXISTS (SELECT 1 FROM Login WHERE id = @loginId AND isAdmin = 1)
END
GO

CREATE OR ALTER  PROC [dbo].[ProjectSubmission_SelectAdmin]
   @loginId int = null, -- loginId of Admin user
   @projectId int = null -- optional, null returns all
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
		, ls.firstName as statuserFirstName
		, ls.lastName as statuserLastName
		, p.droId 
		, d.name as droName
		, p.loginIdAssigned
		, la.firstName as assigneeFirstName
		, la.lastName as assigneeLastName
		, p.dateAssigned
		, p.invoiceStatusId
		, i.name as invoiceStatusName
		, p.dateInvoicePaid
		, p.onHold
		, p.approvalStatusId
		, a.name as approvalStatusName
		, p.dateCoO
		, p.dateTrashed
		, p.dateSnapshotted
		, p.adminNotes
		, p.dateModifiedAdmin
		, p.loginId
		, author.firstName as authorFirstName
		, author.lastName as authorLastName
		, author.email as authorEmail
    FROM Project p
		LEFT JOIN ProjectHidden ph ON ph.projectId = p.id AND ph.loginId = @loginId
		JOIN Login author ON p.loginId = author.id
		LEFT JOIN Login ls ON p.loginIdStatus = ls.id
		LEFT JOIN Login la ON p.loginIdAssigned = la.id
		LEFT JOIN Dro d on p.droId = d.id
		LEFT JOIN InvoiceStatus i on p.invoiceStatusId = i.id
		LEFT JOIN ApprovalStatus a on p.approvalStatusId = a.id
    WHERE p.dateSubmitted IS NOT NULL -- IS a Submission
		AND p.dateTrashed IS NULL -- IS NOT deleted
		AND ph.dateCreated IS NULL -- IS NOT hidden
		AND EXISTS (SELECT 1 FROM Login WHERE id = @loginId AND isAdmin = 1)
		AND (@projectId IS NULL OR p.id = @projectId)
END
GO


