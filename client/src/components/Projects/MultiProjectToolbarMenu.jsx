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
  }
}));

const MultiProjectToolbarMenu = ({
  handleHideBoxes,
  handleCsvModalOpen,
  handleDeleteModalOpen,
  checkedProjectIds,
  criteria,
  checkedProjectsStatusData,
  pdfProjectData
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

    // disable button if current user is not the owner
    // or if criteria is "all" and the date values are different
    return !isProjectOwner || (criteriaFilter && !sameDateVals);
  };

  const isHideBtnDisabled = isBtnDisabled("dateHidden", "visibility");
  const isDelBtnDisabled = isBtnDisabled("dateTrashed", "status");

  const tooltipMsg = (criteriaProp, msg, dateProp) => {
    if (checkedProjectIds.length === 0) return;

    if (!isProjectOwner) {
      return "You have selected a project that does not belong to you";
    }

    // show recover message if project is deleted
    if (checkedProjectsStatusData.dateTrashed && criteriaProp === "status") {
      return "Restore from Trash";
    }

    // show message when selecting mixed types (e.g. hide & unhide)
    if (
      checkedProjectIds.length > 1 &&
      checkedProjectsStatusData[dateProp] === false
    ) {
      return criteria[criteriaProp] === "all" ? msg : "";
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
              className={classes.button}
              onClick={handleComputeTotals}
            >
              T
            </button>
          </li>
        ) : null}
        <li>
          <button
            id="csv-btn"
            onClick={handleCsvModalOpen}
            className={classes.buttonStyle}
          >
            <FaFileCsv className={classes.iconSmall} />
          </button>
        </li>
        <li>
          <button
            id="print-btn"
            className={classes.buttonStyle}
            onClick={handlePrintPdf}
            disabled={checkedProjectIds.length !== 1}
          >
            <MdPrint className={classes.icon} />
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
            className={classes.buttonStyle}
            disabled={isHideBtnDisabled}
            onClick={handleHideBoxes}
          >
            {!checkedProjectsStatusData.dateHidden ? (
              <MdVisibilityOff className={classes.icon} />
            ) : (
              <MdVisibility className={classes.icon} />
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
            className={classes.buttonStyle}
            disabled={isDelBtnDisabled}
            onClick={handleDeleteModalOpen}
          >
            {!checkedProjectsStatusData.dateTrashed ? (
              <MdDelete
                className={classes.icon}
                color={isDelBtnDisabled ? "#1010104d" : "red"}
              />
            ) : (
              <MdRestoreFromTrash
                className={classes.icon}
                color={isDelBtnDisabled ? "#1010104d" : ""}
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
              anchorSelect="#delete-btn"
              content={tooltipMsg(
                "status",
                "Your selection includes both deleted and active items",
                "dateTrashed"
              )}
            />
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
  pdfProjectData: PropTypes.object
};

export default MultiProjectToolbarMenu;
