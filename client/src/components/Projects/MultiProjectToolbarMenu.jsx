import React, { useContext, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { FaFileCsv } from "react-icons/fa6";
import {
  MdDelete,
  MdRestoreFromTrash,
  MdPrint,
  MdVisibility,
  MdVisibilityOff
} from "react-icons/md";
import { Tooltip } from "react-tooltip";
import PdfPrint from "../PdfPrint/PdfPrint";
import { useReactToPrint } from "react-to-print";
import { ENABLE_UPDATE_TOTALS } from "../../helpers/Constants";

import * as projectResultService from "../../services/projectResult.service";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "0.5em",
    marginBottom: "-1em",
    padding: "0 3em 0 .5em ",
    flexBasis: "33%"
  },
  list: {
    display: "flex",
    flexDirection: "row",
    listStyleType: "none",
    justifyContent: "space-between",
    alignItems: "center",
    width: "6.5em"
  },
  button: {
    border: "none",
    padding: "0",
    background: "none"
  },
  showPointer: {
    cursor: "pointer"
  },
  multiStatus: {
    ...theme.typography.subHeading,
    color: theme.colors.primary.navy,
    textAlign: "left"
  },
  buttonStyle: {
    border: "none",
    backgroundColor: "transparent"
  },
  iconSmall: {
    height: "23.3px",
    width: "23.3px"
  },
  icon: {
    height: "28px",
    width: "28px"
  },
  iconDisabled: {
    height: "28px",
    width: "28px",
    color: theme.colorDisabled
  }
}));

const MultiProjectToolbarMenu = ({
  handleHideBoxes,
  handleCsvModalOpen,
  handleDeleteModalOpen,
  checkedProjectIds,
  criteria,
  checkedProjectsStatusData,
  pdfProjectData,
  isActiveProjectsTab
}) => {
  const printRef = useRef(null);
  const theme = useTheme();
  const classes = useStyles(theme);
  const userContext = useContext(UserContext);
  const account = userContext.account;
  let project = null;
  if (
    checkedProjectIds.length === 1 &&
    Object.keys(checkedProjectsStatusData).length > 0
  ) {
    project = checkedProjectsStatusData;
  }
  const isProjectOwner = account
    ? account.id === project?.loginId ||
      account.id === checkedProjectsStatusData.loginId
    : false;

  const isBtnDisabled = (projProp, criteriaProp) => {
    const sameDateVals = checkedProjectsStatusData[projProp] !== false;
    const criteriaFilter = criteria[criteriaProp] === "all";

    // disable button if criteria is "all" and the date values are different
    return criteriaFilter && !sameDateVals;
  };

  const isHideBtnDisabled =
    !checkedProjectsStatusData.loginId ||
    isBtnDisabled("dateHidden", "visibility");

  const isDelBtnDisabled =
    !isProjectOwner ||
    isBtnDisabled("dateTrashed", "status") ||
    !isActiveProjectsTab;

  const tooltipMsg = criteriaProp => {
    if (checkedProjectIds.length === 0) return;

    if (!isProjectOwner && criteriaProp !== "visibility") {
      return "You have selected a project that does not belong to you";
    }
  };

  const hasPdfData = () => {
    return pdfProjectData && !!pdfProjectData.pdf;
  };

  const handlePrintPdf = useReactToPrint({
    content: () => printRef.current,
    bodyClass: "printContainer",
    pageStyle: ".printContainer {overflow: hidden;}"
  });

  const handleComputeTotals = async () => {
    for (let i = 0; i < checkedProjectIds.length; i++) {
      await projectResultService.populateTargetPoints(checkedProjectIds[i]);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.multiStatus}>
        {checkedProjectIds.length} Projects Selected
      </div>
      <ul className={classes.list}>
        {ENABLE_UPDATE_TOTALS ? (
          <li>
            <button
              id="csv-btn"
              className={`${classes.button} ${classes.showPointer}`}
              onClick={handleComputeTotals}
            >
              T
            </button>
          </li>
        ) : null}
        <li>
          <button
            id="csv-btn"
            className={`${classes.buttonStyle} ${classes.showPointer}`}
            onClick={handleCsvModalOpen}
          >
            <FaFileCsv className={classes.iconSmall} />
          </button>
        </li>
        <li>
          <button
            id="print-btn"
            className={`${classes.buttonStyle} ${
              checkedProjectIds.length === 1 && classes.showPointer
            }`}
            onClick={handlePrintPdf}
            disabled={checkedProjectIds.length !== 1}
          >
            <MdPrint
              className={
                checkedProjectIds.length !== 1
                  ? classes.iconDisabled
                  : classes.icon
              }
            />
          </button>
          {checkedProjectIds.length !== 1 ? (
            <Tooltip
              // Cannot use JSS, because Tooltip default styles would overwrite
              style={{
                ...theme.typography.paragraph1,
                backgroundColor: theme.colors.secondary.lightGray,
                width: "12rem",
                borderRadius: "5px",
                textAlign: "center",
                boxShadow:
                  "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)"
              }}
              border="1px solid black"
              anchorSelect="#print-btn"
              content="Please select one project"
            />
          ) : (
            ""
          )}
          {project && hasPdfData() && (
            <div style={{ display: "none" }}>
              <PdfPrint
                ref={printRef}
                rules={pdfProjectData.pdf}
                project={project}
              />
            </div>
          )}
        </li>
        <li>
          <button
            id="hide-btn"
            className={`${classes.buttonStyle} ${
              !isHideBtnDisabled && classes.showPointer
            }`}
            disabled={isHideBtnDisabled}
            onClick={handleHideBoxes}
          >
            {!checkedProjectsStatusData.dateHidden ? (
              <MdVisibilityOff
                className={
                  isHideBtnDisabled ? classes.iconDisabled : classes.icon
                }
              />
            ) : (
              <MdVisibility
                className={
                  isHideBtnDisabled ? classes.iconDisabled : classes.icon
                }
              />
            )}

            <Tooltip
              // Cannot use JSS, because Tooltip default styles would overwrite
              style={{
                ...theme.typography.paragraph1,
                backgroundColor: theme.colors.secondary.lightGray,
                width: "12rem",
                borderRadius: "5px",
                textAlign: "center",
                boxShadow:
                  "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)"
              }}
              border="1px solid black"
              anchorSelect="#hide-btn"
              content={tooltipMsg(
                "visibility",
                "Your selection includes both hidden and visible items",
                "dateHidden"
              )}
            />
          </button>
        </li>
        <li>
          <button
            id="delete-btn"
            className={`${classes.buttonStyle} ${
              !isDelBtnDisabled && classes.showPointer
            }`}
            disabled={isDelBtnDisabled}
            onClick={handleDeleteModalOpen}
          >
            {isActiveProjectsTab ? (
              <MdDelete
                className={isDelBtnDisabled ? classes.isDisabled : classes.icon}
              />
            ) : (
              <MdRestoreFromTrash
                className={isDelBtnDisabled ? classes.isDisabled : classes.icon}
              />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

MultiProjectToolbarMenu.propTypes = {
  handleHideBoxes: PropTypes.func.isRequired,
  handleCsvModalOpen: PropTypes.func.isRequired,
  handleDeleteModalOpen: PropTypes.func.isRequired,
  checkedProjectIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  criteria: PropTypes.object.isRequired,
  checkedProjectsStatusData: PropTypes.object.isRequired,
  pdfProjectData: PropTypes.object,
  isActiveProjectsTab: PropTypes.string.isRequired
};

export default MultiProjectToolbarMenu;
