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
    justifyContent: "center"
  }
});
const InapplicableStrategiesModal = (
  inapplicableStrategiesModalOpen,
  setInapplicableStrategiesModal
) => {
  const classes = useStyles();

  return (
    <Modal
      isOpen={inapplicableStrategiesModalOpen}
      onRequestClose={() => setInapplicableStrategiesModal(false)}
      contentLabel="Navigation Confirmation"
      overlayClassName={classes.overlay}
      className={classes.content}
      shouldFocusAfterRender={false}
    >
      <p className={classes.warningWrapper}>
        <img src={WarningIcon} alt="Warning" />
        <span className={classes.warningMessage}>
          &nbsp; This will permanently delete any unsaved projects or changes to
          project.
        </span>
      </p>
      <div className={classes.modalActions}>
        <Button
          color="colorError"
          id="modalProceed"
          data-testid="transitionProceed"
          onClick={() => setInapplicableStrategiesModal(false)}
        >
          Proceed
        </Button>
      </div>
    </Modal>
  );
};

InapplicableStrategiesModal.propTypes = {
  isOpenInapplicableStrategiesModal: PropTypes.bool.isRequired,
  setIsOpenInapplicableStrategiesModal: PropTypes.func.isRequired,
  confirmTransitionInapplicableStrategies: PropTypes.object
};

export default InapplicableStrategiesModal;
