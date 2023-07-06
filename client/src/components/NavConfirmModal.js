import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "./Button/Button";
import { createUseStyles } from "react-jss";
import WarningIcon from "../images/warning-icon.png";

const useStyles = createUseStyles({
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",

    zIndex: "100",
    position: "fixed",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px"
  },
  content: {
    padding: "60px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)"
  },
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
    justifyContent: "flex-end"
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

  return (
    <Modal
      isOpen={isOpenNavConfirmModal}
      onRequestClose={() => setIsOpenNavConfirmModal(false)}
      contentLabel="Navigation Confirmation"
      overlayClassName={classes.overlay}
      className={classes.content}
      shouldFocusAfterRender={false}
    >
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
    </Modal>
  );
};

NavConfirmModal.propTypes = {
  isOpenNavConfirmModal: PropTypes.bool.isRequired,
  setIsOpenNavConfirmModal: PropTypes.func.isRequired,
  confirmTransition: PropTypes.object
};

export default NavConfirmModal;
