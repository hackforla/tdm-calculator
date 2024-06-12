import React, { useRef } from "react";
import PropTypes from "prop-types";
import NavButton from "../Button/NavButton";
import SaveButton from "../Button/SaveButton";
import { createUseStyles } from "react-jss";
import PrintButton from "../Button/PrintButton";
import ReactToPrint from "react-to-print";
import { PdfPrint } from "../PdfPrint/PdfPrint";
import { DateTime } from "luxon";

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
  },
  datesStatus: {
    width: "90%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "7px"
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
  setDisplayPrintButton,
  onSave,
  dateModified,
  dateSnapshotted
}) => {
  const classes = useStyles();
  const componentRef = useRef();
  const projectNameRule = rules && rules.find(r => r.code === "PROJECT_NAME");
  const projectName = projectNameRule
    ? projectNameRule.value
    : "TDM Calculation Summary";
  const formattedDateSnapshot = dateSnapshotted
    ? DateTime.fromFormat(dateSnapshotted, "MM/dd/yyyy h:mm a").toFormat(
        "yyyy-MM-dd, h:mm a"
      )
    : "";
  const formattedDateModified = dateModified
    ? DateTime.fromFormat(dateModified, "MM/dd/yyyy h:mm a").toFormat(
        "yyyy-MM-dd, HH:mm:ss"
      )
    : "";

  return (
    <>
      <div id="all-buttons-wrapper" className={classes.allButtonsWrapper}>
        {rules && rules.length ? ( //navigation disabled until rules have loaded
          <>
            <div id="nav-container" className="space-between">
              <NavButton
                id="leftNavArrow"
                navDirection="previous"
                color="colorPrimary"
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
                color="colorPrimary"
                isVisible={page !== 5}
                isDisabled={setDisabledForNextNavButton()}
                onClick={() => {
                  onPageChange(Number(page) + 1);
                }}
              />
            </div>
            <ReactToPrint
              trigger={() => (
                <PrintButton
                  id="PrintButton"
                  isDisplayed={setDisplayPrintButton()}
                />
              )}
              content={() => componentRef.current}
              documentTitle={projectName}
              bodyClass="printContainer"
              pageStyle=".printContainer {overflow: hidden;}"
            />
            <div style={{ display: "none" }}>
              <PdfPrint
                ref={componentRef}
                rules={rules}
                dateModified={dateModified}
              />
            </div>
            <SaveButton
              id="saveButton"
              color="colorPrimary"
              isDisabled={setDisabledSaveButton()}
              isDisplayed={setDisplaySaveButton()}
              onClick={onSave}
            />
          </>
        ) : null}
      </div>

      {page === 5 && formattedDateModified !== "Invalid DateTime" ? (
        <div className={classes.datesStatus}>
          {formattedDateSnapshot !== "Invalid DateTime" ? (
            <div>
              <strong>Snapshot Created: </strong>
              {formattedDateSnapshot} Pacific Time
            </div>
          ) : (
            ""
          )}
          <div>
            <strong>Date Last Saved: </strong>
            {formattedDateModified} Pacific Time
          </div>
        </div>
      ) : (
        ""
      )}
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
  setDisplayPrintButton: PropTypes.any,
  onSave: PropTypes.any,
  onDownload: PropTypes.any,
  dateModified: PropTypes.any,
  dateSnapshotted: PropTypes.string
};

export default WizardFooter;
