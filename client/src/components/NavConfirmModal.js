import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "./UI/ModalDialog/ModalDialog";
import Button from "./Button/Button";
import { createUseStyles } from "react-jss";
import WarningIcon from "../images/warning-icon.png";

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
const NavConfirmModal = ({
  isOpenNavConfirmModal,
  setIsOpenNavConfirmModal,
  confirmTransition
}) => {
  const classes = useStyles();
  const allowTransition = () => {
    confirmTransition.setHasConfirmedTransition(true);
    confirmTransition.defaultConfirmCallback(true);
    setIsOpenNavConfirmModal(false);
  };

  const blockTransition = () => {
    confirmTransition.setHasConfirmedTransition(false);
    confirmTransition.defaultConfirmCallback(false);
    setIsOpenNavConfirmModal(false);
  };

  if (!isOpenNavConfirmModal) return null;

  return (
    <ModalDialog onClose={blockTransition} showCloseBox={false}>
      <h2 className={classes.title}>
        <strong>Leave page and delete unsaved data?</strong>
      </h2>
      <br />
      <p className={classes.warningWrapper}>
        <img src={WarningIcon} alt="Warning" />
        <span className={classes.warningMessage}>
          &nbsp; This will permanently delete any unsaved projects or changes to
          project.
        </span>
      </p>
      <div className={classes.modalActions}>
        <Button
          color="colorCancel"
          variant="text"
          id="modalCancel"
          data-testid="transitionCancel"
          onClick={blockTransition}
        >
          Cancel
        </Button>
        <Button
          color="colorError"
          id="modalProceed"
          data-testid="transitionProceed"
          onClick={allowTransition}
        >
          Proceed
        </Button>
      </div>
    </ModalDialog>
  );
};

NavConfirmModal.propTypes = {
  isOpenNavConfirmModal: PropTypes.bool.isRequired,
  setIsOpenNavConfirmModal: PropTypes.func.isRequired,
  confirmTransition: PropTypes.object
};

export default NavConfirmModal;
