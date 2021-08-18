import React from "react";
import PropTypes from "prop-types";
import NavButton from "../Button/NavButton";
import SaveButton from "../Button/SaveButton";
import { createUseStyles } from "react-jss";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = createUseStyles({
  allButtonsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2em 0"
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
  account,
  projectId,
  loginId,
  formIsDirty,
  projectIsValid,
  onSave,
  dateModified
}) => {
  const classes = useStyles();

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

            <SaveButton
              id="saveButton"
              isDisabled={
                !(
                  account.id &&
                  (!projectId || account.id === loginId) &&
                  formIsDirty &&
                  projectIsValid()
                )
              }
              onClick={onSave}
            />
          </>
        ) : null}
      </div>
      <div className={classes.lastSavedContainer}>
        {dateModified && (
          <span className={classes.lastSaved}>
            <FontAwesomeIcon icon={faClock} /> &nbsp;Last saved: {dateModified}
          </span>
        )}
      </div>
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
  account: PropTypes.any,
  projectId: PropTypes.any,
  loginId: PropTypes.any,
  formIsDirty: PropTypes.any,
  projectIsValid: PropTypes.any,
  onSave: PropTypes.any,
  dateModified: PropTypes.any
};

export default WizardFooter;
