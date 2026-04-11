import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";
import NavButton from "../Button/NavButton";
import { createUseStyles } from "react-jss";
import Button from "../Button/Button";
import { useReactToPrint } from "react-to-print";
import { PdfPrint } from "../PdfPrint/PdfPrint";
import Link from "../Link/Link";
import { formatDatetime } from "../../helpers/util";
import UserContext from "../../contexts/UserContext";
import Popup from "reactjs-popup";
import ProjectContextMenu from "../Projects/ProjectContextMenu";
import { useReplaceAriaAttribute } from "hooks/useReplaceAriaAttribute";
import { formatCalculation } from "../../helpers/Calculations";
import CalculationsContext from "../../contexts/CalculationsContext";

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
  },
  navButtonGroup: {
    display: "flex",
    alignItems: "center"
  },
  numberedNavButton: {
    margin: "0.2em",
    padding: "0.1em 0.3em",
    minHeight: "min-content",
    fontSize: "1.5rem"
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
  handleCsvModalOpen,
  handleHideModalOpen,
  handleDeleteModalOpen,
  handleSnapshotModalOpen,
  handleRenameSnapshotModalOpen,
  handleShareSnapshotModalOpen,
  handleSubmitModalOpen,
  handleDROModalOpenWithPreCheck,
  isDroCommitted,
  isSubmittingSnapshot,
  project,
  shareView
}) => {
  const classes = useStyles();
  const projectNameRule = rules && rules.find(r => r.code === "PROJECT_NAME");
  const projectName = projectNameRule
    ? projectNameRule.value
    : "TDM Calculation Summary";
  const projectLevelRule = rules && rules.find(r => r.code === "PROJECT_LEVEL");
  const projectLevel = projectLevelRule ? projectLevelRule.value : 0;
  const formattedDateSnapshotted = formatDatetime(project.dateSnapshotted);
  const formattedDateSubmitted = formatDatetime(project.dateSubmitted);
  const formattedDateModified = formatDatetime(project.dateModified);
  const userContext = useContext(UserContext);
  const calculations = useContext(CalculationsContext);
  const loggedInUserId = userContext.account?.id || null;
  const isAdmin = userContext.account?.isAdmin || false;
  const { firstName, lastName, email } = project;
  const elementId = `wizard-footer-action-button-${project.id}`;
  const popupContentId = `popup-content-${elementId}`;
  useReplaceAriaAttribute({
    elementId,
    deps: [project],
    attrToRemove: "aria-describedby",
    attrToAdd: "aria-controls",
    value: popupContentId
  });

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Project_${projectName}_Report`,
    bodyClass: "printContainer",
    pageStyle: ".printContainer {overflow: hidden;}"
  });

  const isDraft = !project.dateSnapshotted;

  // If the project exists and has been saved, AND a user is currently logged in
  const showNumberedLinks = !!project?.id && !!loggedInUserId;

  return (
    <>
      <div id="all-buttons-wrapper" className={classes.allButtonsWrapper}>
        {rules && rules.length ? ( //navigation disabled until rules have loaded
          <>
            <div id="nav-container" className="space-between">
              <div className={classes.navButtonGroup}>
                <NavButton
                  id="leftNavArrow"
                  navDirection="previous"
                  color="colorPrimary"
                  isVisible={
                    page !== 1 &&
                    isDraft &&
                    (!shareView || isAdmin)
                  }
                  isDisabled={
                    (shareView && !isAdmin) ||
                    !isDraft ||
                    Number(page) === 1
                  }
                  onClick={() => {
                    onPageChange(Number(page) - 1);
                  }}
                />

                {showNumberedLinks &&
                  Array.from({ length: 5 }, (_, i) => i + 1).map(p => (
                    <Link
                      key={`nav-page-${p}`}
                      id={`nav-page-${p}`}
                      className={classes.numberedNavButton}
                      onClick={() => onPageChange(p)}
                      isActive={p === Number(page)}
                      disabled={
                        (shareView && !isAdmin) ||
                        (p === 4 && projectLevel === 0) ||
                        (isDraft &&
                          p > Number(page) &&
                          setDisabledForNextNavButton())
                      }
                      ariaLabel={`go to page ${p}`}
                    >
                      {p}
                    </Link>
                  ))}
              </div>

              {(!shareView || isAdmin) && !project?.id ? (
                <div className={classes.pageNumberCounter}>
                  Page {Number.isNaN(pageNumber) ? 1 : pageNumber}/5
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
                  contentStyle={{ width: "238px" }}
                  trigger={
                    // needs element wrapped around Button so reactjs-popup has something to anchor on
                    <div id={elementId}>
                      <Button id="action" variant="tertiary">
                        ACTION
                      </Button>
                    </div>
                  }
                  position="left center"
                  arrow={true}
                >
                  {close => (
                    <ProjectContextMenu
                      id={popupContentId}
                      project={project}
                      closeMenu={close}
                      handleCsvModalOpen={handleCsvModalOpen}
                      handleCopyModalOpen={showCopyAndEditSnapshot}
                      handleHide={handleHideModalOpen}
                      handleDeleteModalOpen={handleDeleteModalOpen}
                      handlePrintPdf={handlePrint}
                      handleSnapshotModalOpen={handleSnapshotModalOpen}
                      handleRenameSnapshotModalOpen={
                        handleRenameSnapshotModalOpen
                      }
                      handleShareSnapshotModalOpen={
                        handleShareSnapshotModalOpen
                      }
                      handleSubmitModalOpen={handleSubmitModalOpen}
                      handleDROModalOpenWithPreCheck={
                        handleDROModalOpenWithPreCheck
                      }
                      isDroCommitted={isDroCommitted}
                      isSubmittingSnapshot={isSubmittingSnapshot}
                    />
                  )}
                </Popup>
              </div>
            )}
            <div style={{ display: "none" }}>
              <PdfPrint ref={printRef} rules={rules} project={project} />
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
          </>
        ) : null}
      </div>

      {page === 5 && formattedDateModified && loggedInUserId ? (
        <div className={classes.datesStatus}>
          <div>
            <strong>Snapshot Owner: </strong>
            {firstName} {lastName}, {email}
          </div>
          <div>
            <strong>Guidelines Version: </strong>
            {formatCalculation(calculations[projectNameRule.calculationId])}
          </div>
          {isAdmin && (
            <div>
              <strong>Submission Status: </strong>
              {project.approvalStatusName}
            </div>
          )}
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
  handleHideModalOpen: PropTypes.func,
  handleDeleteModalOpen: PropTypes.func,
  handlePrintPdf: PropTypes.func,
  handleSnapshotModalOpen: PropTypes.func,
  handleRenameSnapshotModalOpen: PropTypes.func,
  handleShareSnapshotModalOpen: PropTypes.func,
  handleDROModalOpenWithPreCheck: PropTypes.func,
  isDroCommitted: PropTypes.func,
  isSubmittingSnapshot: PropTypes.object,
  onDownload: PropTypes.any,
  project: PropTypes.any,
  selectProject: PropTypes.any,
  shareView: PropTypes.bool
};

export default WizardFooter;
