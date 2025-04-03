import React from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { MdWarning } from "react-icons/md";
import { createUseStyles } from "react-jss";
import ModalDialog from "../UI/Modal";
import { formatDatetime } from "../../helpers/util";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem"
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
  heading1: { ...theme.typography.heading1, marginBottom: "1.5rem" },
  subheading: {
    ...theme.typography.subHeading,
    width: "30rem",
    lineHeight: "1.5rem"
  }
}));

const ResetProjectModal = ({ mounted, onClose, project, resetProject }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const formattedDateModified =
    project.dateModified && formatDatetime(project.dateModified);

  const handleReset = () => {
    if (project.dateModified) {
      resetProject();
      onClose();
    } else {
      resetProject();
      navigate(`/calculation/1/${project.id}`);
      onClose();
    }
  };

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      initialFocus="#cancelButton"
    >
      {project.dateModified ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <div>
            <p className={classes.heading1}>Reset project</p>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p className={classes.subheading}>
              All unsaved data from this project will be lost.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <strong>Date Last Saved: </strong>
            <p>{formattedDateModified} Pacific Time</p>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <div>
            <p className={classes.heading1}>Delete Project</p>
          </div>
          <div>
            <p className={classes.subheading}>
              All data from this project will be lost.
            </p>
          </div>
        </div>
      )}
      <div className={classes.buttonFlexBox}>
        <Button onClick={onClose} variant="secondary" id="cancelButton">
          Cancel
        </Button>

        <Button onClick={handleReset} variant="warning">
          Proceed
        </Button>
      </div>
    </ModalDialog>
  );
};

ResetProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.object,
  resetProject: PropTypes.func
};

export default ResetProjectModal;
