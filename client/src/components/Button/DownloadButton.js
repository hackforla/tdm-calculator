import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { MdPrint } from "react-icons/md";

const DownloadButton = ({ id, onClick, isDisplayed }) => {
  return (
    <Button
      type="input"
      color={"colorDisabled"}
      variant="download"
      id={id}
      onClick={onClick}
      data-testid={id}
      isDisplayed={isDisplayed}
    >
      <MdPrint style={{ marginRight: "0.5em" }} />
      Print Summary
    </Button>
  );
};

DownloadButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
  ref: PropTypes.string,
  id: PropTypes.string.isRequired,
  isDisplayed: PropTypes.bool.isRequired
};

export default DownloadButton;
