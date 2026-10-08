const getCalculationVersion = (p, calculations) =>
  calculations?.[p.calculationId]?.version ?? "Beta";

const getDateOnly = date => {
  const dateOnly = new Date(date).toDateString();
  return new Date(dateOnly);
};

// Intended to be a comparison function for sorting objects based on any of the
// properties used  by any of the grids in the application.
// a, b are references to the two obejcts to be  compared.
// orderBy is the string-valued property name of the column to sort by
// calculations is the array of Program Guideline versions, needed for
// sortign by Program Guidelines version.
// Returns a negative number if a should come before b, positive if b should come before a, or 0 if they are equal.
export const ascCompareBy = (a, b, orderBy, calculations) => {
  let projectA, projectB;

  if (orderBy === "VERSION_NO") {
    projectA = JSON.parse(a.formInputs).VERSION_NO
      ? JSON.parse(a.formInputs).VERSION_NO
      : "undefined";
    projectB = JSON.parse(b.formInputs).VERSION_NO
      ? JSON.parse(b.formInputs).VERSION_NO
      : "undefined";
  } else if (orderBy === "BUILDING_PERMIT") {
    projectA = JSON.parse(a.formInputs).BUILDING_PERMIT
      ? JSON.parse(a.formInputs).BUILDING_PERMIT
      : "undefined";
    projectB = JSON.parse(b.formInputs).BUILDING_PERMIT
      ? JSON.parse(b.formInputs).BUILDING_PERMIT
      : "undefined";
  } else if (orderBy === "dateHidden" || orderBy === "dateSnapshotted") {
    // date fields that are just sorted by null, then not null, instead of being
    // treated like date values
    projectA = a[orderBy] ? 1 : 0;
    projectB = b[orderBy] ? 1 : 0;
  } else if (
    orderBy === "dateCreated" ||
    orderBy === "dateModified" ||
    orderBy === "dateTrashed" ||
    orderBy === "dateSubmitted" ||
    orderBy === "dateStatus" ||
    orderBy === "dateAssigned" ||
    orderBy === "dateInvoicePaid" ||
    orderBy === "dateCoO" ||
    orderBy === "dateModifiedAdmin"
  ) {
    // date fields - falsy values are treated as "2000-01-01" to sort first
    // These are represented as ISO-formatted date strings w/o time, so
    // they can be sorted lexicographically like strings.
    projectA = a[orderBy] ? a[orderBy] : "2000-01-01";
    projectB = b[orderBy] ? b[orderBy] : "2000-01-01";
    // } else if (orderBy === "dro") {
    //   projectA = a.droName ? a.droName.toLowerCase() : null;
    //   projectB = b.droName ? b.droName.toLowerCase() : null;
    // } else if (orderBy === "adminNotes") {
    //   projectA = a.adminNotes ? a.adminNotes.toLowerCase() : null;
    //   projectB = b.adminNotes ? b.adminNotes.toLowerCase() : null;
    // } else if (orderBy === "id") {
    //   projectA = a.id !== undefined && a.id !== null ? a.id : null;
    //   projectB = b.id !== undefined && b.id !== null ? b.id : null;
  } else if (orderBy === "calculationId") {
    const aVal = getCalculationVersion(a, calculations);
    const bVal = getCalculationVersion(b, calculations);

    if (aVal === bVal) return 0;

    if (aVal === "Beta") return 1;
    if (bVal === "Beta") return -1;

    const aParts = String(aVal).split(".").map(Number);
    const bParts = String(bVal).split(".").map(Number);

    const len = Math.max(aParts.length, bParts.length);

    for (let i = 0; i < len; i++) {
      const diff = (aParts[i] ?? 0) - (bParts[i] ?? 0);
      if (diff !== 0) return diff;
    }

    return 0;
  } else if (
    orderBy === "projectLevel" ||
    orderBy === "id" ||
    orderBy === "onHold" ||
    orderBy === "targetPointsMet"
  ) {
    // boolean or number comparison
    projectA = a[orderBy];
    projectB = b[orderBy];
  } else {
    // If we get this far, the field should be a simple string comparison
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

// Intended to be a filter function that handles any of project properties used
// by any of the grids.
// p is project object, criteria is the criteria array, calculations is the
// an array of the Program Guidelines Versions, and fullTextHeaders is an
// array of strings that defines the string-values columns that should be
// used by the text search feature.
export const filter = (p, criteria, calculations, fullTextHeaders) => {
  // Date properties that are filtered by whether they are null or not
  if (criteria.type === "draft" && p.dateSnapshotted) return false;
  if (criteria.type === "snapshot" && !p.dateSnapshotted) return false;
  if (criteria.visibility === "visible" && p.dateHidden) return false;
  if (criteria.visibility === "hidden" && !p.dateHidden) return false;

  // String properties that use a Popup allowing multi-selection from a list

  if (
    criteria.addressList?.length > 0 &&
    !criteria.addressList
      .map(n => n.toLowerCase())
      .includes((p.address || "").toLowerCase())
  ) {
    return false;
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

  try {
    p.alternative = JSON.parse(p["formInputs"]).VERSION_NO
      ? JSON.parse(p["formInputs"]).VERSION_NO
      : "";
  } catch (err) {
    p.alternative = JSON.stringify(err, null, 2);
  }
  if (
    criteria.alternativeList?.length > 0 &&
    !criteria.alternativeList
      .map(n => n.toLowerCase())
      .includes(p.alternative.toLowerCase())
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

  if (
    criteria.assigneeList?.length > 0 &&
    !criteria.assigneeList
      .map(n => n.toLowerCase())
      .includes((p.assignee || "").toLowerCase())
  ) {
    return false;
  }

  if (
    criteria.authorList?.length > 0 &&
    !criteria.authorList
      .map(n => n.toLowerCase())
      .includes(p.author.toLowerCase())
  ) {
    return false;
  }

  if (
    criteria.calculationIdList?.length > 0 &&
    !criteria.calculationIdList.includes(
      calculations?.[p.calculationId]?.version ?? "Beta"
    )
  ) {
    return false;
  }

  if (criteria.droNameList.length > 0) {
    const droNames = criteria.droNameList.map(n => n.toLowerCase());
    const projectDroName = (p.droName || "-").toLowerCase();

    if (!droNames.includes(projectDroName)) {
      return false;
    }
  }

  if (criteria.idList?.length > 0 && !criteria.idList.includes(p.id)) {
    return false;
  }

  if (
    criteria.idFormattedList?.length > 0 &&
    !criteria.idFormattedList.includes(p.idFormatted)
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
    criteria.nameList?.length > 0 &&
    !criteria.nameList.map(n => n.toLowerCase()).includes(p.name.toLowerCase())
  ) {
    return false;
  }

  if (
    criteria.projectLevelList?.length > 0 &&
    !criteria.projectLevelList.includes(p.projectLevel)
  ) {
    return false;
  }

  if (
    criteria.projectNameList?.length > 0 &&
    !criteria.projectNameList
      .map(n => n.toLowerCase())
      .includes((p.projectName || "").toLowerCase())
  ) {
    return false;
  }

  // Normal date range filtering
  if (
    criteria.startDateCreated &&
    getDateOnly(p.dateCreated) < getDateOnly(criteria.startDateCreated)
  )
    return false;
  if (
    criteria.endDateCreated &&
    getDateOnly(p.dateCreated) > getDateOnly(criteria.endDateCreated)
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
    criteria.startDateModified &&
    getDateOnly(p.dateModified) < getDateOnly(criteria.startDateModified)
  )
    return false;
  if (
    criteria.endDateModified &&
    getDateOnly(p.dateModified) > getDateOnly(criteria.endDateModified)
  )
    return false;

  if (
    criteria.startDateModifiedAdmin &&
    getDateOnly(p.dateModifiedAdmin) <
      getDateOnly(criteria.startDateModifiedAdmin)
  )
    return false;

  if (
    criteria.endDateModifiedAdmin &&
    getDateOnly(p.dateModifiedAdmin) >
      getDateOnly(criteria.endDateModifiedAdmin)
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
    criteria.startDateTrashed &&
    getDateOnly(p.dateTrashed) < getDateOnly(criteria.startDateTrashed)
  )
    return false;
  if (
    criteria.endDateTrashed &&
    getDateOnly(p.dateTrashed) > getDateOnly(criteria.endDateTrashed)
  )
    return false;

  // Boolean Properties
  if (criteria.onHold !== null && p.onHold != criteria.onHold) return false;

  // Full Text Filter - fullTextHeaders are header id strings of propertied to
  // include, which should be strng-valued properties.
  if (criteria.filterText && criteria.filterText !== "") {
    return fullTextHeaders.some(id => {
      let colValue = String(p[id]).toLowerCase();
      return colValue.includes(criteria.filterText.toLowerCase());
    });
  }

  return true;
};
