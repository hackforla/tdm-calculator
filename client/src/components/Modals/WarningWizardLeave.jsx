import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/Modal";
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
  title: theme.typography.iconHeading1,
  text: theme.typography.paragraph1,
  modalActions: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "center"
  }
}));

const NavConfirmDialog = ({ blocker }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <ModalDialog
      mounted={blocker.state === "blocked"}
      onClose={blocker.reset}
      omitCloseBox={true}
    >
      <div className={classes.container}>
        <MdWarning alt="Warning" className={classes.warningIcon} />
        <h2 className={classes.title}>
          <strong>Unsaved changes will be lost</strong>
        </h2>
        <div>
          Leaving this page will permanently delete any unsaved changes to the
          project.
        </div>
        <div className={classes.modalActions}>
          <Button
            id="modalCancel"
            variant={"secondary"}
            isDisplayed={true}
            data-testid="transitionCancel"
            onClick={() => blocker.reset()}
          >
            Cancel
          </Button>
          <Button
            variant="warning"
            id="modalProceed"
            data-testid="transitionProceed"
            onClick={() => blocker.proceed()}
          >
            Proceed
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
};

NavConfirmDialog.propTypes = {
  blocker: PropTypes.object.isRequired
};

export default NavConfirmDialog;
