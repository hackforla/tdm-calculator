import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const SecondaryButton = ({
  id,
  onClick,
  isDisabled,
  isDisplayed = false,
  children
}) => {
  return (
    <Button
      type="input"
      onClick={onClick}
      id={id}
      data-testid={id}
      disabled={isDisabled}
      isDisplayed={isDisplayed}
    >
      {children}
    </Button>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isDisplayed: PropTypes.bool
};

export default SecondaryButton;
