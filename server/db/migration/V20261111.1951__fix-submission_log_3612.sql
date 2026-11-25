CREATE OR ALTER PROC ProjectLog_SelectByProjectId
   @projectId int,
   @loginId int
AS
BEGIN
DECLARE @MaxInt INT = 2147483647;

	SELECT 
		pl.id as id
		, pl.projectId
		, pl.droId
		, d.name as droName
		, pl.adminNotes
		, pl.dateModifiedAdmin
		, pl.loginIdAssigned
		, la.firstName as assignedFirstName
		, la.lastName as assignedLastName
		, pl.dateAssigned
		, pl.invoiceStatusId
		, istat.name as invoiceStatusName
		, pl.dateInvoicePaid
		, pl.onHold
		, pl.approvalStatusId
		, astat.name as approvalStatusName
		, pl.dateCoO
		, pl.dateStatus
		, pl.loginIdStatus
		, ls.firstName as statusFirstName
		, ls.LastName as statusLastName
  FROM ProjectLog pl
  LEFT JOIN Login ls ON pl.loginIdStatus = ls.id
  LEFT JOIN Login la ON pl.loginIdAssigned = la.id
  LEFT JOIN Dro d ON pl.droId = d.id
  LEFT JOIN ApprovalStatus astat on pl.approvalStatusId = astat.id
  LEFT Join InvoiceStatus istat on pl.invoiceStatusId = istat.id
  WHERE pl.projectId = @projectId
	AND EXISTS (SELECT 1 FROM Login l WHERE l.id = @loginId and l.isAdmin = 1) 
	/* Want to also include current project values */
  UNION
  	SELECT 
		@MaxInt as id
		, p.id as projectId
		, p.droId
		, d.name as droName
		, p.adminNotes
		, p.dateModifiedAdmin
		, p.loginIdAssigned
		, la.firstName as assignedFirstName
		, la.lastName as assignedLastName
		, p.dateAssigned
		, p.invoiceStatusId
		, istat.name as invoiceStatusName
		, p.dateInvoicePaid
		, p.onHold
		, p.approvalStatusId
		, astat.name as approvalStatusName
		, p.dateCoO
		, p.dateStatus
		, p.loginIdStatus
		, ls.firstName as statusFirstName
		, ls.LastName as statusLastName
  FROM Project p
  LEFT JOIN Login ls ON p.loginIdStatus = ls.id
  LEFT JOIN Login la ON p.loginIdAssigned = la.id
  LEFT JOIN Dro d ON p.droId = d.id
  LEFT JOIN ApprovalStatus astat on p.approvalStatusId = astat.id
  LEFT Join InvoiceStatus istat on p.invoiceStatusId = istat.id
  WHERE p.id = @projectId
	AND EXISTS (SELECT 1 FROM Login l WHERE l.id = @loginId and l.isAdmin = 1)
  ORDER BY id DESC

END
GO


