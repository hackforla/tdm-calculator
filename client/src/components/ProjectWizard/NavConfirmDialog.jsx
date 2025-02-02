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
    alignItems: "center"
  },
  warningMessage: {
    verticalAlign: "middle"
  },
  modalActions: {
    display: "flex",
    justifyContent: "center"
  }
});

const NavConfirmDialog = ({ blocker }) => {
  const classes = useStyles();

  return (
    <ModalDialog
      mounted={blocker.state === "blocked"}
      onClose={blocker.reset}
      showCloseBox={false}
    >
      <h2 className={classes.title}>
        <strong>Leave page and delete unsaved data?</strong>
      </h2>
      <br />
      <p className={classes.warningWrapper}>
        <MdWarning alt="Warning" />
        <span className={classes.warningMessage}>
          &nbsp; This will permanently delete any unsaved projects or changes to
          project.
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
          Cancel
        </Button>
        <Button
          variant="error"
          id="modalProceed"
          data-testid="transitionProceed"
          onClick={() => blocker.proceed()}
        >
          Proceed
        </Button>
      </div>
    </ModalDialog>
  );
};

NavConfirmDialog.propTypes = {
  blocker: PropTypes.object.isRequired
};

export default NavConfirmDialog;
