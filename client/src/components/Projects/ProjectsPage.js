import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faCamera,
  faTrash,
  faEye,
  faEyeSlash,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "../../images/search.png";

import Pagination from "../Pagination.js";
import ContentContainerNoSidebar from "../Layout/ContentContainerNoSidebar";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProjects from "../../hooks/useGetProjects";
import * as projectService from "../../services/project.service";
import SnapshotProjectModal from "./SnapshotProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import CopyProjectModal from "./CopyProjectModal";
import DownloadProjectModal from "./DownloadProjectModal.js";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ProjectContextMenu from "./ProjectContextMenu";

const useStyles = createUseStyles({
  pageTitle: {
    marginTop: "2em"
  },
  searchBarWrapper: {
    position: "relative",
    alignSelf: "flex-end"
  },
  searchBar: {
    maxWidth: "100%",
    width: "382px",
    padding: "12px 12px 12px 48px"
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "12px"
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
  tdRightAlign: {
    padding: "0.2em",
    textAlign: "right"
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
  printIcon: {
    verticalAlign: "baseline",
    opacity: ".4",
    height: "20px"
  },
  tbody: {
    background: "#F9FAFB",
    "& tr": {
      borderBottom: "1px solid #E7EBF0"
    },
    "& tr td": {
      padding: "12px 18px",
      verticalAlign: "middle"
    },
    "& tr:hover": {
      background: "#B2C0D3"
    }
  },
  tdNoSavedProjects: {
    textAlign: "center"
  },
  actionIcons: {
    display: "flex",
    justifyContent: "space-around",
    width: "auto",
    "& button": {
      border: "none",
      backgroundColor: "transparent",
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  tableContainer: {
    overflow: "auto",
    width: "100%",
    margin: "20px 0px"
  }
});

const ProjectsPage = ({ account, contentContainerRef }) => {
  const [filterText, setFilterText] = useState("");
  const [order, setOrder] = useState("asc");
  const email = account.email;
  const navigate = useNavigate();
  const handleError = useErrorHandler(email, navigate);
  const projects = useProjects(handleError);
  const [orderBy, setOrderBy] = useState("dateCreated");
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [snapshotModalOpen, setSnapshotModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const highestPage = Math.ceil(projects.length / projectsPerPage);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const pageLinks = document.getElementsByClassName("pageLinkContainer-0-2-40");
  for (let i = 0; i < pageLinks.length; i++) {
    pageLinks[i].classList.remove("highlightPage");
    if (i === currentPage - 1) pageLinks[i].classList.add("highlightPage");
  }

  const selectedProjectName = (() => {
    if (!selectedProject) {
      return "";
    }
    const projectFormInputsAsJson = JSON.parse(selectedProject.formInputs);
    return projectFormInputsAsJson.PROJECT_NAME || "";
  })();

  const paginate = pageNumber => {
    if (typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    } else if (pageNumber === "left" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber === "right" && currentPage !== highestPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCopyModalOpen = project => {
    if (project) {
      setSelectedProject(project);
    }
    setCopyModalOpen(true);
  };

  const handleCopyModalClose = async (action, newProjectName) => {
    if (action === "ok") {
      const projectFormInputsAsJson = JSON.parse(selectedProject.formInputs);
      projectFormInputsAsJson.PROJECT_NAME = newProjectName;

      try {
        await projectService.post({
          ...selectedProject,
          name: newProjectName,
          formInputs: JSON.stringify(projectFormInputsAsJson)
        });
        setSelectedProject(null);
      } catch (err) {
        handleError(err);
      }
    }
    setCopyModalOpen(false);
  };

  const handleDeleteModalOpen = project => {
    setSelectedProject(project);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = async action => {
    if (action === "ok") {
      try {
        await projectService.del(selectedProject.id);
        setSelectedProject(null);
      } catch (err) {
        handleError(err);
      }
    }
    setDeleteModalOpen(false);
  };

  const handleSnapshotModalOpen = project => {
    setSelectedProject(project);
    setSnapshotModalOpen(true);
  };

  const handleSnapshotModalClose = async action => {
    console.log("SELECTED PROJECT", selectedProject);
    let newProjectName;
    const projectFormInputsAsJson = JSON.parse(selectedProject.formInputs);
    projectFormInputsAsJson.PROJECT_NAME = newProjectName;
    if (action === "ok") {
      try {
        await projectService.snapshot({
          id: selectedProject.id,
          name: newProjectName
        });
        setSelectedProject(null);
      } catch (err) {
        handleError(err);
      }
    }
    setSnapshotModalOpen(false);
  };

  const handleDownloadModalOpen = project => {
    setSelectedProject(project);
    setDownloadModalOpen(true);
  };

  const handleDownloadModalClose = async () => {
    setDownloadModalOpen(false);
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
      projectA = a.dateHidden ? 1 : 0;
      projectB = b.dateHidden ? 1 : 0;
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
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterTextChange = text => {
    setFilterText(text);
  };

  const filterProjects = project => {
    // fullName attr allows searching by full name, not just by first or last name
    project["fullName"] = `${project["firstName"]} ${project["lastName"]}`;
    project["versionNum"] = JSON.parse(project["formInputs"]).VERSION_NO
      ? JSON.parse(project["formInputs"]).VERSION_NO
      : "";
    project["buildingPermit"] = JSON.parse(project["formInputs"])
      .BUILDING_PERMIT
      ? JSON.parse(project["formInputs"]).BUILDING_PERMIT
      : "";
    project["dateCreated"] = moment(project["dateCreated"]).format();
    project["dateModified"] = moment(project["dateModified"]).format();
    project["dateHidden"] = project["dateTrashed"]
      ? moment(project["dateHidden"]).format()
      : null;
    project["dateTrashed"] = project["dateTrashed"]
      ? moment(project["dateTrashed"]).format()
      : null;
    project["dateSnapshotted"] = project["dateSnapshotted"]
      ? moment(project["dateSnapshotted"]).format()
      : null;

    if (filterText !== "") {
      let ids = [
        "name",
        "address",
        "fullName",
        "versionNum",
        "buildingPermit",
        "dateCreated",
        "dateModified",
        "dateHidden",
        "dateTrashed",
        "dateSnapshotted"
      ];

      return ids.some(id => {
        let colValue = String(project[id]).toLowerCase();
        return colValue.includes(filterText.toLowerCase());
      });
    }

    return true;
  };

  const headerData = [
    { id: "name", label: "Name" },
    { id: "address", label: "Address" },
    { id: "VERSION_NO", label: "Alternative Number" },
    { id: "BUILDING_PERMIT", label: "Building Permit" },
    { id: "firstName", label: "Created By" },
    { id: "dateCreated", label: "Created On" },
    { id: "dateModified", label: "Last Modified" },
    {
      id: "dateHidden",
      label: <FontAwesomeIcon icon={faEye} alt={`Project Is In Trash`} />
    },
    {
      id: "dateTrashed",
      label: <FontAwesomeIcon icon={faTrash} alt={`Project Is In Trash`} />
    },
    {
      id: "dateSnapshotted",
      label: <FontAwesomeIcon icon={faCamera} alt={`Project Is In Trash`} />
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
      <h1 className={classes.pageTitle}>Projects</h1>
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
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.tr}>
              {headerData.map((header, i) => {
                const label = header.label;
                return (
                  <td
                    key={i}
                    className={`${classes.td} ${classes.theadLabel}`}
                    onClick={() => handleSort(header.id)}
                  >
                    {orderBy === header.id ? (
                      <span className={classes.labelSpan}>
                        {label}{" "}
                        {order === "asc" ? (
                          <FontAwesomeIcon
                            icon={faSortDown}
                            className={classes.sortArrow}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faSortUp}
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
              <td></td>
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {projects.length ? (
              currentProjects.map(project => (
                <tr key={project.id}>
                  <td className={classes.td}>
                    <Link to={`/calculation/1/${project.id}`}>
                      {project.name}
                    </Link>
                  </td>
                  <td className={classes.td}>{project.address}</td>
                  <td className={classes.td}>
                    {JSON.parse(project.formInputs).VERSION_NO !== "undefined"
                      ? JSON.parse(project.formInputs).VERSION_NO
                      : ""}
                  </td>
                  <td className={classes.td}>
                    {JSON.parse(project.formInputs).BUILDING_PERMIT !==
                    "undefined"
                      ? JSON.parse(project.formInputs).BUILDING_PERMIT
                      : ""}
                  </td>
                  <td
                    className={classes.td}
                  >{`${project.firstName} ${project.lastName}`}</td>
                  <td className={classes.tdRightAlign}>
                    {moment(project.dateCreated).format("MM/DD/YYYY")}
                  </td>
                  <td className={classes.tdRightAlign}>
                    {moment(project.dateModified).isSame(moment(), "day")
                      ? moment(project.dateModified).format("h:mm A")
                      : moment(project.dateModified).format("MM/DD/YYYY")}
                  </td>
                  <td className={classes.tdRightAlign}>
                    {project.dateHidden ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        alt={`Project Is Hidden`}
                      />
                    ) : null}
                  </td>
                  <td className={classes.tdRightAlign}>
                    {project.dateTrashed ? (
                      <FontAwesomeIcon
                        icon={faTrash}
                        alt={`Project Is In Trash`}
                      />
                    ) : null}
                  </td>
                  <td className={classes.tdRightAlign}>
                    {project.dateSnapshotted ? (
                      <FontAwesomeIcon
                        icon={faCamera}
                        alt={`Project Is A Snapshot`}
                      />
                    ) : null}
                  </td>
                  <td className={classes.actionIcons}>
                    <Popup
                      trigger={
                        <button>
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            alt={`Project Is A Snapshot`}
                          />
                        </button>
                      }
                      position="bottom center"
                      offsetX={-100}
                      on="click"
                      closeOnDocumentClick
                      arrow={false}
                    >
                      <ProjectContextMenu
                        project={project}
                        handleCopyModalOpen={handleCopyModalOpen}
                        handleDeleteModalOpen={handleDeleteModalOpen}
                        handleSnapshotModalOpen={handleSnapshotModalOpen}
                        handleDownloadCSV={handleDownloadModalOpen}
                      />
                    </Popup>
                    {project.loginId === currentUser.id && <></>}
                  </td>
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
      <Pagination
        projectsPerPage={projectsPerPage}
        totalProjects={projects.length}
        paginate={paginate}
      />

      {selectedProject && (
        <>
          <CopyProjectModal
            mounted={copyModalOpen}
            onClose={handleCopyModalClose}
            selectedProjectName={selectedProjectName}
          />

          <DeleteProjectModal
            mounted={deleteModalOpen}
            onClose={handleDeleteModalClose}
            selectedProjectName={selectedProjectName}
          />

          <DownloadProjectModal
            mounted={downloadModalOpen}
            onClose={handleDownloadModalClose}
            selectedProject={selectedProject}
          />

          <SnapshotProjectModal
            mounted={snapshotModalOpen}
            onClose={handleSnapshotModalClose}
            selectedProjectName={selectedProjectName}
          />
        </>
      )}
    </ContentContainerNoSidebar>
  );
};

ProjectsPage.propTypes = {
  account: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string
  }),
  contentContainerRef: PropTypes.object
};

export default ProjectsPage;
