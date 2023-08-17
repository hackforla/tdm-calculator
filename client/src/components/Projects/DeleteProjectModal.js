import React from "react";
import { PropTypes } from "prop-types";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import WarningIcon from "../../images/warning-icon.png";
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

const DeleteProjectModal = ({ mounted, onClose, selectedProjectName }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#cancelButton"
    >
      <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
        <FontAwesomeIcon icon={faTrashCan} /> DeleteProject
      </div>
      <div style={theme.typography.subHeading}>
        <img src={WarningIcon} className={classes.warningIcon} alt="Warning" />
        Are you sure you want to <span>permanently</span> delete the project,
      </div>
      <div style={{ ...theme.typography.heading3, marginBottom: "1.5rem" }}>
        {selectedProjectName}?
      </div>
      <div className={classes.buttonFlexBox}>
        <Button onClick={onClose} variant="text" id="cancelButton">
          Cancel
        </Button>
        <Button
          onClick={() => onClose("ok")}
          variant="contained"
          color={"colorError"}
        >
          Delete
        </Button>
      </div>
    </ModalDialog>
  );
};

DeleteProjectModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  selectedProjectName: PropTypes.string
};

export default DeleteProjectModal;
