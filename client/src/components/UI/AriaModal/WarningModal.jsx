import React from "react";
import { PropTypes } from "prop-types";
import Button from "../../Button/Button";
import { createUseStyles } from "react-jss";
import { MdWarning } from "react-icons/md";
import ModalDialog from "./ModalDialog";

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
  warningWrapper: {
    color: "#B64E38",
    display: "flex",
    alignItems: "center"
  },
  warningMessage: {
    verticalAlign: "middle"
  },
  modalActions: {
    display: "flex",
    justifyContent: "center"
  },
  warningIcon: {
    margin: "0 10px"
  },
  modalSubHeader: theme.typography.subHeading,
  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    width: "100%",
    maxWidth: "500px"
  }
}));

const WarningModal = ({
  mounted,
  handleDoNotDiscard,
  handleConfirmDiscard
}) => {
  const classes = useStyles();

  <ModalDialog
    mounted={mounted}
    underlayClickExits={false}
    underlayColor="rgba(0, 0, 0, 0.4)"
    escapeExits={false}
    initialFocus="#saveButton"
    showCloseBox={false}
  >
    <h2 className={classes.title}>
      <strong>You have unsaved changes</strong>
    </h2>
    <br />
    <p className={classes.warningWrapper}>
      <MdWarning alt="Warning" />
      <span className={classes.warningMessage}>
        Are you sure you want to continue without saving?
      </span>
    </p>
    <div className={classes.modalActions}>
      <Button
        color="colorCancel"
        variant="outlined"
        id="modalCancel"
        onClick={handleDoNotDiscard}
      >
        Keep Editing
      </Button>
      <Button color="color" variant="error" onClick={handleConfirmDiscard}>
        Discard Changes
      </Button>
    </div>
  </ModalDialog>;
};

WarningModal.prototypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};

export default WarningModal;
