const getDateOnly = date => {
  const dateOnly = new Date(date).toDateString();
  return new Date(dateOnly);
};

export const ascCompareBy = (a, b, orderBy) => {
  let projectA, projectB;

  if (orderBy === "projectLevel" || orderBy === "id" || orderBy === "onHold") {
    projectA = a[orderBy];
    projectB = b[orderBy];
  } else if (
    orderBy === "dateSubmitted" ||
    orderBy === "dateCreated" ||
    orderBy === "dateStatus" ||
    orderBy === "dateAssigned" ||
    orderBy === "dateInvoicePaid" ||
    orderBy === "dateCoO" ||
    orderBy === "dateSnapshotted" ||
    orderBy === "dateModifiedAdmin"
  ) {
    projectA = a[orderBy] ? a[orderBy] : "2000-01-01";
    projectB = b[orderBy] ? b[orderBy] : "2000-01-01";
  } else if (orderBy === "adminNotes") {
    projectA = a.adminNotes ? a.adminNotes.toLowerCase() : null;
    projectB = b.adminNotes ? b.adminNotes.toLowerCase() : null;
  } else {
    projectA = a[orderBy] ? a[orderBy].toLowerCase() : "";
    projectB = b[orderBy] ? b[orderBy].toLowerCase() : "";
  }

  if (projectA === null && projectB === null) {
    return 0;
  } else if (projectA === null) {
    return 1; // null values are greater
  } else if (projectB === null) {
    return -1;
  } else {
    if (projectA < projectB) {
      return -1;
    } else if (projectA > projectB) {
      return 1;
    } else {
      return 0;
    }
  }
};

export const filter = (p, criteria) => {
  if (
    criteria.nameList.length > 0 &&
    !criteria.nameList.map(n => n.toLowerCase()).includes(p.name.toLowerCase())
  ) {
    return false;
  }

  if (
    criteria.addressList.length > 0 &&
    !criteria.addressList
      .map(n => n.toLowerCase())
      .includes(p.address.toLowerCase())
  ) {
    return false;
  }

  if (
    criteria.authorList.length > 0 &&
    !criteria.authorList
      .map(n => n.toLowerCase())
      .includes(p.author.toLowerCase())
  ) {
    return false;
  }

  if (
    criteria.assigneeList.length > 0 &&
    !criteria.assigneeList
      .map(n => n.toLowerCase())
      .includes(p.assignee.toLowerCase())
  ) {
    return false;
  }

  if (
    criteria.invoiceStatusNameList?.length > 0 &&
    !criteria.invoiceStatusNameList
      .map(n => n.toLowerCase())
      .includes(p.invoiceStatusName.toLowerCase())
  ) {
    return false;
  }

  if (
    criteria.approvalStatusNameList?.length > 0 &&
    !criteria.approvalStatusNameList
      .map(n => n.toLowerCase())
      .includes(p.approvalStatusName.toLowerCase())
  ) {
    return false;
  }

  if (criteria.idList?.length > 0 && !criteria.idList.includes(p.id)) {
    return false;
  }

  if (
    criteria.projectLevelList?.length > 0 &&
    !criteria.projectLevelList.includes(p.projectLevel)
  ) {
    return false;
  }

  if (
    criteria.startDateSubmitted &&
    getDateOnly(p.dateSubmitted) < getDateOnly(criteria.startDateSubmitted)
  )
    return false;
  if (
    criteria.endDateSubmitted &&
    getDateOnly(p.dateSubmitted) > getDateOnly(criteria.endDateSubmitted)
  )
    return false;
  if (
    criteria.startDateStatus &&
    getDateOnly(p.dateStatus) < getDateOnly(criteria.startDateStatus)
  )
    return false;
  if (
    criteria.endDateStatus &&
    getDateOnly(p.dateStatus) > getDateOnly(criteria.endDateStatus)
  )
    return false;

  if (
    criteria.startDateInvoice &&
    getDateOnly(p.dateInvoice) < getDateOnly(criteria.startDateInvoice)
  )
    return false;
  if (
    criteria.endDateInvoice &&
    getDateOnly(p.dateInvoice) > getDateOnly(criteria.endDateInvoice)
  )
    return false;

  if (
    criteria.startDateSnapshotted &&
    getDateOnly(p.dateSnapshotted) < getDateOnly(criteria.startDateSnapshotted)
  )
    return false;
  if (
    criteria.endDateSnapshotted &&
    getDateOnly(p.dateSnapshotted) > getDateOnly(criteria.endDateSnapshotted)
  )
    return false;

  if (
    criteria.startDateCoO &&
    getDateOnly(p.dateCoO) < getDateOnly(criteria.startDateCoO)
  )
    return false;
  if (
    criteria.endDateCoO &&
    getDateOnly(p.dateCoO) > getDateOnly(criteria.endDateCoO)
  )
    return false;

  if (
    criteria.startDateSubmitted &&
    getDateOnly(p.dateSubmitted) <= getDateOnly(criteria.startDateSubmitted)
  )
    return false;
  if (
    criteria.endDateSubmitted &&
    getDateOnly(p.dateSubmitted) >= getDateOnly(criteria.endDateSubmitted)
  )
    return false;
  if (criteria.onHold !== null && p.onHold != criteria.onHold) return false;

  if (criteria.droNameList.length > 0) {
    const droNames = criteria.droNameList.map(n => n.toLowerCase());
    const projectDroName = (p.droName || "-").toLowerCase();

    if (!droNames.includes(projectDroName)) {
      return false;
    }
  }

  if (
    criteria.adminNotesList.length > 0 &&
    !criteria.adminNotesList
      .map(n => n.toLowerCase())
      .includes(
        p.adminNotes ? p.adminNotes.toLowerCase() : "eowurqoieuroiwutposi"
      )
  ) {
    return false;
  }

  if (criteria.filterText && criteria.filterText !== "") {
    let ids = ["name", "address", "author", "assignee"];

    return ids.some(id => {
      let colValue = String(p[id]).toLowerCase();
      return colValue.includes(criteria.filterText.toLowerCase());
    });
  }

  return true;
};
