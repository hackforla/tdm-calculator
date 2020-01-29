import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { createUseStyles } from "react-jss";
import * as projectService from "../services/project.service";
import moment from "moment";
import SortAndFilterProjects from "./SortAndFilterProjects";

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
    fontWeight: "bold"
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

const Projects = ({ account }) => {
  const [projects, setProjects] = useState([]);
  const [sort, setSort] = useState("dateModified");
  const [sortDirection, setSortDirection] = useState("up");
  const [filter, setFilter] = useState("dateModified");
  const [filterWords, setFilterWords] = useState("");

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

  const filterUserAndAdmin = project => {
    // TODO: remove this line when we want to hide projects from other users
    return true;
    if (account.isAdmin) {
      return true;
    }
    return account.id === project.loginId;
  };

  const filterWordsAndCategory = project => {
    if (filterWords) {
      if (filter === "dateCreated" || filter === "dateModified") {
        if (
          moment(project[filter])
            .format("M/DD/YYYY h:mm A")
            .includes(filterWords)
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (project[filter].toUpperCase().includes(filterWords.toUpperCase())) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const sortAscDesc = (a, b) => {
    let projectA = a[sort].toUpperCase();
    let projectB = b[sort].toUpperCase();

    if (sortDirection === "down") {
      [projectA, projectB] = [projectB, projectA];
    }

    if (projectA < projectB) {
      return -1;
    } else if (projectA > projectB) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div className={classes.main}>
      <h2 className={classes.pageTitle}>Projects</h2>
      <SortAndFilterProjects
        sort={sort}
        setSort={setSort}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        filter={filter}
        setFilter={setFilter}
        filterWords={filterWords}
        setFilterWords={setFilterWords}
      />
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
        <tbody>
          {projects
            .filter(filterUserAndAdmin)
            .filter(filterWordsAndCategory)
            .sort(sortAscDesc)
            .map(project => (
              <tr key={project.id}>
                {console.log(JSON.parse(project.formInputs))}
                <td className={classes.td}>
                  <Link
                    to={`/calculation/${project.id}`}
                    className={classes.link}
                  >
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
