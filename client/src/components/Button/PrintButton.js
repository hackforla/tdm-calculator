import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const PrintButton = ({ id, onClick, isDisabled, isDisplayed }) => {
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
      <FontAwesomeIcon icon={faPrint} style={{ marginRight: "0.5em" }} />
      Print Summary
    </Button>
  );
};

PrintButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isDisplayed: PropTypes.bool.isRequired
};

export default PrintButton;
