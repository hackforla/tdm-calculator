import React, { useState, useContext, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import UserContext from "../../contexts/UserContext";

import { MdFilterAlt } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import Pagination from "../UI/Pagination";
import ContentContainerNoSidebar from "../Layout/ContentContainerNoSidebar";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProjects from "../../hooks/useGetProjects";
import useCheckedProjectsStatusData from "../../hooks/useCheckedProjectsStatusData";
import * as projectService from "../../services/project.service";
import * as droService from "../../services/dro.service";
import SnapshotProjectModal from "./SnapshotProjectModal";
import RenameSnapshotModal from "./RenameSnapshotModal";
import ShareSnapshotModal from "./ShareSnapshotModal";

import DeleteProjectModal from "./DeleteProjectModal";
import CopyProjectModal from "./CopyProjectModal";
import CsvModal from "./CsvModal";
import ProjectTableRow from "./ProjectTableRow";
import FilterDrawer from "./FilterDrawer";
import MultiProjectToolbarMenu from "./MultiProjectToolbarMenu";
import fetchEngineRules from "./fetchEngineRules";
import UniversalSelect from "../UI/UniversalSelect";
import ProjectTableColumnHeader from "./ColumnHeaderPopups/ProjectTableColumnHeader";

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
    width: "27em",
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
    overflow: "visible", // changed to allow Universal Select to show above the page container when expanded
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
  const [shareSnapshotModalOpen, setShareSnapshotModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [checkedProjectIds, setCheckedProjectIds] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [projectData, setProjectData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [droOptions, setDroOptions] = useState([]);
  const [droNameMap, setDroNameMap] = useState({});
  const projectsPerPage = perPage;
  const isAdmin = userContext.account?.isAdmin || false;

  useEffect(() => {
    // Check if the user is an admin
    const isAdmin = userContext.account?.isAdmin || false;

    if (isAdmin) {
      // Fetch available DROs

      const fetchDroOptions = async () => {
        const result = await droService.get();
        setDroOptions(result);
      };
      fetchDroOptions().catch(console.error);
    }
  }, [userContext.account]);

  useEffect(() => {
    const isAdmin = userContext.account?.isAdmin || false;

    if (!isAdmin) {
      // Extract unique droIds from projects
      const uniqueDroIds = [
        ...new Set(
          projects
            .filter(project => project.droId)
            .map(project => project.droId)
        )
      ];

      // Function to fetch DRO names for given droIds
      const fetchDroNames = async () => {
        try {
          // Initialize a temporary map
          const tempDroNameMap = {};

          // Fetch each DRO by ID
          await Promise.all(
            uniqueDroIds.map(async droId => {
              try {
                const response = await droService.getById(droId);
                tempDroNameMap[droId] = response.data.name || "N/A";
              } catch (error) {
                console.error(`Error fetching DRO with ID ${droId}:`, error);
                tempDroNameMap[droId] = "N/A";
              }
            })
          );

          // Update the droNameMap state
          setDroNameMap(tempDroNameMap);
        } catch (error) {
          console.error("Error fetching DRO names:", error);
        }
      };

      // Only fetch if there are droIds to fetch
      if (uniqueDroIds.length > 0) {
        fetchDroNames();
      } else {
        // Reset the map if no droIds are present
        setDroNameMap({});
      }
    } else {
      // If admin, reset the map since admin already has droOptions
      setDroNameMap({});
    }
  }, [projects, userContext.account?.isAdmin]);

  const perPageOptions = [
    { value: projects.length, label: "All" },
    { value: 100, label: "100" },
    { value: 50, label: "50" },
    { value: 25, label: "25" },
    { value: 10, label: "10" }
  ];

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
    dro: "",
    startDateCreated: null,
    endDateCreated: null,
    startDateModified: null,
    endDateModified: null,
    nameList: [],
    addressList: [],
    alternativeList: [],
    authorList: [],
    droList: [],
    adminNotes: "",
    startDateModifiedAdmin: null,
    endDateModifiedAdmin: null
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

  const handleShareSnapshotModalOpen = project => {
    setSelectedProject(project);
    setShareSnapshotModalOpen(true);
  };

  const handleShareSnapshotModalClose = async () => {
    setShareSnapshotModalOpen(false);
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

  const ascCompareBy = (a, b, orderBy) => {
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
    } else if (orderBy === "author") {
      projectA = `${a["lastName"]} ${a["firstName"]}`;
      projectB = `${b["lastName"]} ${b["firstName"]}`;
    } else if (
      orderBy === "dateHidden" ||
      orderBy === "dateTrashed" ||
      orderBy === "dateSnapshotted"
    ) {
      projectA = a[orderBy] ? 1 : 0;
      projectB = b[orderBy] ? 1 : 0;
    } else if (
      orderBy === "dateSubmitted" ||
      orderBy === "dateCreated" ||
      orderBy === "dateModified"
    ) {
      projectA = a[orderBy] ? a[orderBy] : "2000-01-01";
      projectB = b[orderBy] ? b[orderBy] : "2000-01-01";
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
    return order === "asc"
      ? (a, b) => ascCompareBy(a, b, orderBy)
      : (a, b) => -ascCompareBy(a, b, orderBy);
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

  const setSort = (orderBy, order) => {
    setOrder(order);
    setOrderBy(orderBy);
  };

  const handleDroChange = async (projectId, newDroId) => {
    try {
      const updatedDroId = newDroId === "" ? null : newDroId;
      await projectService.updateDroId(projectId, updatedDroId);
      await updateProjects(); // Refresh the project list
    } catch (error) {
      console.error("Error updating DRO ID:", error);
    }
  };

  const handleAdminNoteUpdate = async (projectId, newAdminNote) => {
    try {
      await projectService.updateAdminNotes(projectId, newAdminNote);
      await updateProjects(); // Refresh the project list
    } catch (error) {
      console.error("Error updating admin notes:", error);
    }
  };

  const handleFilterTextChange = text => {
    setFilterText(text);
  };

  const getDateOnly = date => {
    const dateOnly = new Date(date).toDateString();
    return new Date(dateOnly);
  };

  const filter = (p, criteria) => {
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
      criteria.alternativeList.length > 0 &&
      !criteria.alternativeList
        .map(n => n.toLowerCase())
        .includes(p.alternative.toLowerCase())
    ) {
      return false;
    }

    if (
      criteria.authorList.length > 0 &&
      !criteria.authorList
        .map(n => n.toLowerCase())
        .includes(p.fullname.toLowerCase())
    ) {
      return false;
    }

    if (criteria.dro && !p.dro.includes(criteria.dro)) return false;

    if (
      criteria.adminNotes &&
      !p.adminNotes.toLowerCase().includes(criteria.adminNotes.toLowerCase())
    ) {
      return false;
    }

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

    // Search criteria for filterText - redundant with individual search
    // criteria in FilterDrawer, and we could get rid of the search box
    // above the grid.
    if (filterText !== "") {
      let ids = ["name", "address", "fullName", "alternative", "description"];

      return ids.some(id => {
        let colValue = String(p[id]).toLowerCase();
        return colValue.includes(filterText.toLowerCase());
      });
    }

    return true;
  };

  const resetFiltersSort = () => {
    setCriteria({
      type: "all",
      status: "active",
      visibility: "visible",
      name: "",
      address: "",
      author: "",
      alternative: "",
      dro: "",
      startDateCreated: null,
      endDateCreated: null,
      startDateModified: null,
      endDateModified: null,
      nameList: [],
      addressList: [],
      alternativeList: [],
      authorList: [],
      droList: [],
      adminNotes: "",
      startDateModifiedAdmin: null,
      endDateModifiedAdmin: null
    });
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
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
      label: "Visibility",
      popupType: "visibility"
    },
    {
      id: "dateSnapshotted",
      label: "Status",
      popupType: "status"
    },
    { id: "name", label: "Name", popupType: "text" },
    { id: "address", label: "Address", popupType: "text" },
    { id: "alternative", label: "Alternative Number", popupType: "text" },
    { id: "author", label: "Created By", popupType: "text" },
    {
      id: "dateCreated",
      label: "Created On",
      popupType: "datetime",
      startDatePropertyName: "startDateCreated",
      endDatePropertyName: "endDateCreated"
    },
    {
      id: "dateModified",
      label: "Last Modified",
      popupType: "datetime",
      startDatePropertyName: "startDateModified",
      endDatePropertyName: "endDateModified"
    },
    {
      id: "dateSubmitted",
      label: "Submitted",
      popupType: "datetime",
      startDatePropertyName: "startDateSubmitted",
      endDatePropertyName: "endDateSubmitted"
    },
    {
      id: "dro",
      label: "DRO",
      popupType: "text"
    },

    ...(userContext.account?.isAdmin
      ? [
          {
            id: "adminNotes",
            label: "Admin Notes",
            popupType: null // No filter needed for this column
          },
          {
            id: "dateModifiedAdmin",
            label: "Date Admin Modified",
            popupType: "datetime"
          }
        ]
      : []),
    {
      id: "contextMenu",
      label: ""
    }
  ];

  const indexOfLastPost = currentPage * projectsPerPage;
  const indexOfFirstPost = indexOfLastPost - projectsPerPage;
  const sortedProjects = stableSort(
    projects.filter(p => filter(p, criteria)),
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
            droOptions={droOptions}
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
                  justifyContent: "flex-start"
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
                    alignSelf: "flex-end",
                    marginLeft: "20px",
                    justifyContent: "space-between",
                    width: "80%"
                  }}
                >
                  <div className={classes.searchBarWrapper}>
                    <input
                      className={classes.searchBar}
                      type="search"
                      id="filterText"
                      name="filterText"
                      placeholder="Search by Name; Address; Description; Alt#" // redundant with FilterDrawer
                      value={filterText}
                      onChange={e => handleFilterTextChange(e.target.value)}
                    />
                    <MdOutlineSearch className={classes.searchIcon} />
                  </div>
                  <div>
                    <button
                      onClick={resetFiltersSort}
                      style={{ height: "40px" }}
                    >
                      RESET FILTERS/SORT ({sortedProjects.length})
                    </button>
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
              </div>
              <div className={classes.tableContainer}>
                <table className={classes.table}>
                  <thead className={classes.thead}>
                    <tr className={classes.tr}>
                      {headerData.map(header => {
                        return (
                          <td key={header.id}>
                            <ProjectTableColumnHeader
                              projects={projects}
                              filter={filter}
                              header={header}
                              criteria={criteria}
                              setCriteria={setCriteria}
                              setSort={setSort}
                              order={order}
                              orderBy={orderBy}
                              setCheckedProjectIds={setCheckedProjectIds}
                              setSelectAllChecked={setSelectAllChecked}
                            />
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
                          handleShareSnapshotModalOpen={
                            handleShareSnapshotModalOpen
                          }
                          handleHide={handleHide}
                          handleCheckboxChange={handleCheckboxChange}
                          checkedProjectIds={checkedProjectIds}
                          isAdmin={isAdmin}
                          droOptions={droOptions}
                          onDroChange={handleDroChange} // Pass the DRO change handler
                          onAdminNoteUpdate={handleAdminNoteUpdate} // Pass the admin note update handler
                          droName={
                            isAdmin ? null : droNameMap[project.droId] || "N/A"
                          } // Pass the droName
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
                <UniversalSelect
                  value={perPage}
                  options={perPageOptions}
                  onChange={e => handlePerPageChange(e.target.value)}
                  name="perPage"
                  className={classes.dropContent}
                />
                <span className={classes.itemsPerPage}>Items per page</span>
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
                  <ShareSnapshotModal
                    mounted={shareSnapshotModalOpen}
                    onClose={handleShareSnapshotModalClose}
                    project={selectedProject}
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
