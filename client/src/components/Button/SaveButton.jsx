import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const SaveButton = ({ id, onClick, isDisabled, isDisplayed, color }) => {
  return (
    <Button
      type="input"
      color={color}
      variant="contained"
      onClick={onClick}
      id={id}
      data-testid={id}
      disabled={isDisabled}
      isDisplayed={isDisplayed}
    >
      Save Project
    </Button>
  );
};

SaveButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
  color: PropTypes.string
};

export default SaveButton;
