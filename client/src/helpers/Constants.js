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
  { value: 1, label: "Invoice Not Generated" },
  { value: 2, label: "Sent" },
  { value: 3, label: "Paid" }
];

const approvalStatuses = [
  { value: 1, displayOrder: 10, label: "Pending" },
  { value: 2, displayOrder: 20, label: "Terminated" },
  { value: 3, displayOrder: 30, label: "Withdrawn" },
  { value: 4, displayOrder: 40, label: "Denied" },
  { value: 5, displayOrder: 50, label: "Approved" },
  { value: 6, displayOrder: 60, label: "Approved with Conditions" }
];

const dros = [
  { value: 0, label: "(unassigned)" },
  { value: 1, label: "Central" },
  { value: 2, label: "Valley" },
  { value: 3, label: "West LA" }
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
  approvalStatuses,
  dros
};
