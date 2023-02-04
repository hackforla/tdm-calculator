import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "./Button/Button";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

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
    padding: "50px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)",
    width: "47%",
    borderRadius: "5px"
  },
  title: {
    textAlign: "center"
  },
  deselectedWrapper: {
    textAlign: "center"
  },
  deselectedAlign: {
    lineHeight: "40px"
  },
  modalActions: {
    display: "flex",
    justifyContent: "center"
  }
});
const InapplicableStrategiesModal = props => {
  const { inapplicableStrategiesModal, closeStrategiesModal } = props;

  const classes = useStyles();

  return (
    <Modal
      isOpen={inapplicableStrategiesModal}
      onRequestClose={closeStrategiesModal}
      contentLabel="Inapplicable Strategies"
      overlayClassName={classes.overlay}
      className={classes.content}
      shouldFocusAfterRender={false}
    >
      <div className={classes.deselectedWrapper}>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          style={{ color: "#E46247", height: "80px" }}
          alt="Warning"
        />
        <h2 className={classes.deselectedAlign}>
          Due to changes made to the project specifications, one or more TDM
          strategies are no longer applicable and have been automatically
          de-selected
        </h2>
      </div>
      <div className={classes.modalActions}>
        <Button
          color="colorDeselect"
          id="modalProceed"
          data-testid="transitionProceed"
          onClick={closeStrategiesModal}
        >
          Okay, I Understand
        </Button>
      </div>
    </Modal>
  );
};

InapplicableStrategiesModal.propTypes = {
  inapplicableStrategiesModal: PropTypes.bool.isRequired,
  closeStrategiesModal: PropTypes.func
};

export default InapplicableStrategiesModal;
