import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon icon={faFileDownload} style={{ marginRight: "0.5em" }} />
      Download Summary
    </Button>
  );
};

DownloadButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
  ref: PropTypes.any,
  id: PropTypes.string.isRequired,
  isDisplayed: PropTypes.bool.isRequired
};

export default DownloadButton;
