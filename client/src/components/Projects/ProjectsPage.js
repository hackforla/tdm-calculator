import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { createUseStyles } from "react-jss";
import * as projectService from "../../services/project.service";
import moment from "moment";
import { useToast } from "../../contexts/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "../../images/search.png";
import CopyIcon from "../../images/copy.png";
import DeleteIcon from "../../images/trash.png";
import Pagination from "../Pagination.js";
import DeleteProjectModal from "./DeleteProjectModal";
import DuplicateProjectModal from "./DuplicateProjectModal";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "calc(100vh - 103px - 48px)",
    margin: "auto",
    width: "85%"
  },
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
      backgroundColor: "transparent"
    }
  },
  link: {
    textDecoration: "underline"
  },
  tableContainer:{
    overflow:'auto',
    width:'100%',
    margin:'20px 0px',
  }
});

const ProjectsPage = ({ account, history }) => {
  const [projects, setProjects] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("dateCreated");
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [duplicateProjectName, setDuplicateProjectName] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const classes = useStyles();
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const highestPage = Math.ceil(projects.length / projectsPerPage);
  const email = account.email;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const toastAdd = toast.add;
  const historyPush = history.push;

  const pageLinks = document.getElementsByClassName("pageLinkContainer-0-2-40");
  for (let i = 0; i < pageLinks.length; i++) {
    pageLinks[i].classList.remove("highlightPage");
    if (i === currentPage - 1) pageLinks[i].classList.add("highlightPage");
  }

  const paginate = pageNumber => {
    if (typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    } else if (pageNumber === "left" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber === "right" && currentPage !== highestPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleError = useCallback(
    error => {
      if (error.response && error.response.status === 401) {
        toastAdd(
          "For your security, your session has expired. Please log in again."
        );
        historyPush(`/logout/${encodeURIComponent(email)}`);
      }
      console.error(error);
    },
    [email, toastAdd, historyPush]
  );

  const getProjects = useCallback(async () => {
    try {
      const result = await projectService.get();
      if (result.data === "" || result.data === false) {
        setProjects([]);
      } else {
        setProjects(result.data);
      }
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  useEffect(() => {
    if (!selectedProject) {
      getProjects();
    }
  }, [selectedProject, getProjects]);

  const toggleDuplicateModal = async project => {
    if (project) {
      setSelectedProject(project);
      setDuplicateProjectName(`${project.name} (COPY)`);
    } else {
      setSelectedProject(null);
    }
    setDuplicateModalOpen(!duplicateModalOpen);
  };

  const toggleDeleteModal = project => {
    project ? setSelectedProject(project) : setSelectedProject(null);
    setDeleteModalOpen(!deleteModalOpen);
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

    if (filterText !== "") {
      let ids = [
        "name",
        "address",
        "fullName",
        "versionNum",
        "buildingPermit",
        "dateCreated",
        "dateModified"
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
    { id: "VERSION_NO", label: "Version Number" },
    { id: "BUILDING_PERMIT", label: "Building Permit" },
    { id: "firstName", label: "Entered By" },
    { id: "dateCreated", label: "Created On" },
    { id: "dateModified", label: "Last Modified" }
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
    <div className={classes.main}>
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
            {headerData.map((header, i) => (
              <td
                key={i}
                className={`${classes.td} ${classes.theadLabel}`}
                onClick={() => handleSort(header.id)}
              >
                {header.label}
                {orderBy === header.id ? (
                  <span>
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
                  <FontAwesomeIcon
                    icon={faSortDown}
                    className={classes.sortArrow}
                  />
                )}
              </td>
            ))}
            <td></td>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {projects.length ? (
            currentProjects.map(project => (
              <tr key={project.id}>
                <td className={classes.td}>
                  <Link
                    to={`/calculation/1/${project.id}`}
                    className={classes.link}
                  >
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
                <td className={classes.actionIcons}>
                  {project.loginId === currentUser.id && (
                    <>
                      <button onClick={() => toggleDuplicateModal(project)}>
                        <img
                          src={CopyIcon}
                          alt={`Duplicate Project #${project.id}`}
                        />
                      </button>
                      <button onClick={() => toggleDeleteModal(project)}>
                        <img
                          src={DeleteIcon}
                          alt={`Delete Project #${project.id}`}
                        />
                      </button>
                    </>
                  )}
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
          <DuplicateProjectModal
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            handleError={handleError}
            toggleDuplicateModal={toggleDuplicateModal}
            duplicateModalOpen={duplicateModalOpen}
            duplicateProjectName={duplicateProjectName}
            setDuplicateProjectName={setDuplicateProjectName}
          />

          <DeleteProjectModal
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            toggleDeleteModal={toggleDeleteModal}
            handleError={handleError}
            deleteModalOpen={deleteModalOpen}
          />
        </>
      )}
    </div>
  );
};

ProjectsPage.propTypes = {
  account: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
      projectId: PropTypes.string
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default withRouter(ProjectsPage);
