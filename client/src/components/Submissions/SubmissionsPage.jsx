import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import UserContext from "../../contexts/UserContext";
import { ascCompareBy, filter } from "./SubmissionUtil";
import { Link } from "react-router-dom";
import { MdOutlineSearch, MdCheck } from "react-icons/md";
import Pagination from "../UI/Pagination";
import ContentContainerNoSidebar from "../Layout/ContentContainerNoSidebar";
import * as projectService from "../../services/project.service";
import { formatDate } from "../../helpers/util";

import UniversalSelect from "../UI/UniversalSelect";
import ProjectTableColumnHeader from "../Projects/ColumnHeaderPopups/ProjectTableColumnHeader";
import Button from "../Button/Button";
import useSessionStorage from "../../hooks/useSessionStorage";
import {
  SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG,
  SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG
} from "../../helpers/Constants";
import { Td, TdExpandable } from "./SubmissionTableData";

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

const useStyles = createUseStyles(theme => ({
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
  subheading: {
    ...theme.typography.subHeading,
    // width: "100%",
    lineHeight: "1.2rem",
    marginTop: "0rem",
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
  tr: {
    margin: "0.5em"
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
}));

const SubmissionsPage = ({ contentContainerRef }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const userContext = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const projectsPerPage = perPage;
  const [sessionFilterCriteria, setSessionFilterCriteria] = useSessionStorage(
    SUBMISSIONS_FILTER_CRITERIA_STORAGE_TAG,
    DEFAULT_FILTER_CRITERIA
  );
  const [sessionSortCriteria, setSessionSortCriteria] = useSessionStorage(
    SUBMISSIONS_SORT_CRITERIA_STORAGE_TAG,
    DEFAULT_SORT_CRITERIA
  );

  useEffect(() => {
    async function fetchData() {
      const response = await projectService.getSubmissions();
      const projects = response.data.map(d => {
        return {
          ...d,
          author: d.authorLastName
            ? `${d.authorLastName}, ${d.authorFirstName}`
            : "",
          assignee: d.assignedLastName
            ? `${d.assignedLastName}, ${d.assignedFirstName}`
            : "",
          statuser: d.statuserLastName
            ? `${d.statuserLastName}, ${d.statuserFirstName}`
            : "",
          droName: d.droName || "-"
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
      id: "id",
      label: "ID",
      popupType: "number",
      colWidth: "100px"
    },
    {
      id: "name",
      label: "Project Name",
      popupType: "string",
      colWidth: "206px"
    },
    {
      id: "address",
      label: "Address",
      popupType: "string",
      colWidth: "250px"
    },
    {
      id: "dateSubmitted",
      label: "Date Submitted",
      popupType: "datetime",
      startDatePropertyName: "startDateSubmitted",
      endDatePropertyName: "endDateSubmitted",
      colWidth: "160px"
    },
    {
      id: "dateStatus",
      label: "Status Updated",
      popupType: "datetime",
      startDatePropertyName: "startDateStatus",
      endDatePropertyName: "endDateStatus",
      colWidth: "160px"
    },
    {
      id: "projectLevel",
      label: "Level",
      popupType: "number",
      colWidth: "96px"
    },
    { id: "droName", label: "DRO", popupType: "string", colWidth: "160px" },
    {
      id: "assignee",
      label: "Staff Assigned",
      popupType: "string",
      colWidth: "224px"
    },
    {
      id: "dateAssigned",
      label: "Assigned Date",
      popupType: "datetime",
      startDatePropertyName: "startDateAssigned",
      endDatePropertyName: "endDateAssigned",
      colWidth: "160px"
    },
    {
      id: "invoiceStatusName",
      label: "Invoice Status",
      popupType: "string",
      colWidth: "160px"
    },
    {
      id: "dateInvoicePaid",
      label: "Invoice Paid Date",
      popupType: "datetime",
      startDatePropertyName: "startDateInvoicePaid",
      endDatePropertyName: "endDateInvoicePaid",
      colWidth: "160px"
    },
    { id: "onHold", label: "On Hold", popupType: "boolean", colWidth: "113px" },
    {
      id: "approvalStatusName",
      label: "Approval Status",
      popupType: "string",
      colWidth: "240px"
    },
    {
      id: "dateCoO",
      label: "CofO Date",
      popupType: "datetime",
      startDatePropertyName: "startDateCoO",
      endDatePropertyName: "endDateCoO",
      colWidth: "160px"
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
      <h1 className={classes.pageTitle}>Submissions</h1>
      <h2 className={classes.subheading}>
        These snapshots have been submitted to LADOT for review.
      </h2>
      <h2 className={classes.subheading}>
        For more advanced filtering, go to <a href="/projects">My Projects</a>.
      </h2>
      <h2 className={classes.subheading}>
        To submit a snapshot, go to <a href="/projects">My Projects</a> or page
        5 of your project.
      </h2>
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
                      <tr
                        key={project.id}
                        style={{
                          background: project.dateTrashed ? "#ffdcdc" : ""
                        }}
                      >
                        <Td align="right">
                          {project.id.toString().padStart(10, "0")}
                        </Td>
                        <TdExpandable>
                          <Link to={`/calculation/1/${project.id}`}>
                            {project.name}
                          </Link>
                        </TdExpandable>
                        <TdExpandable>{project.address}</TdExpandable>
                        <Td>{formatDate(project.dateSubmitted)}</Td>
                        <Td>{formatDate(project.dateStatus)}</Td>
                        <Td align="center">{project.projectLevel}</Td>
                        <Td>{project.droName}</Td>
                        <Td>{project.assignee}</Td>
                        <Td>{formatDate(project.dateAssigned)}</Td>
                        <Td>{project.invoiceStatusName}</Td>
                        <Td>{formatDate(project.dateInvoicePaid)}</Td>
                        <Td align="center">
                          {project.onHold ? <MdCheck /> : ""}
                        </Td>
                        <Td>{project.approvalStatusName}</Td>
                        <Td>{formatDate(project.dateCoO)}</Td>
                      </tr>
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

SubmissionsPage.propTypes = {
  contentContainerRef: PropTypes.object
};

export default SubmissionsPage;
