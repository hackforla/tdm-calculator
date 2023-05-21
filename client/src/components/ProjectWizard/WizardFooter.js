import React, { useRef } from "react";
import PropTypes from "prop-types";
import NavButton from "../Button/NavButton";
import SaveButton from "../Button/SaveButton";
import { createUseStyles } from "react-jss";
// import { faClock } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DownloadButton from "../Button/DownloadButton";
import ReactToPrint from "react-to-print";
import { Pdf } from "../Pdf/Pdf";

const useStyles = createUseStyles({
  allButtonsWrapper: {
    display: "flex",
    alignItems: "center",
    margin: "3em 0",
    width: "80%",
    justifyContent: "center"
  },
  pageNumberCounter: {
    fontSize: "24px",
    margin: "auto",
    fontWeight: "bold",
    padding: "0px 12px"
  },
  lastSaved: {
    fontSize: "14px",
    color: "#6F6C64"
  },
  lastSavedContainer: {
    margin: "0 auto"
  }
});

const WizardFooter = ({
  rules,
  page,
  onPageChange,
  pageNumber,
  setDisabledForNextNavButton,
  setDisabledSaveButton,
  setDisplaySaveButton,
  setDisplayDownloadButton,
  onSave,
  dateModified
}) => {
  const classes = useStyles();
  const componentRef = useRef();

  return (
    <>
      <div id="all-buttons-wrapper" className={classes.allButtonsWrapper}>
        {rules && rules.length ? ( //navigation disabled until rules have loaded
          <>
            <div id="nav-container" className="space-between">
              <NavButton
                id="leftNavArrow"
                navDirection="previous"
                isVisible={page !== 1}
                isDisabled={Number(page) === 1}
                onClick={() => {
                  onPageChange(Number(page) - 1);
                }}
              />
              <div className={classes.pageNumberCounter}>
                Page {pageNumber}/5
              </div>
              <NavButton
                id="rightNavArrow"
                navDirection="next"
                isVisible={page !== 6}
                isDisabled={setDisabledForNextNavButton()}
                onClick={() => {
                  onPageChange(Number(page) + 1);
                }}
              />
            </div>
            <ReactToPrint
              trigger={() => (
                <DownloadButton
                  id="downloadButton"
                  isDisplayed={setDisplayDownloadButton()}
                />
              )}
              content={() => componentRef.current}
            />
            {/* <div> */}
            <div style={{ display: "none" }}>
              <Pdf
                ref={componentRef}
                rules={rules}
                dateModified={dateModified}
              />
            </div>
            <SaveButton
              id="saveButton"
              isDisabled={setDisabledSaveButton()}
              isDisplayed={setDisplaySaveButton()}
              onClick={onSave}
            />
          </>
        ) : null}
      </div>
      {/* <div className={classes.lastSavedContainer}>
        {dateModified && (
          <span className={classes.lastSaved}>
            <FontAwesomeIcon icon={faClock} /> &nbsp;Last saved: {dateModified}
          </span>
        )}
      </div> */}
    </>
  );
};

// TODO:
WizardFooter.propTypes = {
  classes: PropTypes.any,
  rules: PropTypes.any,
  page: PropTypes.any,
  onPageChange: PropTypes.any,
  pageNumber: PropTypes.any,
  setDisabledForNextNavButton: PropTypes.any,
  setDisabledSaveButton: PropTypes.any,
  setDisplaySaveButton: PropTypes.any,
  setDisplayDownloadButton: PropTypes.any,
  onSave: PropTypes.any,
  onDownload: PropTypes.any,
  dateModified: PropTypes.any
};

export default WizardFooter;
