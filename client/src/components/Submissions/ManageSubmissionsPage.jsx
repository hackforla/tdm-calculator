import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

import UserContext from "../../contexts/UserContext";
import { MdOutlineSearch } from "react-icons/md";
import Pagination from "../UI/Pagination";
import ContentContainerNoSidebar from "../Layout/ContentContainerNoSidebar";
import * as projectService from "../../services/project.service";
import * as accountService from "../../services/account.service";
import { ascCompareBy, filter } from "./SubmissionUtil";

import UniversalSelect from "../UI/UniversalSelect";
import ProjectTableColumnHeader from "../Projects/ColumnHeaderPopups/ProjectTableColumnHeader";
import SubmissionTableRow from "./SubmissionTableRow";
import Button from "../Button/Button";
import useSessionStorage from "../../hooks/useSessionStorage";
import {
  MANAGE_SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG,
  MANAGE_SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG
} from "../../helpers/Constants";

const DEFAULT_SORT_CRITERIA = [{ field: "name", direction: "asc" }];
const DEFAULT_FILTER_CRITERIA = {
  filterText: "",
  idList: [],
  nameList: [],
  addressList: [],
  projectLevelList: [],
  startDateSubmitted: null,
  endDateSubmitted: null,
  startDateStatus: null,
  endDateStatus: null,
  authorList: [],
  droNameList: [],
  assigneeList: [],
  startDateAssigned: null,
  endDateAssigned: null,
  invoiceStatusNameList: [],
  startDateInvoicePaid: null,
  endDateInvoicePaid: null,
  approvalStatusNameList: [],
  startDateCoO: null,
  endDateCoO: null,
  startDateSnapshot: null,
  endDateSnapshot: null,
  adminNotesList: [],
  startDateModifiedAdmin: null,
  endDateModifiedAdmin: null,
  onHold: null
};

const useStyles = createUseStyles({
  filter: {
    overflow: "hidden",
    flexBasis: "18rem",
    flexShrink: 0,
    flexGrow: 0,
    transition: "flex-basis 1s ease-in-out"
  },
  filterCollapsed: {
    overflow: "hidden",
    flexBasis: "1%",
    flexShrink: 0,
    flexGrow: 0,
    transition: "flex-basis 0.5s ease-in-out"
  },
  pageTitle: {
    marginTop: 0,
    marginBottom: "0rem"
  },
  searchBarWrapper: {
    position: "relative",
    alignSelf: "center"
  },
  searchBar: {
    maxWidth: "100%",
    width: "27rem",
    padding: "12px 12px 12px 48px"
    // marginRight: "0.5rem"
  },
  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "10px",
    height: "28px",
    width: "28px"
  },
  tableAdmin: {
    minWidth: "135rem",
    width: "100%",
    tableLayout: "fixed"
  },
  table: {
    minWidth: "110rem",
    width: "100%",
    tableLayout: "fixed"
  },
  thead: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    fontWeight: "bold",
    backgroundColor: "#002E6D",
    color: "white",
    "& td": {
      padding: "12px"
    }
  },
  theadLabel: {
    cursor: "pointer"
  },
  tr: {
    margin: "0.5em"
  },
  td: {
    padding: "0.2em",
    textAlign: "left",
    width: "5%"
  },
  tdRightAlign: {
    padding: "0.2em",
    textAlign: "right"
  },
  tdCenterAlign: {
    padding: "0.2em",
    textAlign: "center"
  },

  labelSpan: {
    display: "inline-flex" // fix arrow
  },
  sortArrow: {
    marginLeft: "8px",
    verticalAlign: "baseline"
  },
  tbody: {
    background: "#F9FAFB",
    "& tr": {
      borderBottom: "1px solid #E7EBF0"
    },
    "& tr td": {
      padding: "12px",
      verticalAlign: "top"
    },
    "& tr:hover": {
      background: "#B2C0D3"
    }
  },
  tdNoSavedProjects: {
    textAlign: "center"
  },
  tableContainer: {
    overflow: "auto", // changed to allow Universal Select to show above the page container when expanded
    width: "calc(100vw - 20px)",
    margin: "0px 1rem",
    height: "calc(100vh - 175px - 11.34em)"
  },
  fixTableHead: {
    overflowY: "auto",
    height: "4em"
  },
  pageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto"
  },
  dropContent: {
    borderRadius: "4px",
    width: "60px",
    textAlign: "center"
  },
  optionItems: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "silver"
    }
  },
  itemsPerPage: {
    marginLeft: "5px"
  }
});

const ManageSubmissions = ({ contentContainerRef }) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [assigneeList, setAssigneeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const projectsPerPage = perPage;
  const [sessionFilterCriteria, setSessionFilterCriteria] = useSessionStorage(
    MANAGE_SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG,
    DEFAULT_FILTER_CRITERIA
  );
  const [sessionSortCriteria, setSessionSortCriteria] = useSessionStorage(
    MANAGE_SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG,
    DEFAULT_SORT_CRITERIA
  );

  const getProjects = useCallback(async () => {
    const response = await projectService.getSubmissionsAdmin();
    const projects = response.data.map(d => {
      return {
        ...d,
        author: d.authorLastName
          ? `${d.authorLastName}, ${d.authorFirstName}`
          : "",
        assignee: d.assigneeLastName
          ? `${d.assigneeLastName}, ${d.assigneeFirstName}`
          : "",
        statuser: d.statuserLastName
          ? `${d.statuserLastName}, ${d.statuserFirstName}`
          : "",
        droName: d.droName || "-"
      };
    });
    setProjects(projects);
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  useEffect(() => {
    async function fetchData() {
      const response = await accountService.getAllDROAccounts();
      const assignees = [{ value: 0, label: "(unassigned)" }].concat(
        response.data.map(d => {
          return {
            value: d.id,
            label: `${d.lastName}, ${d.firstName}`
          };
        })
      );
      setAssigneeList(assignees);
    }
    fetchData();
  }, []);

  const formatDatesFromCookieStrigify = sessionFilterCriteria => {
    const newFilterCriteria = { ...sessionFilterCriteria };
    const dateProperties = [
      "startDateSubmitted",
      "endDateSubmitted",
      "startDateStatus",
      "endDateStatus",
      "startDateAssigned",
      "endDateAssigned",
      "startDateInvoicePaid",
      "endDateInvoicePaid",
      "startDateCoO",
      "endDateCoO",
      "startDateSnapshotted",
      "endDateSnapshotted",
      "startDateModifiedAdmin",
      "endDateModifiedAdmin"
    ];
    dateProperties.forEach(dateProp => {
      if (sessionFilterCriteria[dateProp] !== null) {
        newFilterCriteria[dateProp] = new Date(sessionFilterCriteria[dateProp]);
      }
    });
    return newFilterCriteria;
  };

  const [sortCriteria, setSortCriteria] = useState(sessionSortCriteria);
  const [filterCriteria, setFilterCriteria] = useState(
    formatDatesFromCookieStrigify(sessionFilterCriteria)
  );

  const perPageOptions = [
    { value: projects.length.toString(), label: "All" },
    { value: "100", label: "100" },
    { value: "50", label: "50" },
    { value: "25", label: "25" },
    { value: "10", label: "10" }
  ];

  const handlePerPageChange = newPerPage => {
    setPerPage(newPerPage);
    const newHighestPage = Math.ceil(sortedProjects.length / newPerPage);

    if (currentPage > newHighestPage) {
      setCurrentPage(1);
    }
  };

  const paginate = pageNumber => {
    const newHighestPage = Math.ceil(sortedProjects.length / perPage);
    if (typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    } else if (pageNumber === "left" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber === "right" && currentPage < newHighestPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getComparator = (order, orderBy) => {
    return order === "asc"
      ? (a, b) => ascCompareBy(a, b, orderBy)
      : (a, b) => -ascCompareBy(a, b, orderBy);
  };

  const setSort = (orderBy, order, isStatus = false) => {
    // If already sorted by the orderBy field, remove that entry from the
    // sort array first
    let newSortCriteria = [];
    if (isStatus) {
      newSortCriteria = sortCriteria.filter(
        c => c.field != "dateSnapshotted" && c.field != "dateTrashed"
      );
      newSortCriteria.push({ field: "dateTrashed", direction: order });
      newSortCriteria.push({ field: "dateSnapshotted", direction: order });
    } else {
      newSortCriteria = sortCriteria.filter(c => c.field != orderBy);
      newSortCriteria.push({ field: orderBy, direction: order });
    }

    // save to local storagr
    setSessionSortCriteria(newSortCriteria);
    // and update the sortCriteria state.
    setSortCriteria(newSortCriteria);
  };

  const setFilter = newFilterCriteria => {
    setSessionFilterCriteria(newFilterCriteria);
    setFilterCriteria(newFilterCriteria);
    setCurrentPage(1);
  };

  const handleFilterTextChange = text => {
    setFilterCriteria(crit => {
      return { ...crit, filterText: text };
    });
    setCurrentPage(1);
  };

  const resetFiltersSort = () => {
    setFilter(DEFAULT_FILTER_CRITERIA);
    setSortCriteria(DEFAULT_SORT_CRITERIA);
  };

  const headerData = [
    {
      id: "contextMenu",
      label: "",
      colWidth: "3rem"
    },
    {
      id: "id",
      label: "ID",
      popupType: "number",
      colWidth: "6rem"
    },
    {
      id: "name",
      label: "Project Name",
      popupType: "string",
      colWidth: "22rem"
    },
    {
      id: "author",
      label: "Created By",
      popupType: "string",
      colWidth: "15rem"
    },
    {
      id: "projectLevel",
      label: "Level",
      popupType: "number",
      colWidth: "8rem"
    },
    { id: "droName", label: "DRO", popupType: "string", colWidth: "10rem" },
    {
      id: "assignee",
      label: "Assignee",
      popupType: "string",
      colWidth: "10rem"
    },
    {
      id: "dateAssigned",
      label: "Assigned",
      popupType: "datetime",
      startDatePropertyName: "startDateAssigned",
      endDatePropertyName: "endDateAssigned",
      colWidth: "10rem"
    },
    {
      id: "invoiceStatusName",
      label: "Invoice Status",
      popupType: "string",
      colWidth: "7rem"
    },
    {
      id: "dateInvoicePaid",
      label: "Invoice Pd",
      popupType: "datetime",
      startDatePropertyName: "startDateInvoicePaid",
      endDatePropertyName: "endDateInvoicePaid",
      colWidth: "10rem"
    },
    { id: "onHold", label: "On Hold", popupType: "boolean", colWidth: "8rem" },
    {
      id: "approvalStatusName",
      label: "Approval Status",
      popupType: "string",
      colWidth: "12rem"
    },
    {
      id: "adminNotes",
      label: "Admin Notes",
      popupType: "text",
      accessor: "adminNotes",
      colWidth: "10rem"
    },
    {
      id: "dateCoO",
      label: "C of O",
      popupType: "datetime",
      startDatePropertyName: "startDateCoO",
      endDatePropertyName: "endDateCoO",
      colWidth: "10rem"
    }
  ];

  const indexOfLastPost = currentPage * projectsPerPage;
  const indexOfFirstPost = indexOfLastPost - projectsPerPage;
  let sortedProjects = projects.filter(p => filter(p, filterCriteria));
  for (let i = 0; i < sortCriteria.length; i++) {
    sortedProjects.sort(
      getComparator(sortCriteria[i].direction, sortCriteria[i].field)
    );
  }
  const currentProjects = sortedProjects.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  document.body.style.overflowX = "hidden"; // prevent page level scrolling, because the table is scrollable

  const handleAdminNoteUpdate = async (projectId, newAdminNote) => {
    try {
      await projectService.updateAdminNotes(projectId, newAdminNote);
      // await updateProjects();
    } catch (error) {
      console.error("Error updating admin notes:", error);
    }
  };

  return (
    <ContentContainerNoSidebar contentContainerRef={contentContainerRef}>
      <h1 className={classes.pageTitle}>Manage Submissions</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          minHeight: "calc(100% - 40px)"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100vw"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "center",
                flexBasis: "33%"
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "center",
                flexBasis: "33%"
              }}
            >
              <div className={classes.searchBarWrapper}>
                <input
                  className={classes.searchBar}
                  type="search"
                  id="filterText"
                  name="filterText"
                  placeholder="Search by Name; Address; Description; Alt#"
                  value={filterCriteria.filterText}
                  onChange={e => handleFilterTextChange(e.target.value)}
                />
                <MdOutlineSearch className={classes.searchIcon} />
              </div>
            </div>

            <div
              style={{
                paddingRight: "1rem",
                display: "flex",
                justifyContent: "flex-end",
                flexBasis: "33%"
              }}
            >
              <Button
                onClick={resetFiltersSort}
                isDisplayed={true}
                variant="tertiary"
              >
                RESET FILTERS/SORT
              </Button>
            </div>
          </div>
          <div>
            <div className={classes.tableContainer}>
              <table
                className={
                  userContext.account?.isAdmin
                    ? classes.tableAdmin
                    : classes.table
                }
              >
                <colgroup>
                  {headerData.map(h => (
                    <col key={h.id} width={h.colWidth} />
                  ))}
                </colgroup>
                <thead className={classes.thead}>
                  <tr className={classes.tr}>
                    {headerData.map(header => {
                      return (
                        <td key={header.id}>
                          <th className={classes.stickyTh}>
                            <ProjectTableColumnHeader
                              projects={projects}
                              filter={filter}
                              header={header}
                              criteria={filterCriteria}
                              setCriteria={setFilter}
                              setSort={setSort}
                              orderBy={
                                sortCriteria[sortCriteria.length - 1].field
                              }
                              order={
                                sortCriteria[sortCriteria.length - 1].direction
                              }
                              setCheckedProjectIds={null}
                              setSelectAllChecked={null}
                              droOptions={null}
                            />
                          </th>
                        </td>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className={classes.tbody}>
                  {currentProjects.length ? (
                    currentProjects.map(project => (
                      <SubmissionTableRow
                        key={project.id}
                        project={project}
                        onAdminNoteUpdate={handleAdminNoteUpdate}
                        assigneeList={assigneeList}
                        onStatusUpdate={getProjects}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className={classes.tdNoSavedProjects}>
                        No Saved Projects
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className={classes.pageContainer}>
            <Pagination
              projectsPerPage={projectsPerPage}
              totalProjects={sortedProjects.length}
              paginate={paginate}
              currentPage={currentPage}
              maxNumOfVisiblePages={5}
            />
            <UniversalSelect
              value={perPage.toString()}
              options={perPageOptions}
              onChange={e => handlePerPageChange(e.target.value)}
              name="perPage"
              className={classes.dropContent}
            />
            <span className={classes.itemsPerPage}>Items per page</span>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(sortCriteria, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(filterCriteria, null, 2)}</pre> */}
      {/* <div>{JSON.stringify(projects, null, 2)}</div> */}
    </ContentContainerNoSidebar>
  );
};

ManageSubmissions.propTypes = {
  contentContainerRef: PropTypes.object
};

export default ManageSubmissions;
