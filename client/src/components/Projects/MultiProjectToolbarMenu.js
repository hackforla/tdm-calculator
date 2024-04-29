import React, { useContext, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import {
  faEyeSlash,
  faEye,
  faTrash,
  faTrashArrowUp,
  faPrint,
  faFileCsv
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import PdfPrint from "../PdfPrint/PdfPrint";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "0.5em",
    marginBottom: "-1em"
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
    padding: 0,
    background: "none"
  },
  multiStatus: {
    color: "#002E6D"
  }
});

const MultiProjectToolbarMenu = ({
  handleHideBoxes,
  handleCsvModalOpen,
  handleDeleteModalOpen,
  checkedProjectIds,
  criteria,
  checkedProjectsStatusData,
  pdfProjectData
}) => {
  const momentModified = moment(checkedProjectsStatusData.dateModified);
  const printRef = useRef(null);
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const isProjectOwner = account.id === checkedProjectsStatusData.loginId;

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

  return (
    <div className={classes.container}>
      <div className={classes.multiStatus}>
        {checkedProjectIds.length} Projects Selected
      </div>
      <ul className={classes.list}>
        <li>
          <button
            id="csv-btn"
            className={classes.button}
            onClick={handleCsvModalOpen}
          >
            <FontAwesomeIcon icon={faFileCsv} />
          </button>
        </li>
        <li>
          <button
            id="print-btn"
            className={classes.button}
            onClick={handlePrintPdf}
            disabled={checkedProjectIds.length !== 1}
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
          {checkedProjectIds.length !== 1 ? (
            <Tooltip
              style={{
                backgroundColor: "#e6e3e3",
                color: "#000",
                width: "11%",
                borderRadius: "10px",
                fontWeight: "bold",
                textAlign: "center"
              }}
              anchorSelect="#print-btn"
              content="Please select one project"
            />
          ) : (
            ""
          )}
          {hasPdfData() && (
            <div style={{ display: "none" }}>
              <PdfPrint
                ref={printRef}
                rules={pdfProjectData.pdf}
                dateModified={momentModified.format("MM/DD/YYYY")}
              />
            </div>
          )}
        </li>
        <li>
          <button
            id="hide-btn"
            className={classes.button}
            disabled={isHideBtnDisabled}
            onClick={handleHideBoxes}
          >
            {!checkedProjectsStatusData.dateHidden ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}

            <Tooltip
              style={{
                backgroundColor: "#e6e3e3",
                color: "#000",
                width: "10%",
                borderRadius: "10px"
              }}
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
            className={classes.button}
            disabled={isDelBtnDisabled}
            onClick={handleDeleteModalOpen}
          >
            {!checkedProjectsStatusData.dateTrashed ? (
              <FontAwesomeIcon
                icon={faTrash}
                color={isDelBtnDisabled ? "#1010104d" : "red"}
              />
            ) : (
              <FontAwesomeIcon
                icon={faTrashArrowUp}
                color={isDelBtnDisabled ? "#1010104d" : "#a7c539"}
              />
            )}
            <Tooltip
              style={{
                backgroundColor: "#e6e3e3",
                color: "#000",
                width: "10%",
                borderRadius: "10px"
              }}
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
