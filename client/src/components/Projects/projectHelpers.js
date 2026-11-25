// Keep the values stable: sharing criteria are saved in session storage.
// A shallow freeze is sufficient because all the values are strings.
export const SHARING_STATUS = Object.freeze({
  NOT_SHARED: "notShared",
  SHARED_BY_ME: "sharedByMe",
  SHARED_WITH_ME: "sharedWithMe"
});

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
