import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { createUseStyles } from "react-jss";
import * as projectService from "../services/project.service";
import moment from "moment";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
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
  }
});

const Projects = props => {
  const [projects, setProjects] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const result = await projectService.get();
        setProjects(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProjects();
  }, []);

  return (
    <div className={classes.main}>
      <h1 className={classes.pageTitle}>Projects</h1>
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classes.tr}>
            <td className={classes.td}>Name</td>
            <td className={classes.td}>Address</td>
            <td className={classes.td}>Version Number</td>
            <td className={classes.td}>Building Permit</td>
            <td className={classes.td}>Entered By</td>
            <td className={classes.tdRightAlign}>Created On</td>
            <td className={classes.tdRightAlign}>Last Modified</td>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {projects.length && projects.map(project => (
            <tr key={project.id}>
              <td className={classes.td}>
                <Link to={`/calculation/${project.id}`} className={classes.link}>
                  {project.name}
                </Link>
              </td>
              <td className={classes.td}>{project.address}</td>
              <td className={classes.td}>{JSON.parse(project.formInputs).VERSION_NO !== 'undefined' ? JSON.parse(project.formInputs).VERSION_NO : ''}</td>
              <td className={classes.td}>{JSON.parse(project.formInputs).BUILDING_PERMIT !== 'undefined' ? JSON.parse(project.formInputs).BUILDING_PERMIT : ''}</td>
              <td
                className={classes.td}
              >{`${project.firstName} ${project.lastName}`}</td>
              <td className={classes.tdRightAlign}>
                {moment(project.dateCreated).format("MM/DD/YYYY")}
              </td>
              <td className={classes.tdRightAlign}>
                {moment(project.dateModified).format("MM/DD/YYYY") == moment().format("MM/DD/YYYY") ? moment(project.dateModified).format("h:mm A") : moment(project.dateModified).format("MM/DD/YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(Projects);
