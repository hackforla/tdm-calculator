CREATE OR ALTER  PROC [dbo].[ProjectSubmission_SelectByLoginId]
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
		, p.projectName
		, p.address
		, p.projectLevel
		, p.dateSubmitted
		, p.dateStatus
		, p.loginIdStatus
		, ls.firstName as statuserFirstName
		, ls.LastName as statuserLastName
		, p.droId 
		, d.name as droName
		, p.loginIdAssigned
		, la.firstName as assignedFirstName
		, la.lastName as assignedLastName
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
		, p.dateCreated
		, p.dateModified
		, p.formInputs
    FROM Project p
    JOIN Login author ON p.loginId = author.id
	LEFT JOIN Login ls ON p.loginIdStatus = ls.id
	LEFT JOIN Login la ON p.loginIdAssigned = la.id
	LEFT JOIN Dro d on p.droId = d.id
	LEFT JOIN InvoiceStatus i on p.invoiceStatusId = i.id
	LEFT JOIN ApprovalStatus a on p.approvalStatusId = a.id
    WHERE author.id = @loginId
	AND p.dateSubmitted IS NOT NULL
	AND p.dateTrashed IS NULL
END
GO


