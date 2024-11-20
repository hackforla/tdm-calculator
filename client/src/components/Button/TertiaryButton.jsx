import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { MdPrint } from "react-icons/md";

const TertiaryButton = ({ id, onClick, isDisabled, isDisplayed, children }) => {
  return (
    <Button
      type="input"
      color={"colorDisabled"}
      variant="download"
      onClick={onClick}
      id={id}
      data-testid={id}
      disabled={isDisabled}
      isDisplayed={isDisplayed}
    >
      <MdPrint style={{ marginRight: "0.5em" }} />
      {children}
    </Button>
  );
};

TertiaryButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isDisplayed: PropTypes.bool.isRequired
};

export default TertiaryButton;
