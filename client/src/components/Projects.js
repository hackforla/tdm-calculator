import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { createUseStyles } from "react-jss";
import Modal from "react-modal";
import * as projectService from "../services/project.service";
import moment from "moment";
import { useToast } from "../contexts/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "../images/search.png";
import WarningIcon from "../images/warning-icon.png";
import CopyIcon from "../images/copy.png";
import DeleteIcon from "../images/trash.png";
import CloseIcon from "../images/close.png";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "calc(100vh - 103px - 48px)",
    width: "1146px",
    minWidth: "80%",
    margin: "auto"
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
    margin: "20px",
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
  warningIcon: {
    float: "left"
  },
  modal: {
    "& h2": {
      fontSize: "25px",
      lineHeight: "31px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "30px",
      "& img": {
        margin: "0 6px 0 0",
        verticalAlign: "middle"
      }
    },
    "& p": {
      fontSize: "20px",
      lineHeight: "32px",
      textAlign: "center",

      "& img": {
        margin: "4px 12px 12px 0"
      }
    },
    "& input": {
      boxSizing: "border-box",
      fontSize: "20px",
      lineHeight: "24px",
      padding: "16px",
      border: "1px solid #979797"
    }
  },
  deleteCopy: {
    color: "#B64E38",
    "& span": {
      fontStyle: "italic"
    }
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "42px",
    "& button": {
      fontFamily: "Calibri Bold",
      letterSpacing: "2px",
      height: "60px",
      display: "inline",
      margin: 0,
      border: "none",
      fontSize: "20px",
      lineHeight: "24px",
      textAlign: "center",
      cursor: "pointer",
      textTransform: "uppercase"
    }
  },
  createBtn: {
    width: "200px",
    backgroundColor: "#A7C539",
    color: "#000000",
    boxShadow: "0px 6px 4px rgba(0, 46, 109, 0.3)"
  },
  cancelBtn: {
    width: "140px",
    backgroundColor: "transparent",
    color: "rgba(0, 0, 0, 0.5)"
  },
  deleteBtn: {
    width: "200px",
    backgroundColor: "#E46247",
    boxShadow: "0px 6px 4px rgba(0, 46, 109, 0.3)"
  },
  closeBtn: {
    position: "absolute",
    top: "24px",
    right: "24px",
    backgroundColor: "transparent",
    border: "none"
  }
});

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    position: "relative",
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
    boxSizing: "border-box",
    maxHeight: "420px",
    width: "666px",
    maxWidth: "100%",
    padding: "60px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)"
  }
};

const Projects = ({ account, history }) => {
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

  const email = account.email;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const expiredTokenRedirect = useCallback(() => {
    toast.add(
      "For your security, your session has expired. Please log in again."
    );
    history.push(`/login/${encodeURIComponent(email)}`);
  }, [toast, history]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const result = await projectService.get();
        setProjects(result.data);
      } catch (err) {
        // If user's session token has expired or they are not
        // authorized for this web api request, let them know
        // and redirect to login
        if (err.response && err.response.status === 401) {
          expiredTokenRedirect();
        }
        console.error(err);
      }
    };
    getProjects();
  }, [expiredTokenRedirect, selectedProject, duplicateProjectName]);

  const toggleDuplicateModal = async project => {
    if (project) {
      setSelectedProject(project);
      // setDuplicateProjectName(`${project.name} (COPY)`);
    } else {
      setSelectedProject(null);
    }
    setDuplicateModalOpen(!duplicateModalOpen);
  };

  const toggleDeleteModal = project => {
    project ? setSelectedProject(project) : setSelectedProject(null);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const duplicateProject = async project => {
    const jsonProject = JSON.parse(project.formInputs);
    jsonProject.PROJECT_NAME = duplicateProjectName;

    await projectService.post({
      ...project,
      name: duplicateProjectName,
      formInputs: JSON.stringify(jsonProject)
    });
    toggleDuplicateModal();
    setSelectedProject(null);
  };

  const deleteProject = async project => {
    await projectService.del(project.id);
    toggleDeleteModal();
    setSelectedProject(null);
  };

  const handleDuplicateProjectNameChange = newProjectName => {
    setDuplicateProjectName(newProjectName);
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
    project["dateCreated"] = moment(project["dateCreated"]).format(
      "M/DD/YYYY h:mm A"
    );
    project["dateModified"] = moment(project["dateModified"]).format(
      "M/DD/YYYY h:mm A"
    );

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
        <img className={classes.searchIcon} src={SearchIcon} alt="" />
      </div>
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
          {Boolean(projects.length) &&
            stableSort(
              projects.filter(filterProjects),
              getComparator(order, orderBy)
            ).map(project => (
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
                  {moment(project.dateModified).format("MM/DD/YYYY") ===
                  moment().format("MM/DD/YYYY")
                    ? moment(project.dateModified).format("h:mm A")
                    : moment(project.dateModified).format("MM/DD/YYYY")}
                </td>
                <td className={classes.actionIcons}>
                  {project.loginId === currentUser.id && (
                    <>
                      <button onClick={() => toggleDuplicateModal(project)}>
                        <img src={CopyIcon} alt="Duplicate Project" />
                      </button>
                      <button onClick={() => toggleDeleteModal(project)}>
                        <img src={DeleteIcon} alt="Delete Project" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={duplicateModalOpen}
        onRequestClose={toggleDuplicateModal}
        contentLabel="Duplicate Modal"
        style={modalStyles}
        className={classes.modal}
      >
        <button className={classes.closeBtn} onClick={toggleDuplicateModal}>
          <img src={CloseIcon} alt="Close" />
        </button>
        <h2>
          <img src={CopyIcon} /> Duplicate Project
        </h2>
        <p>
          Type a new name to duplicate the project,&nbsp;
          <br />
          <strong>{selectedProject && selectedProject.name}</strong>.
        </p>
        <form>
          <input
            placeholder="Name of Duplicated Project"
            type="text"
            id="duplicateName"
            name="duplicateName"
            value={duplicateProjectName}
            onChange={e => handleDuplicateProjectNameChange(e.target.value)}
          />
          <div className={classes.modalActions}>
            <button
              onClick={toggleDuplicateModal}
              className={classes.cancelBtn}
            >
              Cancel
            </button>
            <button
              className={classes.createBtn}
              onClick={() => duplicateProject(selectedProject)}
            >
              Create a Copy
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={toggleDeleteModal}
        contentLabel="Delete Modal"
        style={modalStyles}
        className={classes.modal}
      >
        <button className={classes.closeBtn} onClick={toggleDeleteModal}>
          <img src={CloseIcon} alt="Close" />
        </button>
        <h2>
          <img src={DeleteIcon} /> Delete Project
        </h2>
        <p className={classes.deleteCopy}>
          <img src={WarningIcon} className={classes.warningIcon} />
          Are you sure you want to <span>permanently</span> delete this project,
          &nbsp;
          <strong>{selectedProject && selectedProject.name}</strong>?
        </p>
        <div className={classes.modalActions}>
          <button onClick={toggleDeleteModal} className={classes.cancelBtn}>
            Cancel
          </button>
          <button
            className={classes.deleteBtn}
            onClick={() => deleteProject(selectedProject)}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

// Required to bind modal to our appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

Projects.propTypes = {
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

export default withRouter(Projects);
