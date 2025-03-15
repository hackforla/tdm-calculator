import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const CopyAndEditProject = ({ onClick }) => {
  return (
    <Button onClick={onClick} variant="download" color={"colorDisabled"}>
      Copy and Edit Snapshot
    </Button>
  );
};

CopyAndEditProject.propTypes = {
  onClick: PropTypes.func
};

export default CopyAndEditProject;
