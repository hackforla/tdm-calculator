import React, { useState, useContext, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import UserContext from "../../contexts/UserContext.js";
import { MdFilterAlt, MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import SearchIcon from "../../images/search.png";
import Pagination from "../UI/Pagination.js";
import ContentContainerNoSidebar from "../Layout/ContentContainerNoSidebar";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProjects from "../../hooks/useGetProjects";
import useCheckedProjectsStatusData from "../../hooks/useCheckedProjectsStatusData.js";
import * as projectService from "../../services/project.service";
import SnapshotProjectModal from "./SnapshotProjectModal";
import RenameSnapshotModal from "./RenameSnapshotModal";

import DeleteProjectModal from "./DeleteProjectModal";
import CopyProjectModal from "./CopyProjectModal";
import CsvModal from "./CsvModal.js";
import ProjectTableRow from "./ProjectTableRow";
import FilterDrawer from "./FilterDrawer.js";
import MultiProjectToolbarMenu from "./MultiProjectToolbarMenu.js";
import fetchEngineRules from "./fetchEngineRules.js";

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
    marginTop: "2em"
  },
  searchBarWrapper: {
    position: "relative",
    alignSelf: "center"
  },
  searchBar: {
    maxWidth: "100%",
    width: "20em",
    padding: "12px 12px 12px 48px",
    marginRight: "0.5rem"
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "14px"
  },
  table: {
    minWidth: "850px",
    width: "100%"
  },
  tr: {
    margin: "0.5em"
  },
  td: {
    padding: "0.2em",
    textAlign: "left"
  },
  thead: {
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
      verticalAlign: "middle"
    },
    "& tr:hover": {
      background: "#B2C0D3"
    }
  },
  tdNoSavedProjects: {
    textAlign: "center"
  },
  tableContainer: {
    overflow: "auto",
    width: "100%",
    margin: "20px 0px"
  },
  pageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  dropContent: {
    padding: "5px",
    borderColor: "silver",
    borderRadius: "4px"
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

const ProjectsPage = ({ contentContainerRef }) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);

  const [filterText, setFilterText] = useState("");
  const [order, setOrder] = useState("asc");
  const email = userContext.account ? userContext.account.email : "";
  const navigate = useNavigate();
  const handleError = useErrorHandler(email, navigate);
  const [projects, setProjects] = useProjects(handleError);
  const [orderBy, setOrderBy] = useState("dateCreated");
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [snapshotModalOpen, setSnapshotModalOpen] = useState(false);
  const [renameSnapshotModalOpen, setRenameSnapshotModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [checkedProjectIds, setCheckedProjectIds] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [projectData, setProjectData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const projectsPerPage = perPage;

  const handlePerPageChange = newPerPage => {
    setPerPage(newPerPage);
    const newHighestPage = Math.ceil(sortedProjects.length / newPerPage);

    if (currentPage > newHighestPage) {
      setCurrentPage(1);
    }
  };

  const getCheckedProjects = checkedProjectIds.map(id =>
    projects.find(p => p.id === id)
  );

  const [criteria, setCriteria] = useState({
    type: "all",
    status: "active",
    visibility: "visible",
    name: "",
    address: "",
    author: "",
    alternative: "",
    startDateCreated: null,
    endDateCreated: null,
    startDateModified: null,
    endDateModified: null
  });
  const [filterCollapsed, setFilterCollapsed] = useState(true);
  const checkedProjectsStatusData = useCheckedProjectsStatusData(
    checkedProjectIds,
    projects
  );

  // fetching rules for PDF
  useEffect(() => {
    const fetchRules = async () => {
      let project;

      if (
        checkedProjectIds.length === 1 &&
        Object.keys(checkedProjectsStatusData).length > 0
      ) {
        project = checkedProjectsStatusData;
      }

      if (project && project.id && project.calculationId) {
        const rules = await fetchEngineRules(project);
        setProjectData({ pdf: rules });
      }
    };

    fetchRules().catch(console.error);
  }, [checkedProjectIds, checkedProjectsStatusData]);

  const MemoizedMultiProjectToolbar = memo(MultiProjectToolbarMenu);

  const selectedProjectName = (() => {
    if (!selectedProject || !selectedProject.formInputs) {
      return "";
    }
    const projectFormInputsAsJson = JSON.parse(selectedProject.formInputs);
    return projectFormInputsAsJson.PROJECT_NAME || "";
  })();

  const paginate = pageNumber => {
    const newHighestPage = Math.ceil(sortedProjects.length / perPage);
    if (typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    } else if (pageNumber === "left" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber === "right" && currentPage < newHighestPage) {
      setCurrentPage(currentPage + 1);
    }
    // uncheck Projects on page change
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  const handleCopyModalOpen = project => {
    if (project) {
      setSelectedProject(project);
    }
    setCopyModalOpen(true);
  };

  const updateProjects = async () => {
    const updated = await projectService.get();
    setProjects(updated.data);
  };

  const handleCopyModalClose = async (action, newProjectName) => {
    if (action === "ok") {
      const projectFormInputsAsJson = JSON.parse(selectedProject.formInputs);
      projectFormInputsAsJson.PROJECT_NAME = newProjectName;
      let newProject = {
        ...selectedProject,
        name: newProjectName,
        formInputs: JSON.stringify(projectFormInputsAsJson)
      };
      if (!newProject.description) {
        newProject.description = "";
      }
      try {
        await projectService.post(newProject);
        await updateProjects();
      } catch (err) {
        handleError(err);
      }
    }
    setCopyModalOpen(false);
  };

  const handleDeleteModalOpen = project => {
    if (!checkedProjectIds.length) setSelectedProject(project);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = async action => {
    if (action === "ok") {
      const projectIDs = selectedProject
        ? [selectedProject.id]
        : checkedProjectIds;
      const dateTrashed = selectedProject
        ? !selectedProject.dateTrashed
        : !checkedProjectsStatusData.dateTrashed;

      try {
        await projectService.trash(projectIDs, dateTrashed);
        await updateProjects();
      } catch (err) {
        handleError(err);
      }
    }
    setDeleteModalOpen(false);
    setSelectedProject(null);
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  const handleCsvModalOpen = (event, project) => {
    // If invoked from kebab menu, project will be the selected project.
    // If invoked from MultiProjectToolbarMenu, want to reset selected project to null
    setSelectedProject(project || null);
    setCsvModalOpen(true);
  };

  const handleCsvModalClose = async () => {
    setCsvModalOpen(false);
  };

  const handleSnapshotModalOpen = project => {
    setSelectedProject(project);
    setSnapshotModalOpen(true);
  };

  const handleSnapshotModalClose = async (action, newProjectName) => {
    if (action === "ok") {
      try {
        await projectService.snapshot({
          id: selectedProject.id,
          name: newProjectName
        });
        await updateProjects();
        setSelectedProject(null);
      } catch (err) {
        handleError(err);
      }
    }
    setSnapshotModalOpen(false);
  };

  const handleRenameSnapshotModalOpen = project => {
    setSelectedProject(project);
    setRenameSnapshotModalOpen(true);
  };

  const handleRenameSnapshotModalClose = async (action, newProjectName) => {
    if (action === "ok") {
      try {
        await projectService.renameSnapshot({
          id: selectedProject.id,
          name: newProjectName
        });
        await updateProjects();
        setSelectedProject(null);
      } catch (err) {
        handleError(err);
      }
    }
    setRenameSnapshotModalOpen(false);
  };

  const handleHide = async project => {
    try {
      if (!checkedProjectIds.length) {
        setSelectedProject(project);
      }

      const projectIDs =
        checkedProjectIds.length > 0 ? checkedProjectIds : [project.id];
      const dateHidden =
        checkedProjectIds.length > 0
          ? !checkedProjectsStatusData.dateHidden
          : !project.dateHidden;

      await projectService.hide(projectIDs, dateHidden);
      await updateProjects();
    } catch (err) {
      console.error(err);
    }

    setSelectedProject(null);
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  const handleCheckboxChange = projectId => {
    setCheckedProjectIds(prevCheckedProjectIds => {
      if (prevCheckedProjectIds.includes(projectId)) {
        return prevCheckedProjectIds.filter(id => id !== projectId);
      } else {
        return [...prevCheckedProjectIds, projectId];
      }
    });

    // header checkbox status
    setSelectAllChecked(checkedProjectIds.length === currentProjects.length);
  };

  const handleHeaderCheckbox = () => {
    if (!selectAllChecked) {
      setCheckedProjectIds(
        currentProjects
          .filter(
            p =>
              (criteria.visibility === "visible" && !p.dateHidden) ||
              (criteria.visibility === "hidden" && p.dateHidden) ||
              criteria.visibility === "all"
          )
          .filter(
            p =>
              (criteria.status === "active" && !p.dateTrashed) ||
              (criteria.status === "deleted" && p.dateTrashed) ||
              criteria.status === "all"
          )
          .map(p => p.id)
      );
    } else {
      setCheckedProjectIds([]);
    }

    setSelectAllChecked(!selectAllChecked);
  };

  const descCompareBy = (a, b, orderBy) => {
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
    } else if (
      orderBy === "dateHidden" ||
      orderBy === "dateTrashed" ||
      orderBy === "dateSnapshotted"
    ) {
      projectA = a[orderBy] ? 1 : 0;
      projectB = b[orderBy] ? 1 : 0;
    } else {
      projectA = a[orderBy].toLowerCase();
      projectB = b[orderBy].toLowerCase();
    }

    if (projectA < projectB) {
      return -1;
    } else if (projectA > projectB) {
      return 1;
    } else {
      return 0;
    }
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descCompareBy(a, b, orderBy)
      : (a, b) => -descCompareBy(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedList = array.map((el, index) => [el, index]);
    stabilizedList.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedList.map(el => el[0]);
  };

  const handleSort = property => {
    // disable sorting for header checkbox
    if (property === "checkAllProjects") return;

    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterTextChange = text => {
    setFilterText(text);
  };

  const getDateOnly = date => {
    const dateOnly = new Date(date).toDateString();
    return new Date(dateOnly);
  };

  const filterProjects = p => {
    if (criteria.type === "draft" && p.dateSnapshotted) return false;
    if (criteria.type === "snapshot" && !p.dateSnapshotted) return false;
    if (criteria.status === "active" && p.dateTrashed) return false;
    if (criteria.status === "deleted" && !p.dateTrashed) return false;
    if (criteria.visibility === "visible" && p.dateHidden) return false;
    if (criteria.visibility === "hidden" && !p.dateHidden) return false;
    if (
      criteria.name &&
      !p.name.toLowerCase().includes(criteria.name.toLowerCase())
    )
      return false;
    if (
      criteria.address &&
      !p.address.toLowerCase().includes(criteria.address.toLowerCase())
    )
      return false;

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
      criteria.startDateModified &&
      getDateOnly(p.dateModified) < getDateOnly(criteria.startDateModified)
    )
      return false;
    if (
      criteria.endDateModified &&
      getDateOnly(p.dateModified) > getDateOnly(criteria.endDateModified)
    )
      return false;

    // fullName attr allows searching by full name, not just by first or last name
    p["fullname"] = `${p["firstName"]} ${p["lastName"]}`;
    if (
      criteria.author &&
      !p.fullname.toLowerCase().includes(criteria.author.toLowerCase())
    )
      return false;
    try {
      p.alternative = JSON.parse(p["formInputs"]).VERSION_NO
        ? JSON.parse(p["formInputs"]).VERSION_NO
        : "";
    } catch (err) {
      p.alternative = JSON.stringify(err, null, 2);
    }

    if (
      criteria.alternative &&
      !p.alternative.toLowerCase().includes(criteria.alternative.toLowerCase())
    ) {
      return false;
    }

    // Search criteria for filterText - redundant with individual search
    // criteria in FilterDrawer, and we could get rid of the search box
    // above the grid.
    if (filterText !== "") {
      let ids = ["name", "address", "fullName", "alternative"];

      return ids.some(id => {
        let colValue = String(p[id]).toLowerCase();
        return colValue.includes(filterText.toLowerCase());
      });
    }

    return true;
  };

  const headerData = [
    {
      id: "checkAllProjects",
      label: (
        <input
          style={{
            height: "15px"
          }}
          type="checkbox"
          checked={selectAllChecked}
          onChange={handleHeaderCheckbox}
        />
      )
    },
    {
      id: "dateHidden",
      label: "Visibility"
    },
    {
      id: "dateSnapshotted",
      label: "Status"
    },
    { id: "name", label: "Name" },
    { id: "address", label: "Address" },
    { id: "VERSION_NO", label: "Alternative Number" },
    { id: "firstName", label: "Created By" },
    { id: "dateCreated", label: "Created On" },
    { id: "dateModified", label: "Last Modified" },
    {
      id: "contextMenu",
      label: ""
    }
  ];

  const indexOfLastPost = currentPage * projectsPerPage;
  const indexOfFirstPost = indexOfLastPost - projectsPerPage;
  const sortedProjects = stableSort(
    projects.filter(filterProjects),
    getComparator(order, orderBy)
  );
  const currentProjects = sortedProjects.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <ContentContainerNoSidebar contentContainerRef={contentContainerRef}>
      <div className={classes.outerDiv}>
        <div
          className={filterCollapsed ? classes.filterCollapsed : classes.filter}
        >
          <FilterDrawer
            criteria={criteria}
            setCriteria={setCriteria}
            collapsed={filterCollapsed}
            setCollapsed={setFilterCollapsed}
            setCheckedProjectIds={setCheckedProjectIds}
            setSelectAllChecked={setSelectAllChecked}
          />
        </div>

        <div className={classes.contentDiv}>
          <h1 className={classes.pageTitle}>Projects</h1>
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
                  justifyContent: "space-between"
                }}
              >
                <MemoizedMultiProjectToolbar
                  handleHideBoxes={handleHide}
                  handleCsvModalOpen={handleCsvModalOpen}
                  handleDeleteModalOpen={handleDeleteModalOpen}
                  checkedProjectIds={checkedProjectIds}
                  criteria={criteria}
                  checkedProjectsStatusData={checkedProjectsStatusData}
                  pdfProjectData={projectData}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "flex-end"
                  }}
                >
                  <div className={classes.searchBarWrapper}>
                    <input
                      className={classes.searchBar}
                      type="search"
                      id="filterText"
                      name="filterText"
                      placeholder="Search"
                      value={filterText}
                      onChange={e => handleFilterTextChange(e.target.value)}
                    />
                    <img
                      className={classes.searchIcon}
                      src={SearchIcon}
                      alt="Search Icon"
                    />
                  </div>
                  {filterCollapsed ? (
                    <button
                      alt="Show Filter Criteria"
                      style={{ backgroundColor: "#0F2940", color: "white" }}
                      onClick={() => setFilterCollapsed(false)}
                    >
                      <MdFilterAlt style={{ marginRight: "0.5em" }} />
                      Filter By
                    </button>
                  ) : null}
                </div>
              </div>
              <div className={classes.tableContainer}>
                <table className={classes.table}>
                  <thead className={classes.thead}>
                    <tr className={classes.tr}>
                      {headerData.map(header => {
                        const label = header.label;
                        return (
                          <td
                            key={header.id}
                            className={
                              header.id === "contextMenu"
                                ? `${classes.td}`
                                : `${classes.td} ${classes.theadLabel}`
                            }
                            onClick={
                              header.id == "contextMenu"
                                ? null
                                : () => handleSort(header.id)
                            }
                          >
                            {orderBy === header.id ? (
                              <span className={classes.labelSpan}>
                                {label}{" "}
                                {order === "asc" ? (
                                  <MdArrowDropDown
                                    className={classes.sortArrow}
                                  />
                                ) : (
                                  <MdArrowDropUp
                                    className={classes.sortArrow}
                                  />
                                )}
                              </span>
                            ) : (
                              <span className={classes.labelSpan}>{label}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className={classes.tbody}>
                    {projects.length ? (
                      currentProjects.map(project => (
                        <ProjectTableRow
                          key={project.id}
                          project={project}
                          handleCsvModalOpen={handleCsvModalOpen}
                          handleCopyModalOpen={handleCopyModalOpen}
                          handleDeleteModalOpen={handleDeleteModalOpen}
                          handleSnapshotModalOpen={handleSnapshotModalOpen}
                          handleRenameSnapshotModalOpen={
                            handleRenameSnapshotModalOpen
                          }
                          handleHide={handleHide}
                          handleCheckboxChange={handleCheckboxChange}
                          checkedProjectIds={checkedProjectIds}
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
              <div className={classes.pageContainer}>
                <Pagination
                  projectsPerPage={projectsPerPage}
                  totalProjects={sortedProjects.length}
                  paginate={paginate}
                  currentPage={currentPage}
                  maxNumOfVisiblePages={5}
                />
                <label>
                  <select
                    className={classes.dropContent}
                    // defaultValue={10}
                    value={perPage}
                    onChange={e => handlePerPageChange(e.target.value)}
                  >
                    <option
                      className={classes.optionItems}
                      value={projects.length}
                    >
                      All
                    </option>
                    <option className={classes.optionItems} value={100}>
                      100
                    </option>
                    <option className={classes.optionItems} value={50}>
                      50
                    </option>
                    <option className={classes.optionItems} value={25}>
                      25
                    </option>
                    <option className={classes.optionItems} value={10}>
                      10
                    </option>
                  </select>
                  <span className={classes.itemsPerPage}>Items per page</span>
                </label>
              </div>

              {(selectedProject || checkedProjectsStatusData) && (
                <>
                  <CsvModal
                    mounted={csvModalOpen}
                    onClose={handleCsvModalClose}
                    project={selectedProject}
                    projects={projects}
                    filteredProjects={sortedProjects}
                    checkedProjects={getCheckedProjects}
                  />
                  <CopyProjectModal
                    mounted={copyModalOpen}
                    onClose={handleCopyModalClose}
                    selectedProjectName={selectedProjectName}
                  />
                  <DeleteProjectModal
                    mounted={deleteModalOpen}
                    onClose={handleDeleteModalClose}
                    project={selectedProject || checkedProjectsStatusData}
                  />
                  <SnapshotProjectModal
                    mounted={snapshotModalOpen}
                    onClose={handleSnapshotModalClose}
                    selectedProjectName={selectedProjectName}
                  />
                  <RenameSnapshotModal
                    mounted={renameSnapshotModalOpen}
                    onClose={handleRenameSnapshotModalClose}
                    selectedProjectName={selectedProjectName}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentContainerNoSidebar>
  );
};

ProjectsPage.propTypes = {
  contentContainerRef: PropTypes.object
};

export default ProjectsPage;
