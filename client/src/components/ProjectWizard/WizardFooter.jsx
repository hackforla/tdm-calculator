import React, { useRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import NavButton from "../Button/NavButton";
import { createUseStyles } from "react-jss";
import Button from "../Button/Button";
import ReactToPrint from "react-to-print";
import { PdfPrint } from "../PdfPrint/PdfPrint";
import { formatDatetime } from "../../helpers/util";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "../../hooks/useErrorHandler";
import * as projectService from "../../services/project.service.js";
import WarningProjectSubmit from "./WarningProjectSubmit.jsx";
import WarningTargetNotReached from "./WarningTargetNotReached.jsx";

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
  setDisabledSubmitButton,
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
  const email = userContext.account ? userContext.account.email : "";
  const navigate = useNavigate();
  const handleError = useErrorHandler(email, navigate);
  const loggedInUserId = userContext.account?.id;
  // const [selectedProject, setSelectedProject] = useState(null);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [targetNotReachedModalOpen, setTargetNotReachedModalOpen] =
    useState(false);

  const handleSubmitClick = () => {
    setDisabledSubmitButton()
      ? handleTargetNotReachedModalOpen()
      : handleSubmitModalOpen(project);
  };

  const handleSubmitModalOpen = () => {
    // setSelectedProject(project);
    setSubmitModalOpen(true);
  };

  const handleSubmitModalClose = async action => {
    if (action === "ok") {
      try {
        await projectService.submit({ id: project.id });
        // await updateProject();
      } catch (err) {
        handleError(err);
      }
    }
    setSubmitModalOpen(false);
  };

  const handleTargetNotReachedModalOpen = () => {
    setTargetNotReachedModalOpen(true);
  };

  const handleTargetNotReachedModalClose = action => {
    if (action === "ok") {
      setTargetNotReachedModalOpen(false);
    }
  };

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
              id="submitButton"
              variant="tertiary"
              disabled={setDisabledSubmitButton}
              isDisplayed={setDisplaySubmitButton}
              onClick={handleSubmitClick}
            >
              Submit
            </Button>
            <Button
              id="saveButton"
              variant="primary"
              disabled={setDisabledSaveButton()}
              isDisplayed={setDisplaySaveButton()}
              onClick={onSave}
            >
              Save Project
            </Button>
            <WarningProjectSubmit
              mounted={submitModalOpen}
              onClose={handleSubmitModalClose}
              project={project}
            />
            <WarningTargetNotReached
              mounted={targetNotReachedModalOpen}
              onClose={handleTargetNotReachedModalClose}
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
  setDisabledSubmitButton: PropTypes.any,
  setDisplaySubmitButton: PropTypes.any,
  onSave: PropTypes.any,
  submitModalOpen: PropTypes.any,
  handleSubmitModalOpen: PropTypes.any,
  handleSubmitModalClose: PropTypes.any,
  targetNotReachedModalOpen: PropTypes.any,
  handleTargetNotReachedModalOpen: PropTypes.any,
  handleTargetNotReachedModalClose: PropTypes.any,
  showCopyAndEditSnapshot: PropTypes.func,
  onDownload: PropTypes.any,
  project: PropTypes.any,
  selectProject: PropTypes.any,
  shareView: PropTypes.bool
};

export default WizardFooter;
