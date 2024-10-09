import React from "react";
import { PropTypes } from "prop-types";
import { MdDelete, MdRestoreFromTrash } from "react-icons/md";
import Button from "../Button/Button";
import { MdWarning } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/AriaModal/ModalDialog";

const useStyles = createUseStyles(theme => ({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  instruction: {
    fontSize: "20px",
    lineHeight: "32px",
    textAlign: "center",
    color: "#B64E38",
    "& span": {
      fontStyle: "italic"
    }
  },
  warningIcon: {
    margin: "0 10px"
  }
}));

const DeleteProjectModal = ({ mounted, onClose, project }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#cancelButton"
    >
      {project.dateTrashed ? (
        <>
          <div
            className={classes.heading1}
            style={{ marginBottom: "1.5rem", color: "" }}
          >
            <MdRestoreFromTrash /> Restore Project from Trash
          </div>
          <div style={theme.typography.subHeading}>
            <MdWarning className={classes.warningIcon} alt="Warning" />
            Are you sure you want to restore the project from the trash,
          </div>
        </>
      ) : (
        <>
          <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
            <MdDelete /> Delete Project
          </div>
          <div style={theme.typography.subHeading}>
            <MdWarning className={classes.warningIcon} alt="Warning" />
            Are you sure you want to delete the following? <br></br>(It will
            remain in the recycling bin for ninety days <br></br>before being
            permanently deleted)
          </div>
        </>
      )}
      <div style={{ ...theme.typography.heading3, marginBottom: "1.5rem" }}>
        {Array.isArray(project.name) ? project.name.join(", ") : project.name}
      </div>
      <div className={classes.buttonFlexBox}>
        <Button onClick={onClose} variant="text" id="cancelButton">
          Cancel
        </Button>
        {project.dateTrashed ? (
          <Button
            onClick={() => onClose("ok")}
            variant="contained"
            color={"colorError"}
          >
            Restore
          </Button>
        ) : (
          <Button
            onClick={() => onClose("ok")}
            variant="contained"
            color={"colorError"}
          >
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
