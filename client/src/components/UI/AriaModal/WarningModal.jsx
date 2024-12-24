import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { createUseStyles } from "react-jss";
import ModalDialog from "./ModalDialog";
import clsx from "clsx";

const useStyles = createUseStyles(theme => ({
  warningModalContainer: {
    zIndex: "999",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.4)",
    fontSize: "1rem",
    fontWeight: "normal"
  },
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
  button: {
    cursor: "pointer",
    fontFamily: "Calibri",
    fontWeight: 700,
    height: "min-content",
    margin: "0.5em",
    padding: "0.5em 1em",
    textAlign: "center",
    textTransform: "uppercase",
    //TODO: Move these when we figure out size-related props
    letterSpacing: "0.05em",
    fontSize: "20px"
  },
  keepEditingButton: {
    borderColor: "black",
    backgroundColor: "white",
    boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px",
    "&[disabled]:hover": {
      boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px"
    },
    "&:hover": {
      boxShadow: "rgba(0, 46, 109, 0.6) 2px 4px 6px" // Heavier box shadow on hover
    }
  },
  criticalButton: {
    backgroundColor: "#C3391D",
    borderColor: "rgba(0, 0, 0, .05)", //lightest grey
    boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px",
    "&[disabled]:hover": {
      boxShadow: "rgba(0, 46, 109, 0.3) 1px 2px 3px"
    },
    "&:hover": {
      boxShadow: "rgba(0, 46, 109, 0.6) 2px 4px 6px" // Heavier box shadow on hover
    }
  },
  modalContent: {
    maxWidth: "67.5rem",
    minWidth: "40vw",
    maxHeight: "40.5rem",
    padding: "1rem",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    border: "1px solid #d8dce3",
    borderRadius: "0",
    boxSizing: "border-box",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 1)"
  }
}));

const WarningModal = ({
  mounted,
  handleConfirmDiscard,
  handleDoNotDiscard
}) => {
  const classes = useStyles();
  const [initialFocusId, setInitialFocusId] = useState("");

  const handleInitialFocusRef = node => {
    if (node) {
      setInitialFocusId(node.id); // Assign the button node as the initial focus target
    }
  };

  // Cleanup on unmount to prevent issues with stale selector
  useEffect(() => {
    /* eslint-disable no-console */
    console.log("useEffect in warning modal");
    return () => {
      console.log("WM unmouting, resetting initial focus id");
      setInitialFocusId(""); // Reset the id when the component unmounts
    };
  }, []);

  // Log the mounted prop to see if it controls rendering
  useEffect(() => {
    console.log("WM Mounted prop value:", mounted);
  }, [mounted]);

  if (!mounted) {
    console.log("WM is not mounted, returning null");
    return null; // Ensure the component is properly unmounted when `mounted` is false
  }

  // Check if initialFocusNodeId refers to a valid node
  const validInitialFocusId = document.getElementById(initialFocusId)
    ? initialFocusId
    : null;

  return (
    <ModalDialog
      mounted={mounted}
      underlayClickExits={false}
      escapeExits={false}
      omitCloseBox={true}
      underlayClass={classes.warningModalContainer}
      initialFocus={validInitialFocusId || undefined}
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
          <button
            color="white"
            onClick={handleDoNotDiscard}
            className={clsx(classes.button, classes.keepEditingButton)}
            ref={handleInitialFocusRef} //callback function to set the initial focus node
            id="keepEditing"
          >
            Keep Editing
          </button>
          <button
            className={clsx(classes.button, classes.criticalButton)}
            onClick={handleConfirmDiscard}
          >
            Discard Changes
          </button>
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
