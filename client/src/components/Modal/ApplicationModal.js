import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import ModalData from "./ModalData.js";

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
const ApplicationModal = props => {
  const {
    inapplicableStrategiesModal,
    closeStrategiesModal,
    modalType
    // title,
    // text,
    // icon,
    // buttonOne,
    // buttonTwo
  } = props;

  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    // setModalOpen(inapplicableStrategiesModal);
    console.log(inapplicableStrategiesModal);
    console.log("ModalType", modalType);
    console.log("ModalType", ModalData[modalType]);

    setModalOpen(true);

    const keyDownHandler = event => {
      if (event.key === "Escape") {
        event.preventDefault();
        setModalOpen(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const classes = useStyles();

  return (
    <Modal
      isOpen={modalOpen}
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
        {ModalData[modalType].text ? (
          <h2 className={classes.deselectedAlign}>
            {ModalData[modalType].text}
          </h2>
        ) : null}
        {ModalData[modalType].nestedComponent ? (
          <Button
            color="colorDeselect"
            id="modalProceed"
            data-testid="transitionProceed"
            onClick={closeStrategiesModal}
          >
            {ModalData[modalType].buttonTwo}
          </Button>
        ) : null}
      </div>
      <div className={classes.modalActions}>
        <Button
          color="colorDeselect"
          id="modalProceed"
          data-testid="transitionProceed"
          onClick={closeStrategiesModal}
        >
          Okay
        </Button>
        {ModalData[modalType].buttonTwo ? (
          <Button
            color="colorDeselect"
            id="modalProceed"
            data-testid="transitionProceed"
            onClick={closeStrategiesModal}
          >
            {ModalData[modalType].buttonTwo}
          </Button>
        ) : null}
        {ModalData[modalType].icon ? (
          <Button
            color="colorDeselect"
            id="modalProceed"
            data-testid="transitionProceed"
            onClick={closeStrategiesModal}
          >
            {ModalData[modalType].buttonTwo}
          </Button>
        ) : null}
        {ModalData[modalType].input ? (
          <Button
            color="colorDeselect"
            id="modalProceed"
            data-testid="transitionProceed"
            onClick={closeStrategiesModal}
          >
            {ModalData[modalType].buttonTwo}
          </Button>
        ) : null}
      </div>
    </Modal>
  );
};

ApplicationModal.propTypes = {
  inapplicableStrategiesModal: PropTypes.bool.isRequired,
  closeStrategiesModal: PropTypes.func,
  modalType: PropTypes.string
};

// Modal.propTypes = {
// title: PropTypes.string,
// text: PropTypes.string,
// icon: PropTypes.string,
// buttonOne: PropTypes.string,
// buttonTwo: PropTypes.string,
// nestedComponent: ""
// };
export default ApplicationModal;
