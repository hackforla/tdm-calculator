import React from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { MdWarning } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/Modal";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  warningIcon: {
    height: "80px",
    width: "80px",
    color: theme.colorCritical,
    textAlign: "center"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.iconHeading1,
  subheading: {
    ...theme.typography.subHeading,
    width: "30rem",
    lineHeight: "1.5rem"
  }
}));

const DeleteProjectModal = ({ mounted, onClose, project }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      initialFocus="#cancelButton"
    >
      {project.dateTrashed ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />

          <div
            className={classes.heading1}
            style={{ marginBottom: "1.5rem", color: "" }}
          >
            Restore Project from Trash
          </div>
          <div className={classes.subheading}>
            Are you sure you want to restore the following from the trash?
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
            Delete Project
          </div>
          <div className={classes.subheading}>
            Are you sure you want to delete the following? (It will remain in
            the recycling bin for ninety days before being permanently deleted.)
          </div>
        </div>
      )}
      <div style={{ ...theme.typography.heading3, marginBottom: "1.5rem" }}>
        {Array.isArray(project.name) ? project.name.join(", ") : project.name}
      </div>
      <div className={classes.buttonFlexBox}>
        <Button onClick={onClose} variant="secondary" id="cancelButton">
          Cancel
        </Button>
        {project.dateTrashed ? (
          <Button onClick={() => onClose("ok")} variant="primary">
            Restore
          </Button>
        ) : (
          <Button onClick={() => onClose("ok")} variant="warning">
            Delete
          </Button>
        )}
      </div>
    </ModalDialog>
  );
};

DeleteProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};

export default DeleteProjectModal;
