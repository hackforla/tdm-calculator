import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  heading3: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "140%"
  },
  tableHead: {
    textAlign: "left"
  },
  tableCell: {
    padding: "0em 1em 0em 0em"
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

  const formatDates = date => {
    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
      .replace(",", "");
  };

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
      <table>
        <thead>
          <tr>
            <th></th>
            <th className={classes.tableHead}>Name</th>
            <th className={classes.tableHead}>Address</th>
            <th className={classes.tableHead}>Date Entered</th>
            <th className={classes.tableHead}>Date Modified</th>
          </tr>
        </thead>
        <tbody>
          {augmentedProjects.map(project => (
            <tr key={project.id}>
              <td className={classes.tableCell}>
                <input
                  type="checkbox"
                  value={false}
                  checked={project.isSelected}
                  onChange={onSelect}
                  name={project.id}
                  id={project.id}
                />
              </td>
              <td className={classes.tableCell}>{project.name}</td>
              <td className={classes.tableCell}>
                {JSON.parse(project.formInputs)["PROJECT_ADDRESS"]}
              </td>
              <td className={classes.tableCell}>
                {formatDates(project.dateCreated)}
              </td>
              <td className={classes.tableCell}>
                {formatDates(project.dateModified)}
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
