import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const ProjectsList = ({ projects, setSelectedProjects, selectedProjects }) => {
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
      <h3>Select Relevant Projects:</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Address</th>
            <th style={{ textAlign: "left" }}>Date Entered</th>
            <th style={{ textAlign: "left" }}>Date Modified</th>
          </tr>
        </thead>
        <tbody>
          {augmentedProjects.map(project => (
            <tr key={project.id}>
              <td
                style={{
                  padding: "0em 1em 0em 0em"
                }}
              >
                <input
                  type="checkbox"
                  value={false}
                  checked={project.isSelected}
                  onChange={onSelect}
                  name={project.id}
                  id={project.id}
                />
              </td>
              <td
                style={{
                  padding: "0em 1em 0em 0em"
                }}
              >
                {project.name}
              </td>
              <td style={{ padding: "0em 1em 0em 0em" }}>
                {JSON.parse(project.formInputs)["PROJECT_ADDRESS"]}
              </td>
              <td style={{ padding: "0em 1em 0em 0em" }}>
                {moment(project.dateCreated).format("MM/DD/YYYY h:mm A")}
              </td>
              <td style={{ padding: "0em 1em 0em 0em" }}>
                {moment(project.dateModified).format("MM/DD/YYYY h:mm A")}
              </td>
              {/* <td>{JSON.stringify(project, null, 2)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <p>Selected Projects: {selectedProjects.join(", ")}</p> */}
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
