import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { createUseStyles } from "react-jss";
import * as projectService from "../services/project.service";
import moment from "moment";
import { useToast } from "../contexts/Toast";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "calc(100vh - 103px - 48px)"
  },
  table: {
    minWidth: "80%",
    margin: "20px"
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
    backgroundColor: "#0f2940",
    color: "white",
    "& td": {
      padding: ".4em"
    }
  },
  theadLabel: {
    cursor: "pointer"
  },
  sortArrow: {
    color: "rgba(255,255,255,0.5)"
  },
  tbody: {
    "& tr td": {
      padding: ".4em 0"
    },
    "& tr:hover": {
      background: "#f0e300"
    }
  },
  link: {
    textDecoration: "underline"
  },
  pageTitle: {
    marginTop: "2em"
  },
  pageSubtitle: {
    marginTop: "0.5em",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "normal",
    fontStyle: "normal"
  },
  searchBar: {
    width: "50%",
    padding: "12px",
    margin: "12px"
  }
});

const Projects = ({ account, history }) => {
  const [projects, setProjects] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("dateCreated");
  const classes = useStyles();
  const toast = useToast();

  const email = account.email;

  const expiredTokenRedirect = useCallback(() => {
    toast.add(
      "For your security, your session has expired. Please log in again."
    );
    history.push(`/login/${encodeURIComponent(email)}`);
  }, []);

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
  }, [expiredTokenRedirect]);

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
      <input
        className={classes.searchBar}
        type="search"
        id="filterText"
        name="filterText"
        placeholder="Search"
        value={filterText}
        onChange={e => handleFilterTextChange(e.target.value)}
      />
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
                      <span>&nbsp; &darr;</span>
                    ) : (
                      <span>&nbsp; &uarr;</span>
                    )}
                  </span>
                ) : (
                  <span className={classes.sortArrow}>&nbsp; &#x2195;</span>
                )}
              </td>
            ))}
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

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
