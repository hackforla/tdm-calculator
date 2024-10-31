import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import { MdWarning } from "react-icons/md";
import { MdSave } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  modalHeader: theme.typography.heading1,
  modalSubHeader: theme.typography.subHeading,
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

const SaveConfirmationModal = ({ isOpen, onClose, onYes }) => {
  const classes = useStyles();
  return (
    <ModalDialog mounted={isOpen} onClose={onClose}>
      <div className={classes.modalHeader} style={{ marginBottom: "1.5rem" }}>
        <MdSave style={{ marginBottom: "-5px" }} />
        {" Save Edits"}
      </div>
      <div className={classes.modalSubHeader}>
        <MdWarning className={classes.warningIcon} alt="Warning" />
        {"Are you sure you want to save FAQ page edits?"}
      </div>
      <div className={classes.buttonFlexBox}>
        <Button onClick={onClose} variant="text" id="cancelButton">
          Cancel
        </Button>
        <Button onClick={onYes} variant="contained" color={"colorPrimary"}>
          Save
        </Button>
      </div>
    </ModalDialog>
  );
};

SaveConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onYes: PropTypes.func
};

export default SaveConfirmationModal;
