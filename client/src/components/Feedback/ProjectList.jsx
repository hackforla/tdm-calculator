import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { formatDatetime } from "../../helpers/util";

const useStyles = createUseStyles({
  heading3: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "140%"
  },
  table: {
    overflow: "auto"
  },
  tableHead: {
    textAlign: "left",
    fontWeight: "600"
  },
  checkboxCell: {
    padding: "0em 1em 0.4rem 0em",
    width: "1rem",
    minWidth: "1rem",
    maxWidth: "1rem"
  },
  textCell: {
    padding: "0em 1em 0.4rem 0em",
    width: "20rem",
    minWidth: "20rem",
    maxWidth: "25rem"
  },
  dateCell: {
    padding: "0em 1em 0.4rem 0em",
    width: "10rem",
    minWidth: "10rem",
    maxWidth: "10rem"
  }
});

const ProjectsList = ({ projects, setSelectedProjects, selectedProjects }) => {
  const classes = useStyles();
  const [augmentedProjects, setAugmentedProjects] = useState(
    projects.map(project => ({
      ...project,
      isSelected: selectedProjects.includes(project.id)
    }))
  );

  const onSelect = event => {
    const value = event.target.checked;
    const id = Number(event.target.name);

    setAugmentedProjects(prev => {
      return prev
        .map(p => {
          if (p.id === id) {
            return { ...p, isSelected: value };
          }
          return p;
        })
        .sort((a, b) => {
          return a.dateModified > b.dateModified ? 1 : -1;
        });
    });

    setSelectedProjects(prev => {
      if (value) {
        return [...prev, id];
      }
      return prev.filter(p => p != id);
    });
  };

  return (
    <div>
      <h3 className={classes.heading3}>Select Relevant Projects:</h3>
      <table className={classes.table}>
        <thead>
          <tr>
            <th></th>
            <th className={classes.tableHead}>Name</th>
            <th className={classes.tableHead}>Address</th>
            <th className={classes.tableHead}>Date Entered</th>
            <th className={classes.tableHead}>Date Saved</th>
            <th className={classes.tableHead}>Date Submitted</th>
          </tr>
        </thead>
        <tbody>
          {augmentedProjects.map(project => (
            <tr key={project.id}>
              <td className={classes.checkboxCell}>
                <input
                  type="checkbox"
                  style={{ verticalAlign: "bottom" }}
                  value={false}
                  checked={project.isSelected}
                  onChange={onSelect}
                  name={project.id}
                  id={project.id}
                />
              </td>
              <td className={classes.textCell}>{project.name}</td>
              <td className={classes.textCell}>
                {JSON.parse(project.formInputs)["PROJECT_ADDRESS"]}
              </td>
              <td className={classes.dateCell}>
                {formatDatetime(project.dateCreated)}
              </td>
              <td className={classes.dateCell}>
                {formatDatetime(project.dateModified)}
              </td>
              <td className={classes.dateCell}>
                {formatDatetime(project.dateSubmitted)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      calculationId: PropTypes.number,
      dateCreated: PropTypes.string,
      dateModified: PropTypes.string,
      dateSubmitted: PropTypes.string,
      description: PropTypes.string,
      firstName: PropTypes.string,
      formInputs: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string,
      loginId: PropTypes.number,
      name: PropTypes.string
    })
  ),
  selectedProjects: PropTypes.array.isRequired,
  setSelectedProjects: PropTypes.func.isRequired
};

export default ProjectsList;
