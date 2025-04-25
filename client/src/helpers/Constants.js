const ENABLE_UPDATE_TOTALS = false;

const SORT_CRITERIA_STORAGE_TAG = "myProjectsSortCriteria";
const FILTER_CRITERIA_STORAGE_TAG = "myProjectsFilterCriteria";
const MANAGE_SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG =
  "manageSubmissionsSortCriteria";
const MANAGE_SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG =
  "manageSubmissionsFilterCriteria";
const SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG = "submissionsSortCriteria";
const SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG = "submissionsFilterCriteria";

const invoiceStatuses = [
  { id: 1, name: "Invoice Not Generated" },
  { id: 2, name: "Sent" },
  { id: 3, name: "Paid" }
];

const approvalStatuses = [
  { id: 1, displayOrder: 10, name: "Pending" },
  { id: 2, displayOrder: 20, name: "Terminated" },
  { id: 3, displayOrder: 30, name: "Withdrawn" },
  { id: 4, displayOrder: 40, name: "Denied" },
  { id: 5, displayOrder: 50, name: "Approved" },
  { id: 6, displayOrder: 60, name: "Approved with Conditions" }
];

export {
  ENABLE_UPDATE_TOTALS,
  SORT_CRITERIA_STORAGE_TAG,
  FILTER_CRITERIA_STORAGE_TAG,
  MANAGE_SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG,
  MANAGE_SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG,
  SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG,
  SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG,
  invoiceStatuses,
  approvalStatuses
};
