import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import UserContext from "../../contexts/UserContext";
import { MdOutlineSearch } from "react-icons/md";
import Pagination from "../UI/Pagination";
import ContentContainerNoSidebar from "../Layout/ContentContainerNoSidebar";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProjects from "../../hooks/useGetProjects";
import useCheckedProjectsStatusData from "../../hooks/useCheckedProjectsStatusData";
import * as projectService from "../../services/project.service";
import * as projectResultService from "../../services/projectResult.service";
import * as droService from "../../services/dro.service";
import SnapshotProjectModal from "../Modals/ActionProjectSnapshot";
import RenameSnapshotModal from "../Modals/ActionSnapshotRename";
import ShareSnapshotModal from "../Modals/ActionSnapshotShare";
import WarningSnapshotSubmit from "../Modals/WarningSnapshotSubmit";
import InfoTargetNotReached from "../Modals/InfoTargetNotReached";
import WarningProjectDelete from "../Modals/WarningProjectDelete";
import CopyProjectModal from "../Modals/ActionProjectCopy";
import CsvModal from "../Modals/ActionProjectsCsv";
import ProjectTableRow from "./ProjectTableRow";
import MultiProjectToolbarMenu from "./MultiProjectToolbarMenu";
import fetchEngineRules from "./fetchEngineRules";
import UniversalSelect from "../UI/UniversalSelect";
import ProjectTableColumnHeader from "./ColumnHeaderPopups/ProjectTableColumnHeader";
import Button from "../Button/Button";
import useSessionStorage from "../../hooks/useSessionStorage";
import {
  SORT_CRITERIA_STORAGE_TAG,
  FILTER_CRITERIA_STORAGE_TAG
} from "../../helpers/Constants";

const DEFAULT_SORT_CRITERIA = [{ field: "dateModified", direction: "desc" }];
const DEFAULT_FILTER_CRITERIA = {
  filterText: "",
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
  startDateSubmitted: null,
  endDateSubmitted: null,
  nameList: [],
  addressList: [],
  alternativeList: [],
  authorList: [],
  droList: [],
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

const ProjectsPage = ({ contentContainerRef }) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [sessionFilterCriteria, setSessionFilterCriteria] = useSessionStorage(
    FILTER_CRITERIA_STORAGE_TAG,
    DEFAULT_FILTER_CRITERIA
  );
  const [sessionSortCriteria, setSessionSortCriteria] = useSessionStorage(
    SORT_CRITERIA_STORAGE_TAG,
    DEFAULT_SORT_CRITERIA
  );

  const formatDatesFromCookieStrigify = sessionFilterCriteria => {
    const newFilterCriteria = { ...sessionFilterCriteria };
    const dateProperties = [
      "startDateCreated",
      "endDateCreated",
      "startDateModified",
      "endDateModified",
      "startDateSubmitted",
      "endDateSubmitted",
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

  const email = userContext.account ? userContext.account.email : "";
  const navigate = useNavigate();
  const handleError = useErrorHandler(email, navigate);
  const [projects, setProjects] = useProjects(handleError);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [snapshotModalOpen, setSnapshotModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [targetNotReachedModalOpen, setTargetNotReachedModalOpen] =
    useState(false);
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
  const loginId = userContext.account?.id || null;

  const enhancedProjects = projects
    ? projects.map(project => {
        const droName =
          droOptions.find(dro => dro.id === project.droId)?.name || "";
        return {
          ...project,
          droName: droName,
          adminNotes: project.adminNotes || ""
        };
      })
    : [];

  useEffect(() => {
    const fetchDroOptions = async () => {
      try {
        const result = await droService.get();
        setDroOptions(result.data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching DRO options:", error);
      }
    };
    fetchDroOptions();
  }, []);

  useEffect(() => {
    const droMap = {};
    droOptions.forEach(dro => {
      droMap[dro.id] = dro.name;
    });
    setDroNameMap(droMap);
  }, [droOptions]);

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

  const getCheckedProjects = checkedProjectIds.map(id =>
    projects.find(p => p.id === id)
  );

  // const [filterCollapsed, setFilterCollapsed] = useState(true);
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

  // const MemoizedMultiProjectToolbar = memo(MultiProjectToolbarMenu);

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
    let newSelectedProject = { ...selectedProject };
    if (action === "ok") {
      const projectFormInputsAsJson = JSON.parse(selectedProject.formInputs);
      projectFormInputsAsJson.PROJECT_NAME = newProjectName;
      if (!selectedProject.targetPoints) {
        await projectResultService.populateTargetPoints(selectedProject);
        newSelectedProject = await projectService.getById(selectedProject.id);
      }
      let newProject = {
        ...newSelectedProject,
        loginId: loginId,
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

  const handleSubmitModalOpen = project => {
    setSelectedProject(project);
    if (project.earnedPoints >= project.targetPoints) {
      setSubmitModalOpen(true);
    } else {
      setTargetNotReachedModalOpen(true);
    }
  };

  const handleSubmitModalClose = async action => {
    if (action === "ok") {
      await updateProjects();
    }
    setSubmitModalOpen(false);
    setSelectedProject(null);
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
              (filterCriteria.visibility === "visible" && !p.dateHidden) ||
              (filterCriteria.visibility === "hidden" && p.dateHidden) ||
              filterCriteria.visibility === "all"
          )
          .filter(
            p =>
              (filterCriteria.status === "active" && !p.dateTrashed) ||
              (filterCriteria.status === "deleted" && p.dateTrashed) ||
              filterCriteria.status === "all"
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
    } else if (orderBy === "dro") {
      projectA = a.droName ? a.droName.toLowerCase() : null;
      projectB = b.droName ? b.droName.toLowerCase() : null;
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
    p["fullname"] = `${p["lastName"]}, ${p["firstName"]}`;
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

    if (criteria.filterText && criteria.filterText !== "") {
      let ids = ["name", "address", "fullName", "alternative", "description"];

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
      ),
      colWidth: "3rem"
    },
    {
      id: "dateHidden",
      label: "Visibility",
      popupType: "visibility",
      colWidth: "8rem"
    },
    {
      id: "dateSnapshotted",
      label: "Status",
      popupType: "status",
      colWidth: "7rem"
    },
    { id: "name", label: "Name", popupType: "text", colWidth: "20rem" },
    { id: "address", label: "Address", popupType: "text", colWidth: "20rem" },
    {
      id: "alternative",
      label: "Alt No.",
      popupType: "text",
      colWidth: "10rem"
    },
    { id: "author", label: "Created By", popupType: "text", colWidth: "15rem" },
    {
      id: "dateCreated",
      label: "Created On",
      popupType: "datetime",
      startDatePropertyName: "startDateCreated",
      endDatePropertyName: "endDateCreated",
      colWidth: "10rem"
    },
    {
      id: "dateModified",
      label: "Last Saved",
      popupType: "datetime",
      startDatePropertyName: "startDateModified",
      endDatePropertyName: "endDateModified",
      colWidth: "10rem"
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
      id: "dro",
      label: "DRO",
      popupType: "text",
      accessor: "droName",
      colWidth: "10rem"
    },

    ...(userContext.account?.isAdmin
      ? [
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
        ]
      : []),
    {
      id: "contextMenu",
      label: "",
      colWidth: "3rem"
    }
  ];

  const indexOfLastPost = currentPage * projectsPerPage;
  const indexOfFirstPost = indexOfLastPost - projectsPerPage;
  let sortedProjects = enhancedProjects.filter(p => filter(p, filterCriteria));
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
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px"
                }}
              >
                <div>
                  <MultiProjectToolbarMenu
                    handleHideBoxes={handleHide}
                    handleCsvModalOpen={handleCsvModalOpen}
                    handleDeleteModalOpen={handleDeleteModalOpen}
                    checkedProjectIds={checkedProjectIds}
                    criteria={filterCriteria}
                    checkedProjectsStatusData={checkedProjectsStatusData}
                    pdfProjectData={projectData}
                  />
                </div>
                <div>
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
                </div>
                <div>
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
                                  setCheckedProjectIds={setCheckedProjectIds}
                                  setSelectAllChecked={setSelectAllChecked}
                                  droOptions={droOptions}
                                />
                              </th>
                            </td>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className={classes.tbody}>
                      {enhancedProjects.length ? (
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
                            handleSubmitModalOpen={handleSubmitModalOpen}
                            handleHide={handleHide}
                            handleCheckboxChange={handleCheckboxChange}
                            checkedProjectIds={checkedProjectIds}
                            isAdmin={isAdmin}
                            droOptions={droOptions}
                            onDroChange={handleDroChange} // Pass the DRO change handler
                            onAdminNoteUpdate={handleAdminNoteUpdate} // Pass the admin note update handler
                            droName={
                              isAdmin
                                ? null
                                : droNameMap[project.droId] || "N/A"
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
                  maxMenuHeight={"60px"}
                />
                <span className={classes.itemsPerPage}>Items per page</span>
              </div>
              {/* <pre>{JSON.stringify(sortCriteria, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(filterCriteria, null, 2)}</pre> */}
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
                  <WarningProjectDelete
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
                  <WarningSnapshotSubmit
                    mounted={submitModalOpen}
                    onClose={handleSubmitModalClose}
                    project={selectedProject}
                  />
                  <InfoTargetNotReached
                    mounted={targetNotReachedModalOpen}
                    onClose={() => setTargetNotReachedModalOpen(false)}
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
