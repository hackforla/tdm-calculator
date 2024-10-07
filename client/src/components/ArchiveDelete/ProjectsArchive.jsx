import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import * as projectService from "../../services/project.service";
import { useToast } from "../../contexts/Toast";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
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
  thead: {
    fontWeight: "bold",
    backgroundColor: "#0f2940",
    color: "white",
    "& td": {
      padding: ".4em"
    }
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
  }
});

const ProjectsArchive = () => {
  const [archivedProjects, setArchivedProjects] = useState([]);

  const classes = useStyles();
  // const toast = useToast();
  const { add } = useToast();

  useEffect(() => {
    const getArchivedProjects = async () => {
      try {
        const response = await projectService.getAllArchivedProjects();
        if (response.status === 200) {
          setArchivedProjects(response.data);
        } else {
          add("Failed to get archived projects.");
        }
      } catch (err) {
        add("Error - Could not display archived projects.");
      }
    };
    getArchivedProjects();
  }, [add]);

  return (
    <div className={classes.main}>
      <h1 className={classes.pageTitle}>Archived Projects</h1>
      <div className={classes.pageSubtitle}>
        <Link to="/roles" className={classes.link}>
          Return to Active Accounts
        </Link>
      </div>
      <div className={classes.pageSubtitle}>
        <Link to="/archivedaccounts" className={classes.link}>
          See Archived Users
        </Link>
      </div>

      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classes.tr}>
            <td className={classes.td}>Name</td>
            <td className={classes.td}>Address</td>
            <td className={classes.td}>Created By</td>
            <td className={classes.td}>Created On</td>
            <td className={classes.td}>Last Modified</td>
            <td className={classes.td}>Archive Date</td>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {archivedProjects.map(project => (
            <tr key={project.id}>
              <td className={classes.td}>{project.name}</td>
              <td className={classes.td}>{project.address}</td>
              <td
                className={classes.td}
              >{`${project.lastName}, ${project.firstName}`}</td>
              <td className={classes.td}>
                {new Date(project.dateCreated).toLocaleDateString()}
              </td>
              <td className={classes.td}>
                {new Date(project.dateModified).toLocaleDateString()}
              </td>
              <td className={classes.td}>
                {new Date(project.archivedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsArchive;
