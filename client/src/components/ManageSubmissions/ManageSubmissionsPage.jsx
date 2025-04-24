import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import UserContext from "../../contexts/UserContext";
import { MdOutlineSearch } from "react-icons/md";
import Pagination from "../UI/Pagination";
import ContentContainerNoSidebar from "../Layout/ContentContainerNoSidebar";
import * as projectService from "../../services/project.service";
import SubmissionTableRow from "./SubmissionTableRow";

import UniversalSelect from "../UI/UniversalSelect";
import ProjectTableColumnHeader from "../Projects/ColumnHeaderPopups/ProjectTableColumnHeader";
import Button from "../Button/Button";
import useSessionStorage from "../../hooks/useSessionStorage";
import {
  MANAGE_SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG,
  MANAGE_SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG
} from "../../helpers/Constants";

const DEFAULT_SORT_CRITERIA = [{ field: "dateSubmitted", direction: "desc" }];
const DEFAULT_FILTER_CRITERIA = {
  filterText: "",
  nameList: [],
  addressList: [],
  startDateSubmitted: null,
  endDateSubmitted: null,
  startDateStatus: null,
  endDateStatus: null,
  authorList: [],
  droList: [],
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
  endDateModifiedAdmin: null
};

const useStyles = createUseStyles({
  outerDiv: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyItems: "flex-start"
  },
  contentDiv: {
    flexBasis: "75%",
    flexShrink: 1,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
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
    marginTop: "1em"
  },
  searchBarWrapper: {
    position: "relative",
    alignSelf: "center"
  },
  searchBar: {
    maxWidth: "100%",
    width: "27em",
    padding: "12px 12px 12px 48px",
    marginRight: "0.5rem"
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
  tr: {
    margin: "0.5em"
  },
  td: {
    padding: "0.2em",
    textAlign: "left"
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
    margin: "20px 0px",
    height: "calc(100vh - 275px - 11.34em)"
  },
  fixTableHead: {
    overflowY: "auto",
    height: "4em"
  },
  pageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
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
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const projectsPerPage = perPage;
  const isAdmin = userContext.account?.isAdmin || false;
  const [sessionFilterCriteria, setSessionFilterCriteria] = useSessionStorage(
    MANAGE_SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG,
    DEFAULT_FILTER_CRITERIA
  );
  const [sessionSortCriteria, setSessionSortCriteria] = useSessionStorage(
    MANAGE_SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG,
    DEFAULT_SORT_CRITERIA
  );

  useEffect(() => {
    async function fetchData() {
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
            : ""
        };
      });
      setProjects(projects);
    }
    fetchData();
  }, [setProjects]);

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

  const ascCompareBy = (a, b, orderBy) => {
    let projectA, projectB;

    if (orderBy === "projectLevel") {
      projectA = a.projectLevel;
      projectB = b.projectLevel;
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

  const getDateOnly = date => {
    const dateOnly = new Date(date).toDateString();
    return new Date(dateOnly);
  };

  const filter = (p, criteria) => {
    if (
      criteria.nameList.length > 0 &&
      !criteria.nameList
        .map(n => n.toLowerCase())
        .includes(p.name.toLowerCase())
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
      getDateOnly(p.dateSnapshotted) <
        getDateOnly(criteria.startDateSnapshotted)
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
      criteria.author &&
      !p.author.toLowerCase().includes(criteria.author.toLowerCase())
    )
      return false;

    if (
      criteria.assignee &&
      !p.assignee.toLowerCase().includes(criteria.assignee.toLowerCase())
    )
      return false;

    if (
      criteria.statuser &&
      !p.statuser.toLowerCase().includes(criteria.statuser.toLowerCase())
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

    if (criteria.droList.length > 0) {
      const droNames = criteria.droList.map(n => n.toLowerCase());
      const projectDroName = (p.droName || "").toLowerCase();

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

  const resetFiltersSort = () => {
    setFilter(DEFAULT_FILTER_CRITERIA);
    setSortCriteria(DEFAULT_SORT_CRITERIA);
  };

  const headerData = [
    {
      id: "id",
      label: "ID",
      popupType: null,
      colWidth: "5rem"
    },
    {
      id: "name",
      label: "Project Name",
      popupType: "text",
      colWidth: "22rem"
    },
    {
      id: "address",
      label: "Address",
      popupType: "text",
      colWidth: "22rem"
    },
    {
      id: "projectLevel",
      label: "Level",
      popupType: null,
      colWidth: "5rem"
    },
    {
      id: "dateSubmitted",
      label: "Submitted",
      popupType: "datetime",
      startDatePropertyName: "startDateSubmitted",
      endDatePropertyName: "endDateSubmitted",
      colWidth: "10rem"
    },
    {
      id: "dateStatus",
      label: "Status Dt",
      popupType: "datetime",
      startDatePropertyName: "startDateStatus",
      endDatePropertyName: "endDateStatus",
      colWidth: "10rem"
    },
    { id: "author", label: "Created By", popupType: "text", colWidth: "15rem" },
    { id: "droName", label: "DRO", popupType: null, colWidth: "10rem" },
    { id: "assignee", label: "Assignee", popupType: "text", colWidth: "10rem" },
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
      popupType: "text",
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
    { id: "onHold", label: "On Hold", popupType: null, colWidth: "5rem" },
    {
      id: "approvalStatusName",
      label: "Approval Status",
      popupType: "text",
      colWidth: "12rem"
    },
    {
      id: "dateCoO",
      label: "C of O",
      popupType: "datetime",
      startDatePropertyName: "startDateCoO",
      endDatePropertyName: "endDateCoO",
      colWidth: "10rem"
    },
    {
      id: "dateSnapshotted",
      label: "Snapshot",
      popupType: "datetime",
      startDatePropertyName: "startDateSnapshotted",
      endDatePropertyName: "endDateSnapshotted",
      colWidth: "10rem"
    },
    {
      id: "adminNotes",
      label: "Admin Notes",
      popupType: "text",
      accessor: "adminNotes",
      colWidth: "10rem"
    },
    {
      id: "dateModifiedAdmin",
      label: "Admin Saved",
      popupType: "datetime",
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

  return (
    <ContentContainerNoSidebar contentContainerRef={contentContainerRef}>
      <div className={classes.outerDiv}>
        <div className={classes.contentDiv}>
          <h1 className={classes.pageTitle}>Manage Submissions</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row"
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
                >
                  <div className={classes.searchBarWrapper}>
                    <input
                      className={classes.searchBar}
                      type="search"
                      id="filterText"
                      name="filterText"
                      placeholder="Search by Name; Address; Description; Alt#" // redundant with FilterDrawer
                      value={filterCriteria.filterText}
                      onChange={e => handleFilterTextChange(e.target.value)}
                    />
                    <MdOutlineSearch className={classes.searchIcon} />
                  </div>
                </div>

                <div
                  style={{
                    paddingRight: "1.5em",
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
                                    sortCriteria[sortCriteria.length - 1]
                                      .direction
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
                            isAdmin={isAdmin}
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
