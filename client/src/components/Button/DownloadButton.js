import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const DownloadButton = ({ id, onClick, isDisabled, isDisplayed }) => {
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
      <FontAwesomeIcon icon={faFileDownload} style={{ marginRight: "0.5em" }} />
      Download Summary
    </Button>
  );
};

DownloadButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isDisplayed: PropTypes.bool.isRequired
};

export default DownloadButton;
