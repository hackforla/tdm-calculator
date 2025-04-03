import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import { createUseStyles, useTheme } from "react-jss";
import { MdWarning } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  title: {
    textAlign: "center"
  },
  warningWrapper: {
    color: theme.colorCritical,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  warningMessage: {
    ...theme.typography.paragraph1,
    verticalAlign: "middle",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1em"
  },
  modalActions: {
    display: "flex",
    justifyContent: "center"
  },
  proceedButton: {
    color: "white",
    fontWeight: "bold"
  }
}));

const FaqConfirmDialog = ({ blocker }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <ModalDialog
      mounted={blocker.state === "blocked"}
      onClose={blocker.reset}
      omitCloseBox={true}
    >
      <div className={classes.warningWrapper}>
        <MdWarning alt="Warning" size={70} />
      </div>
      <h2 className={classes.title}>
        <strong>Unsaved changes will be lost</strong>
      </h2>
      <p className={classes.warningMessage}>
        <span>
          &nbsp; Leaving this page will permanently delete any unsaved changes
          to the FAQ.
        </span>
      </p>
      <div className={classes.modalActions}>
        <Button
          variant="secondary"
          id="modalCancel"
          data-testid="transitionCancel"
          onClick={() => blocker.reset()}
        >
          <p style={{ fontWeight: "bold" }}>Cancel</p>
        </Button>
        <Button
          variant="warning"
          id="modalProceed"
          data-testid="trarnsitionProceed"
          onClick={() => blocker.proceed()}
        >
          <p className={classes.proceedButton}>Proceed</p>
        </Button>
      </div>
    </ModalDialog>
  );
};

FaqConfirmDialog.propTypes = {
  blocker: PropTypes.object.isRequired
};

export default FaqConfirmDialog;
