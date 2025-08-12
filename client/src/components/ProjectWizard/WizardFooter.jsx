import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import NavButton from "../Button/NavButton";
import { createUseStyles } from "react-jss";
import Button from "../Button/Button";
import ReactToPrint from "react-to-print";
import { PdfPrint } from "../PdfPrint/PdfPrint";
import { formatDatetime } from "../../helpers/util";
import UserContext from "../../contexts/UserContext";
import Popup from "reactjs-popup";
import ProjectContextMenu from "../Projects/ProjectContextMenu";
import useErrorHandler from "../../hooks/useErrorHandler";

import CsvModal from "../Modals/ActionProjectsCsv";
import WarningProjectDelete from "../Modals/WarningProjectDelete";
import SnapshotProjectModal from "../Modals/ActionProjectSnapshot";
import RenameSnapshotModal from "../Modals/ActionSnapshotRename";
import ShareSnapshotModal from "../Modals/ActionSnapshotShare";
import WarningSnapshotSubmit from "../Modals/WarningSnapshotSubmit";
import InfoTargetNotReached from "../Modals/InfoTargetNotReached";
import InfoSnapshotSubmit from "components/Modals/InfoSnapshotSubmitted";
import CopyProjectModal from "../Modals/ActionProjectCopy";

import * as projectService from "../../services/project.service";
import * as projectResultService from "../../services/projectResult.service";

const useStyles = createUseStyles({
  allButtonsWrapper: {
    display: "flex",
    alignItems: "center",
    margin: "1.5em 0",
    width: "80%",
    justifyContent: "center"
  },
  pageNumberCounter: {
    fontSize: "24px",
    margin: "auto",
    fontWeight: "bold",
    padding: "0px 12px"
  },
  datesStatus: {
    width: "90%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "7px"
  },
  popover: {
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    boxShadow:
      "10px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)"
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
  onSave,
  showCopyAndEditSnapshot,
  showSubmitModal,
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
  const loggedInUserId = userContext.account?.id || null;

  const email = userContext.account ? userContext.account.email : "";
  const navigate = useNavigate();
  const handleError = useErrorHandler(email, navigate);

  const [snapshotModalOpen, setSnapshotModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [successModelOpen, setSuccessModelOpen] = useState(false);
  const [targetNotReachedModalOpen, setTargetNotReachedModalOpen] =
    useState(false);
  const [renameSnapshotModalOpen, setRenameSnapshotModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [shareSnapshotModalOpen, setShareSnapshotModalOpen] = useState(false);

  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const isAdmin = userContext.account?.isAdmin || false;

  const setDisabledSubmitButton = () => {
    // PMs and Designers are still deciding whether to use a tooltlip to indicate that target points are not met.
    const projectSubmitted = !!project.dateSubmitted;
    // const targetPoints = project.targetPoints;
    // const earnedPoints = project.earnedPoints;
    // const setDisabled =
    //   !project.dateSnapshotted ||
    //   projectSubmitted ||
    //   earnedPoints < targetPoints;
    // return setDisabled;
    return !project.dateSnapshotted || projectSubmitted;
  };

  const setDisplaySubmitButton = () => {
    if (
      page === 5 &&
      project.dateSnapshotted &&
      !project.dateSubmitted &&
      project.loginId === loggedInUserId
    ) {
      return true;
    }
    return false;
  };

  const handleRenameSnapshotModalOpen = () => {
    setRenameSnapshotModalOpen(true);
  };

  const handleRenameSnapshotModalClose = async (action, newProjectName) => {
    if (action === "ok") {
      try {
        await projectService.renameSnapshot({
          id: project.id,
          name: newProjectName
        });
      } catch (err) {
        handleError(err);
      }
    }
    setRenameSnapshotModalOpen(false);
  };

  const handleShareSnapshotModalOpen = () => {
    setShareSnapshotModalOpen(true);
  };

  const handleShareSnapshotModalClose = async () => {
    setShareSnapshotModalOpen(false);
  };

  const handleSubmitModalOpen = () => {
    if (project.earnedPoints >= project.targetPoints) {
      setSubmitModalOpen(true);
    } else {
      setTargetNotReachedModalOpen(true);
    }
  };

  const handleSubmitModalClose = async action => {
    if (action === "ok") {
      // await updateProjects();
      setSuccessModelOpen(true);
    }
    setSubmitModalOpen(false);
  };

  const handleCsvModalOpen = () => {
    setCsvModalOpen(true);
  };

  const handleCsvModalClose = async () => {
    setCsvModalOpen(false);
  };

  const handleSnapshotModalClose = async () => {
    // if (action === "ok") {
    //   try {
    //     await projectService.snapshot({
    //       id: selectedProject.id,
    //       name: newProjectName
    //     });
    //     await updateProjects();
    //     setSelectedProject(null);
    //   } catch (err) {
    //     handleError(err);
    //   }
    // }
    setSnapshotModalOpen(false);
  };

  const handleSnapshotModalOpen = () => {
    setSnapshotModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModelOpen(false);
  };

  const handleCopyModalOpen = () => {
    setCopyModalOpen(true);
  };

  const handleCopyModalClose = async (action, newProjectName) => {
    let newSelectedProject = { ...project };
    if (action === "ok") {
      const projectFormInputsAsJson = JSON.parse(project.formInputs);
      projectFormInputsAsJson.PROJECT_NAME = newProjectName;
      if (!project.targetPoints) {
        await projectResultService.populateTargetPoints(project);
        newSelectedProject = await projectService.getById(project.id);
      }
      let newProject = {
        ...newSelectedProject,
        loginId: loggedInUserId,
        name: newProjectName,
        formInputs: JSON.stringify(projectFormInputsAsJson)
      };
      if (!newProject.description) {
        newProject.description = "";
      }
      try {
        await projectService.post(newProject);
      } catch (err) {
        handleError(err);
      }
    }
    setCopyModalOpen(false);
  };

  const handleHide = async project => {
    try {
      const projectIDs = [project.id];
      const dateHidden = !project.dateHidden;

      await projectService.hide(projectIDs, dateHidden);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = async action => {
    if (action === "ok") {
      const projectIDs = [project.id];
      const dateTrashed = !project.dateTrashed;
      try {
        await projectService.trash(projectIDs, dateTrashed);
      } catch (err) {
        handleError(err);
      }
    }
    setDeleteModalOpen(false);
  };

  return (
    <>
      <>
        <CsvModal
          mounted={csvModalOpen}
          onClose={handleCsvModalClose}
          project={project}
        />
        <CopyProjectModal
          mounted={copyModalOpen}
          onClose={handleCopyModalClose}
          selectedProjectName={project.name}
        />
        <WarningProjectDelete
          mounted={deleteModalOpen}
          onClose={handleDeleteModalClose}
          project={project}
        />
        <SnapshotProjectModal
          mounted={snapshotModalOpen}
          onClose={handleSnapshotModalClose}
          selectedProjectName={project}
        />
        <RenameSnapshotModal
          mounted={renameSnapshotModalOpen}
          onClose={handleRenameSnapshotModalClose}
          selectedProjectName={project.name}
        />
        <ShareSnapshotModal
          mounted={shareSnapshotModalOpen}
          onClose={handleShareSnapshotModalClose}
          project={project}
        />
        <WarningSnapshotSubmit
          mounted={submitModalOpen}
          onClose={handleSubmitModalClose}
          project={project}
        />
        <InfoTargetNotReached
          mounted={targetNotReachedModalOpen}
          onClose={() => setTargetNotReachedModalOpen(false)}
          project={project}
        />
        <InfoSnapshotSubmit
          mounted={successModelOpen}
          onClose={handleSuccessModalClose}
          project={project}
        />
      </>
      <div id="all-buttons-wrapper" className={classes.allButtonsWrapper}>
        {rules && rules.length ? ( //navigation disabled until rules have loaded
          <>
            <div id="nav-container" className="space-between">
              <NavButton
                id="leftNavArrow"
                navDirection="previous"
                color="colorPrimary"
                isVisible={
                  page !== 1 &&
                  !project.dateSnapshotted &&
                  (!shareView || isAdmin)
                }
                isDisabled={
                  (shareView && !isAdmin) ||
                  !!project.dateSnapshotted ||
                  Number(page) === 1
                }
                onClick={() => {
                  onPageChange(Number(page) - 1);
                }}
              />
              {(!shareView || isAdmin) && !project.dateSnapshotted ? (
                <div className={classes.pageNumberCounter}>
                  Page {pageNumber}/5
                </div>
              ) : null}
              {/* Page {pageNumber}/5 */}
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
            {isFinalPage && (
              <div>
                <Popup
                  className={classes.popover}
                  trigger={
                    // needs element wrapped around Button so reactjs-popup has something to anchor on
                    <div>
                      <Button id="action" variant="tertiary">
                        ACTION
                      </Button>
                    </div>
                  }
                  position="left center"
                  on="hover"
                  arrow={true}
                >
                  {close => (
                    <ProjectContextMenu
                      project={project}
                      closeMenu={close}
                      handleCsvModalOpen={ev => handleCsvModalOpen(ev, project)}
                      handleHide={handleHide}
                      handleDeleteModalOpen={handleDeleteModalOpen}
                      handlePrintPdf={null}
                      handleSnapshotModalOpen={handleSnapshotModalOpen}
                      handleCopyModalOpen={handleCopyModalOpen}
                      handleRenameSnapshotModalOpen={
                        handleRenameSnapshotModalOpen
                      }
                      handleShareSnapshotModalOpen={
                        handleShareSnapshotModalOpen
                      }
                      handleSubmitModalOpen={handleSubmitModalOpen}
                    />
                  )}
                </Popup>
              </div>
            )}
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
              disabled={setDisabledSubmitButton()}
              isDisplayed={setDisplaySubmitButton()}
              onClick={showSubmitModal}
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
  onSave: PropTypes.any,
  submitModalOpen: PropTypes.any,
  handleSubmitModalOpen: PropTypes.any,
  handleSubmitModalClose: PropTypes.any,
  targetNotReachedModalOpen: PropTypes.any,
  showCopyAndEditSnapshot: PropTypes.func,
  showSubmitModal: PropTypes.func,
  onDownload: PropTypes.any,
  project: PropTypes.any,
  selectProject: PropTypes.any,
  shareView: PropTypes.bool
};

export default WizardFooter;
