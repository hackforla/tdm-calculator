import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const SaveButton = ({ id, onClick, isDisabled }) => {
  return (
    <Button
      type="input"
      color={!isDisabled ? "colorPrimary" : "colorDisabled"}
      variant="contained"
      onClick={onClick}
      id={id}
      data-testid={id}
      disabled={isDisabled}
    >
      Save Project
    </Button>
  );
};

SaveButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default SaveButton;
