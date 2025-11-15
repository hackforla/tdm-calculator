import React, { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import * as projectService from "../../services/project.service";
import { formatDate, formatDatetime } from "../../helpers/util";
import { MdCheck } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    color: theme.colors.secondary.darkNavy
  },
  tableContainer: {
    overflow: "auto",
    width: "calc(80vw - 20px)",
    height: "55vh"
  },
  table: {
    minWidth: "110rem",
    width: "100%",
    tableLayout: "fixed"
  },
  thead: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    fontWeight: "bold",
    backgroundColor: "#002E6D",
    color: "white",
    "& td": {
      padding: "12px"
    }
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  subheading: {
    ...theme.typography.subHeading,
    width: "30rem",
    lineHeight: "1.5rem",
    marginTop: "0rem",
    marginBottom: "0.5rem"
  },
  tr: {
    borderBottom: "1px solid " + theme.colors.secondary.mediumGray
  },
  thLeft: {
    color: theme.colorDefault,
    backgroundColor: theme.colorText,
    textAlign: "left",
    padding: "0.5rem"
  },
  thCenter: {
    color: theme.colorDefault,
    backgroundColor: theme.colorText,
    textAlign: "center",
    padding: "0.5rem"
  },
  thRight: {
    color: theme.colorDefault,
    backgroundColor: theme.colorText,
    textAlign: "right",
    padding: "0.5rem"
  },
  tdLeft: {
    textAlign: "left",
    padding: "0.5rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  tdCenter: {
    textAlign: "center",
    padding: "0.5rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  tdRight: {
    textAlign: "right",
    padding: "0.5rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  highlight: {
    backgroundColor: theme.colorHighlight,
    color: theme.colorText,
    fontWeight: "600"
    // border: "solid 1px " + theme.colorDefault
  }
}));

export default function InfoSubmissonLog({ mounted, onClose, project }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [projectLog, setProjectLog] = useState();

  useEffect(() => {
    const getLog = async projectId => {
      const resp = await projectService.getSubmissionLogByProjectId(projectId);
      const projectLog = resp.data;
      for (let i = projectLog.length - 1; i >= 0; i--) {
        const log = projectLog[i];
        const prev =
          i === projectLog.length - 1 ? projectLog[i] : projectLog[i + 1];
        log.assignee = log.assignedLastName
          ? `${log.assignedLastName}, ${log.assignedFirstName}`
          : "-";
        log.statusChangedBy = log.statusLastName
          ? `${log.statusLastName}, ${log.statusFirstName}`
          : "-";

        log.droNameChanged = log.droName !== prev.droName;
        log.assigneeChanged = log.assignee !== prev.assignee;
        log.dateAssignedChanged = log.dateAssigned !== prev.dateAssigned;
        log.invoiceStatusChanged =
          log.invoiceStatusName !== prev.invoiceStatusName;
        log.dateInvoicePaidChanged =
          log.dateInvoicePaid !== prev.dateInvoicePaid;
        log.onHoldChanged = log.onHold !== prev.onHold;
        log.approvalStatusNameChanged =
          log.approvalStatusName !== prev.approvalStatusName;
        log.adminNotesChanged = log.adminNotes !== prev.adminNotes;
        log.dateCoOChanged = log.dateCoO != prev.dateCoO;
      }
      setProjectLog(projectLog);
    };

    getLog(project.id);
  }, [project.id]);

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      escapeExits={false}
      initialFocus="#cancelButton"
      underlayClickExits={false}
    >
      <div className={classes.container}>
        <h1 className={classes.heading1}>Submission Log</h1>
        <div className={classes.subheading}>{project.name}</div>
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead className={classes.thead}>
              <tr className={classes.tr}>
                <th className={classes.thLeft} style={{ width: "10rem" }}>
                  Changed By
                </th>
                <th className={classes.thLeft} style={{ width: "10rem" }}>
                  Changed On
                </th>
                <th className={classes.thLeft} style={{ width: "6rem" }}>
                  DRO
                </th>
                <th className={classes.thLeft} style={{ width: "10rem" }}>
                  Assignee
                </th>
                <th className={classes.thLeft} style={{ width: "6rem" }}>
                  Assigned
                </th>
                <th className={classes.thLeft} style={{ width: "6rem" }}>
                  Invoice Status
                </th>
                <th className={classes.thLeft} style={{ width: "6rem" }}>
                  Invoice Paid
                </th>
                <th className={classes.thCenter} style={{ width: "6rem" }}>
                  On Hold
                </th>
                <th className={classes.thLeft} style={{ width: "12rem" }}>
                  Approval Status
                </th>
                <th className={classes.thLeft} style={{ width: "15rem" }}>
                  Admin Notes
                </th>
                <th
                  className={classes.thLeft}
                  style={{ minWidth: "6rem", width: "6rem" }}
                >
                  Certificate of Occupancy
                </th>
              </tr>
            </thead>
            <tbody className={classes.tbody}>
              {projectLog && projectLog.length ? (
                projectLog.map(log => (
                  <tr key={log.id} className={classes.tr}>
                    <td className={classes.tdLeft}>{log.statusChangedBy}</td>
                    <td className={classes.tdLeft}>
                      {formatDatetime(log.dateStatus)}
                    </td>
                    <td
                      className={clsx(
                        classes.tdLeft,
                        log.droNameChanged ? classes.highlight : ""
                      )}
                    >
                      {log.droName}
                    </td>
                    <td
                      className={clsx(
                        classes.tdLeft,
                        log.assigneeChanged ? classes.highlight : ""
                      )}
                    >
                      {log.assignee}
                    </td>
                    <td
                      className={clsx(
                        classes.tdLeft,
                        log.dateAssignedChanged ? classes.highlight : ""
                      )}
                    >
                      {formatDate(log.dateAssigned)}
                    </td>
                    <td
                      className={clsx(
                        classes.tdLeft,
                        log.invoiceStatusNameChanged ? classes.highlight : ""
                      )}
                    >
                      {log.invoiceStatusName}
                    </td>
                    <td
                      className={clsx(
                        classes.tdLeft,
                        log.dateInvoicePaidChanged ? classes.highlight : ""
                      )}
                    >
                      {formatDate(log.dateInvoicePaid)}
                    </td>
                    <td
                      className={clsx(
                        classes.tdCenter,
                        log.onHoldChanged ? classes.highlight : ""
                      )}
                    >
                      {log.onHold ? <MdCheck /> : ""}
                    </td>
                    <td
                      className={clsx(
                        classes.tdLeft,
                        log.approvalStatusNameChanged ? classes.highlight : ""
                      )}
                    >
                      {log.approvalStatusName}
                    </td>
                    <td
                      className={clsx(
                        classes.tdLeft,
                        log.adminNotesChanged ? classes.highlight : ""
                      )}
                    >
                      {log.adminNotes}
                    </td>
                    <td
                      className={clsx(
                        classes.tdLeft,
                        log.dateCoOChanged ? classes.highlight : ""
                      )}
                    >
                      {formatDate(log.dateCoO)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className={classes.tdNoSavedProjects}>
                    No Log Resords to Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={classes.buttonFlexBox} style={{ marginTop: "1rem" }}>
          <Button onClick={() => onClose("ok")} variant="primary">
            Close
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
}

InfoSubmissonLog.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};
