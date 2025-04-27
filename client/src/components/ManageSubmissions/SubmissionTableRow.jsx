import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import PropTypes from "prop-types";

import "reactjs-popup/dist/index.css";

import { formatDate } from "../../helpers/util";

const useStyles = createUseStyles(theme => ({
  td: {
    padding: "0.2em",
    textAlign: "left",
    width: "5%"
  },
  tdRightAlign: {
    padding: "0.2em",
    textAlign: "right"
  },
  tdCenterAlign: {
    padding: "0.2em",
    textAlign: "center"
  },
  actionIcons: {
    display: "flex",
    justifyContent: "space-around",
    width: "auto",
    "& button": {
      border: "none",
      backgroundColor: "transparent",
      "&:hover": {
        cursor: "pointer"
      }
    }
  },

  selectBox: {
    padding: "0.5em",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px"
  },
  adminNoteInput: {
    padding: "0.3em",
    marginRight: "0.5em",
    flexGrow: 1
  },
  saveButton: {
    padding: "0.3em 0.6em",
    marginRight: "0.3em",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    "&:disabled": {
      backgroundColor: "#a5d6a7",
      cursor: "not-allowed"
    }
  },
  cancelButton: {
    padding: "0.3em 0.6em",
    backgroundColor: theme.colorWhite,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
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
}));

const SubmissionTableRow = ({ project }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <tr
      key={project.id}
      style={{ background: project.dateTrashed ? "#ffdcdc" : "" }}
    >
      <td className={classes.td}>
        <Link to={`/calculation/1/${project.id}`}>{project.name}</Link>
      </td>
      <td className={classes.td}>{project.author}</td>
      <td className={classes.tdCenterAlign}>{project.projectLevel}</td>
      <td className={classes.td}>{project.droName}</td>
      <td className={classes.td}>{project.assignee}</td>
      <td className={classes.td}>{formatDate(project.dateAssigned)}</td>
      <td className={classes.td}>{project.invoiceStatusName}</td>
      <td className={classes.td}>{formatDate(project.dateInvoice)}</td>
      <td className={classes.td}>{project.onHold ? "x" : ""}</td>
      <td className={classes.td}>{project.approvalStatusName}</td>
      <td className={classes.td}>{project.adminNotes ? "y" : "n"}</td>
      <td className={classes.td}>{formatDate(project.dateCoO)}</td>
      <td className={classes.tdRightAlign}>
        {project.id.toString().padStart(10, "0")}
      </td>
      {/* <td className={classes.td}>{project.address}</td> */}
      {/* <td className={classes.td}>{formatDate(project.dateSubmitted)}</td> */}
      {/* <td className={classes.td}>{formatDate(project.dateStatus)}</td> */}
      {/* <td className={classes.td}>{formatDate(project.dateSnapshotted)}</td> */}
      {/* <td className={classes.td}>{formatDate(project.dateModifiedAdmin)}</td> */}
    </tr>
  );
};

SubmissionTableRow.propTypes = {
  project: PropTypes.any
};

export default SubmissionTableRow;
