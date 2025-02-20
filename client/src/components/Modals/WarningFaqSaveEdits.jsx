import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import { createUseStyles, useTheme } from "react-jss";
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
  modalHeader: theme.typography.heading1,
  subheading: {
    ...theme.typography.subHeading,
    width: "30rem",
    lineHeight: "1.5rem",
    marginTop: "1rem",
    marginBottom: "1rem"
  }
}));

const SaveConfirmationModal = ({ isOpen, onClose, onYes }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <ModalDialog mounted={isOpen} onClose={onClose} omitCloseBox={true}>
      <div className={classes.container}>
        <MdWarning className={classes.warningIcon} alt="Warning" />
        <div className={classes.modalHeader}>Save Edits</div>
        <div className={classes.subheading}>
          {"Are you sure you want to save FAQ page edits?"}
        </div>
        <div className={classes.buttonFlexBox}>
          <Button onClick={onClose} variant="secondary" id="cancelButton">
            Cancel
          </Button>
          <Button onClick={onYes} variant="primary" color={"colorPrimary"}>
            Save
          </Button>
        </div>
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
