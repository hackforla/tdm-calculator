import React, { useState } from "react";
import { PropTypes } from "prop-types";
import Button from "../../Button/Button";
import { createUseStyles } from "react-jss";
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
    fontColor: "black",
    fontSize: "28px",
    marginTop: "0px"
  },
  modalActions: {
    display: "flex",
    justifyContent: "center",
    marginTop: "24px"
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
  const [initialFocusNode, setInitialFocusNode] = useState(null);

  const handleInitialFocusRef = node => {
    if (node) {
      setInitialFocusNode(node); // Assign the button node as the initial focus target
    }
  };

  const classes = useStyles();
  return (
    <ModalDialog
      mounted={mounted}
      underlayClickExits={false}
      underlayColor="rgba(0, 0, 0, 0.4)"
      escapeExits={false}
      initialFocus={initialFocusNode || undefined}
      omitCloseBox={false}
    >
      <div style={{ textAlign: "center" }}>
        <h2 className={classes.warningMessage}>
          <strong>You have unsaved changes</strong>
        </h2>
        <p>
          Are you sure you want to continue without saving?
          {/* <span>Are you sure you want to continue without saving?</span> */}
        </p>
        <div className={classes.modalActions}>
          <Button
            color="white"
            variant="contained"
            onClick={handleDoNotDiscard}
            ref={handleInitialFocusRef} //callback function to set the initial focus node
          >
            Keep Editing
          </Button>
          <Button color="color" variant="error" onClick={handleConfirmDiscard}>
            Discard Changes
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
};

WarningModal.propTypes = {
  mounted: PropTypes.bool.isRequired,
  handleDoNotDiscard: PropTypes.func.isRequired,
  handleConfirmDiscard: PropTypes.func.isRequired
};

export default WarningModal;
