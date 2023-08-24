import React from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

const ProjectsDropdown = ({
  projects,
  setSelectedProjects,
  selectedProjects
}) => {
  const handleProjectsChange = selectedOptions => {
    setSelectedProjects(selectedOptions);
  };

  const options = projects.map(project => ({
    value: project.id.toString(),
    label: project.name
  }));

  return (
    <div>
      <label htmlFor="projectDropdown">Select Projects:</label>
      <Dropdown
        options={options}
        selectedValues={selectedProjects}
        onSelectionChange={handleProjectsChange}
      />
      <p>Selected Projects: {selectedProjects.join(", ")}</p>
    </div>
  );
};

ProjectsDropdown.propTypes = {
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

export default ProjectsDropdown;
