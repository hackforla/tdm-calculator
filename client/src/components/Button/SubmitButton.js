import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const SubmitButton = ({ id, onClick, isDisabled, isDisplayed, color }) => {
  return (
    <>
      <Button
        type="input"
        color={color}
        onClick={onClick}
        id={id}
        data-testid={id}
        disabled={isDisabled}
        isDisplayed={isDisplayed}
      >
        SUBMIT
      </Button>
    </>
  );
};

SubmitButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  isDisabled: PropTypes.bool,
  isDisplayed: PropTypes.bool.isRequired
};

export default SubmitButton;
