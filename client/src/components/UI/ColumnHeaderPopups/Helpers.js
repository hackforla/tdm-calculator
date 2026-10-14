// Helper functions that implement application-wide sortign and filtering
// for TDM Plan and/or login account properties throughout the application.

// Utilty functions used by exported ascCompareBy and filter functions

export const getSortOrdinal = (header, sortCriteria) => {
  const position = sortCriteria.findIndex(sc => sc.field === header.id);
  return position === -1 ? null : sortCriteria.length - position;
};

const getCalculationVersion = (p, calculations) =>
  calculations?.[p.calculationId]?.version ?? "Beta";

const getDateOnly = date => {
  const dateOnly = new Date(date).toDateString();
  return new Date(dateOnly);
};

const matchesList = (list, value) =>
  !list?.length ||
  list.map(n => n.toLowerCase()).includes((value || "").toLowerCase());

const matchesDateRange = (value, start, end) => {
  if (start && (!value || getDateOnly(value) < getDateOnly(start)))
    return false;
  if (end && (!value || getDateOnly(value) > getDateOnly(end))) return false;
  return true;
};

// Intended to be a comparison function for sorting objects based on any of the
// properties used by any of the grids in the application.
// a, b are references to the two obejcts to be  compared.
// orderBy is the string-valued property name of the column to sort by
// calculations is the array of Program Guideline versions, needed for
//   sorting by Program Guidelines version, (optional, if you don't need to sort by calculationId)
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

  // String properties that use a Popup allowing multi-selection from a list of strings
  // (i.e., headerData dataType property = "string" or "stringList")
  if (
    !matchesList(criteria.addressList, p.address) ||
    !matchesList(criteria.adminNotesList, p.adminNotes) ||
    !matchesList(criteria.alternativeList, p.alternative) ||
    !matchesList(criteria.approvalStatusNameList, p.approvalStatusName) ||
    !matchesList(criteria.assigneeList, p.assignee) ||
    !matchesList(criteria.authorList, p.author) ||
    !matchesList(criteria.droNameList, p.droName) ||
    !matchesList(criteria.idFormattedList, p.idFormatted) ||
    !matchesList(criteria.invoiceStatusNameList, p.invoiceStatusName) ||
    !matchesList(criteria.nameList, p.name) ||
    !matchesList(criteria.projectNameList, p.projectName)
  ) {
    return false;
  }

  // Normal Date Range Filtering
  if (
    !matchesDateRange(
      p.dateCreated,
      criteria.startDateCreated,
      criteria.endDateCreated
    ) ||
    !matchesDateRange(p.dateCoO, criteria.startDateCoO, criteria.endDateCoO) ||
    !matchesDateRange(
      p.dateInvoice,
      criteria.startDateInvoice,
      criteria.endDateInvoice
    ) ||
    !matchesDateRange(
      p.dateModified,
      criteria.startDateModified,
      criteria.endDateModified
    ) ||
    !matchesDateRange(
      p.dateModifiedAdmin,
      criteria.startDateModifiedAdmin,
      criteria.endDateModifiedAdmin
    ) ||
    !matchesDateRange(
      p.dateSnapshotted,
      criteria.startDateSnapshotted,
      criteria.endDateSnapshotted
    ) ||
    !matchesDateRange(
      p.dateStatus,
      criteria.startDateStatus,
      criteria.endDateStatus
    ) ||
    !matchesDateRange(
      p.dateSubmitted,
      criteria.startDateSubmitted,
      criteria.endDateSubmitted
    ) ||
    !matchesDateRange(
      p.dateTrasheds,
      criteria.startDateTrashed,
      criteria.endDateTrashed
    )
  ) {
    return false;
  }

  // Numeric Properties
  if (
    criteria.projectLevelList?.length > 0 &&
    !criteria.projectLevelList.includes(p.projectLevel)
  ) {
    return false;
  }

  // Boolean Properties
  if (criteria.onHold !== null && p.onHold != criteria.onHold) return false;
  if (
    criteria.targetPointsMet !== null &&
    p.targetPointsMet != criteria.targetPointsMet
  )
    return false;

  // Special Case of Program Guidelines Version
  if (
    criteria.calculationIdList?.length > 0 &&
    !criteria.calculationIdList.includes(
      calculations?.[p.calculationId]?.version ?? "Beta"
    )
  ) {
    return false;
  }

  // Full Text Filter - fullTextHeaders are header id strings of properties to
  // include, which should be strng-valued properties.
  if (criteria.filterText && criteria.filterText !== "") {
    return fullTextHeaders.some(id => {
      let colValue = String(p[id]).toLowerCase();
      return colValue.includes(criteria.filterText.toLowerCase());
    });
  }

  return true;
};
