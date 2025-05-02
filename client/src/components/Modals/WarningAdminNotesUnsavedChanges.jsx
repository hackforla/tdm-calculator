import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/Modal";
import clsx from "clsx";
import Button from "../Button/Button";
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
  heading1: theme.typography.heading1,
  subheading: theme.typography.subHeading,
  modalActions: {
    display: "flex",
    justifyContent: "center",
    marginTop: "24px"
  }
}));

const WarningModal = ({
  mounted,
  handleConfirmDiscard,
  handleDoNotDiscard
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
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
      console.log("WM unmounting, resetting initial focus id");
      setInitialFocusId(""); // Reset the id when the component unmounts
    };
  }, []);

  // Log the mounted prop to see if it controls rendering
  useEffect(() => {
    console.log("WM Mounted prop value:", mounted);
  }, [mounted]);

  // Check if initialFocusNodeId refers to a valid node
  const validInitialFocusId = document.getElementById(initialFocusId)
    ? initialFocusId
    : null;

  return (
    <ModalDialog
      mounted={mounted}
      escapeExits={false}
      omitCloseBox={true}
      initialFocus={validInitialFocusId || undefined}
    >
      <div className={classes.container}>
        <MdWarning className={classes.warningIcon} />
        <h1 className={classes.heading1}>You have unsaved changes</h1>
        <div className={classes.subheading}>
          Are you sure you want to continue without saving?
        </div>
        <div className={classes.modalActions}>
          <Button
            variant="secondary"
            onClick={handleDoNotDiscard}
            className={clsx(classes.button, classes.keepEditingButton)}
            ref={handleInitialFocusRef} //callback function to set the initial focus node
            id="keepEditing"
          >
            Keep Editing
          </Button>
          <Button
            variant="warning"
            className={clsx(classes.button, classes.criticalButton)}
            onClick={handleConfirmDiscard}
          >
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
