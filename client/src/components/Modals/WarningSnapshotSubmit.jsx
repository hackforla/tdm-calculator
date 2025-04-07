import React from "react";
import * as projectService from "../../services/project.service";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { MdWarning } from "react-icons/md";

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
  heading1: theme.typography.heading1,
  subheading: {
    ...theme.typography.subHeading,
    width: "30rem",
    lineHeight: "1.5rem",
    marginTop: "1rem",
    marginBottom: "1rem"
  }
}));

export default function WarningSnapshotSubmit({ mounted, onClose, project }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleClose = async () => {
    try {
      await projectService.submit({ id: project.id });
    } catch (err) {
      console.error(err);
    }
    onClose("ok");
  };

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      initialFocus="#cancelButton"
    >
      <div className={classes.container}>
        <MdWarning alt="Warning" className={classes.warningIcon} />
        <div className={classes.heading1}>Submit Snapshot</div>
        <div className={classes.subheading}>
          Are you sure you want to submit the Snapshot?
        </div>
        <div className={classes.subheading}>{project?.name}</div>
      </div>
      <div className={classes.buttonFlexBox} style={{ marginTop: "1.5rem" }}>
        <Button onClick={onClose} variant="secondary" id="cancelButton">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="primary">
          OK
        </Button>
      </div>
    </ModalDialog>
  );
}

WarningSnapshotSubmit.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};
