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

const HideProjectModal = ({ mounted, onClose, project }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      initialFocus="#cancelButton"
    >
      {project.dateHidden ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />

          <div
            className={classes.heading1}
            style={{ marginBottom: "1.5rem", color: "" }}
          >
            Unhide Project
          </div>
          <div className={classes.subheading}>
            Are you sure you want to unhide this project?
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
            Hide Project
          </div>
          <div className={classes.subheading}>
            Are you sure you want to hide the following? (You can unhide the
            project at any time.)
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
        {project.dateHidden ? (
          <Button onClick={() => onClose("ok")} variant="primary">
            Unhide
          </Button>
        ) : (
          <Button onClick={() => onClose("ok")} variant="warning">
            Hide
          </Button>
        )}
      </div>
    </ModalDialog>
  );
};

HideProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};

export default HideProjectModal;
