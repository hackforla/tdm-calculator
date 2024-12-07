import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import { MdWarning } from "react-icons/md";

const useStyles = createUseStyles({
  title: {
    textAlign: "center"
  },
  warningWrapper: {
    color: "#B64E38",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  warningMessage: {
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
});

const FaqConfirmDialog = ({ blocker }) => {
  const classes = useStyles();
  return (
    <ModalDialog
      mounted={blocker.state === "blocked"}
      onClose={blocker.reset}
      showCloseBox={false}
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
          color="colorCancel"
          variant="outlined"
          id="modalCancel"
          data-testid="transitionCancel"
          onClick={() => blocker.reset()}
        >
          <p style={{ fontWeight: "bold" }}>Cancel</p>
        </Button>
        <Button
          color="colorError"
          id="modalProceed"
          data-testid="transitionProceed"
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
