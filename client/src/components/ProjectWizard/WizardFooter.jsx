import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";
import NavButton from "../Button/NavButton";
import SubmitButton from "../Button/SubmitButton";
import { createUseStyles } from "react-jss";
import Button from "../Button/Button";
import ReactToPrint from "react-to-print";
import { PdfPrint } from "../PdfPrint/PdfPrint";
import { formatDatetime } from "../../helpers/util";
import UserContext from "../../contexts/UserContext";

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
  isFinalPage,
  setDisabledForNextNavButton,
  setDisabledSaveButton,
  setDisplaySaveButton,
  setDisplaySubmitButton,
  onSave,
  showCopyAndEditSnapshot,
  project,
  shareView
}) => {
  const classes = useStyles();
  const componentRef = useRef();
  const projectNameRule = rules && rules.find(r => r.code === "PROJECT_NAME");
  const projectName = projectNameRule
    ? projectNameRule.value
    : "TDM Calculation Summary";
  const formattedDateSnapshotted = formatDatetime(project.dateSnapshotted);
  const formattedDateSubmitted = formatDatetime(project.dateSubmitted);
  const formattedDateModified = formatDatetime(project.dateModified);
  const userContext = useContext(UserContext);
  const loggedInUserId = userContext.account?.id;

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
                isDisabled={shareView || Number(page) === 1}
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
            {isFinalPage && project?.dateSnapshotted && (
              <Button
                id="copyAndEditSnapshot"
                onClick={showCopyAndEditSnapshot}
                variant="tertiary"
              >
                Copy and Edit Snapshot
              </Button>
            )}
            <ReactToPrint
              trigger={() => (
                <Button
                  id="PrintButton"
                  isDisplayed={isFinalPage}
                  variant="tertiary"
                >
                  Print Summary
                </Button>
              )}
              content={() => componentRef.current}
              documentTitle={projectName}
              bodyClass="printContainer"
              pageStyle=".printContainer {overflow: hidden;}"
            />
            <div style={{ display: "none" }}>
              <PdfPrint ref={componentRef} rules={rules} project={project} />
            </div>
            <Button
              id="saveButton"
              variant="primary"
              disabled={setDisabledSaveButton()}
              isDisplayed={setDisplaySaveButton()}
              onClick={onSave}
            >
              Save Project
            </Button>
            <SubmitButton
              id="submitButton"
              color="colorPrimary"
              isDisplayed={false && setDisplaySubmitButton()}
              onClick={() => null}
            />
          </>
        ) : null}
      </div>

      {page === 5 && formattedDateModified && loggedInUserId ? (
        <div className={classes.datesStatus}>
          <div className={classes.pdfTimeText}>
            <strong>Status: </strong>
            {!formattedDateSnapshotted
              ? "Draft"
              : project.loginId === loggedInUserId
                ? "Snapshot"
                : "Shared Snapshot"}
          </div>
          {formattedDateSubmitted ? (
            <div>
              <strong>Snapshot Submitted: </strong>
              {formattedDateSubmitted} Pacific Time
            </div>
          ) : null}
          {formattedDateSnapshotted ? (
            <div>
              <strong>Snapshot Created: </strong>
              {formattedDateSnapshotted} Pacific Time
            </div>
          ) : null}
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

WizardFooter.propTypes = {
  classes: PropTypes.any,
  rules: PropTypes.any,
  page: PropTypes.any,
  onPageChange: PropTypes.any,
  pageNumber: PropTypes.any,
  isFinalPage: PropTypes.bool,
  setDisabledForNextNavButton: PropTypes.any,
  setDisabledSaveButton: PropTypes.any,
  setDisplaySaveButton: PropTypes.any,
  setDisplaySubmitButton: PropTypes.any,
  onSave: PropTypes.any,
  showCopyAndEditSnapshot: PropTypes.func,
  onDownload: PropTypes.any,
  project: PropTypes.any,
  shareView: PropTypes.bool
};

export default WizardFooter;
