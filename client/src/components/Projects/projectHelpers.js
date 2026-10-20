// Keep the values stable: sharing criteria are saved in session storage.
// A shallow freeze is sufficient because all the values are strings.
export const SHARING_STATUS = Object.freeze({
  NOT_SHARED: "notShared",
  SHARED_BY_ME: "sharedByMe",
  SHARED_WITH_ME: "sharedWithMe"
});

// Add tab-specific columns here rather than adding branches to the criteria
// helper. Columns present in both tabs don't need a rule.
const PROJECT_TAB_CONFIG_COLUMNS = [
  {
    field: "shared",
    visibleIn: ["active"],
    inactiveFilterCriteria: { sharedList: [] }
  },
  {
    field: "dateTrashed",
    visibleIn: ["deleted"],
    inactiveFilterCriteria: {
      startDateTrashed: null,
      endDateTrashed: null
    }
  }
];

// Ignore criteria for columns absent from the current tab without changing saved
// preferences. Switching back restores the user's filters and sorting.
// Return neutral values as well so popups can evaluate their own criteria
// without recalculating the tab's hidden columns.
export const getCriteriaForProjectTab = (
  { filterCriteria = {}, sortCriteria = [] },
  isActiveTab
) => {
  const currentTab = isActiveTab ? "active" : "deleted";
  const hiddenColumns = PROJECT_TAB_CONFIG_COLUMNS.filter(
    column => !column.visibleIn.includes(currentTab)
  );
  const inactiveFilterCriteria = {};

  for (const column of hiddenColumns) {
    for (const [property, neutralValue] of Object.entries(
      column.inactiveFilterCriteria
    )) {
      // Copy list defaults so callers can't accidentally change the config.
      inactiveFilterCriteria[property] = Array.isArray(neutralValue)
        ? [...neutralValue]
        : neutralValue;
    }
  }

  return {
    filterCriteria: { ...filterCriteria, ...inactiveFilterCriteria },
    inactiveFilterCriteria,
    sortCriteria: sortCriteria.filter(
      sort => !hiddenColumns.some(column => column.field === sort.field)
    )
  };
};

// Determine a plan's sharing category relative to the current account.
export const getProjectShareStatus = (project, loginId) => {
  const isShared = (project.shareCount ?? 0) > 0;
  if (!project.dateSnapshotted || project.dateTrashed || !isShared) {
    return SHARING_STATUS.NOT_SHARED;
  }

  if (project.loginId === loginId) return SHARING_STATUS.SHARED_BY_ME;

  return project.isSharedWithMe
    ? SHARING_STATUS.SHARED_WITH_ME
    : SHARING_STATUS.NOT_SHARED;
};
