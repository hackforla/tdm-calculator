import React, { useRef, useContext } from "react";
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
  handleCsvModalOpen,
  handleHide,
  handleDeleteModalOpen,
  handlePrintPdf,
  handleSnapshotModalOpen,
  handleRenameSnapshotModalOpen,
  handleShareSnapshotModalOpen,
  handleSubmitModalOpen,
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
                      handleCsvModalOpen={handleCsvModalOpen}
                      handleCopyModalOpen={showCopyAndEditSnapshot}
                      handleHide={handleHide}
                      handleDeleteModalOpen={handleDeleteModalOpen}
                      handlePrintPdf={handlePrintPdf}
                      handleSnapshotModalOpen={handleSnapshotModalOpen}
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
  handleCsvModalOpen: PropTypes.func,
  handleHide: PropTypes.func,
  handleDeleteModalOpen: PropTypes.func,
  handlePrintPdf: PropTypes.func,
  handleSnapshotModalOpen: PropTypes.func,
  handleRenameSnapshotModalOpen: PropTypes.func,
  handleShareSnapshotModalOpen: PropTypes.func,
  onDownload: PropTypes.any,
  project: PropTypes.any,
  selectProject: PropTypes.any,
  shareView: PropTypes.bool
};

export default WizardFooter;
