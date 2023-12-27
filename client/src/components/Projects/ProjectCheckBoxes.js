import React from "react";
import PropTypes from "prop-types";

const ProjectCheckBoxes = ({ project, isChecked, handleCheckboxChange }) => {
  return (
    <>
      <input
        style={{
          height: "15px",
          width: "20px"
        }}
        type="checkbox"
        checked={isChecked}
        onChange={() => handleCheckboxChange(project.id)}
      />
    </>
  );
};

ProjectCheckBoxes.propTypes = {
  project: PropTypes.object.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired
};

export default ProjectCheckBoxes;
