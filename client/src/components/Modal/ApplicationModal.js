import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "../Button/Button";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import ModalData from "./ModalData.js";
import FocusTrap from "focus-trap-react";

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
  },
  close: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "25px",
    cursor: "pointer"
  },
  buttonRed: { backgroundColor: "rgba(228,98,71,255)" },
  buttonGreen: { backgroundColor: "rgba(167,197,57,255) " }
});
const ApplicationModal = props => {
  const {
    modalType,
    buttonOneFunction,
    buttonTwoFunction,
    buttonOneParameter,
    buttonTwoParameter,
    ModalState,
    toggleModalState,
    extendedContent
  } = props;

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === "Escape") {
        console.log("ESCAPE HIT");
        event.preventDefault();
        toggleModalState();
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
      isOpen={ModalState}
      onRequestClose={toggleModalState}
      contentLabel="Inapplicable Strategies"
      overlayClassName={classes.overlay}
      className={classes.content}
      shouldFocusAfterRender={false}
    >
      <FocusTrap focusTrapOptions={{ initialFocus: "#modal-body" }}>
        <div>
          <span className={classes.close}>
            <div
              onClick={() => {
                toggleModalState();
              }}
            >
              x
            </div>
          </span>
          <div className={classes.deselectedWrapper} href="#" id="modal-body">
            {ModalData[modalType].icon ? (
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#E46247", height: "80px" }}
                alt="Warning"
              />
            ) : null}

            {ModalData[modalType].text ? (
              <h2 className={classes.deselectedAlign}>
                {ModalData[modalType].text}
              </h2>
            ) : null}
          </div>
          {extendedContent}
          <div className={classes.modalActions}>
            {ModalData[modalType].buttonOne ? (
              <Button
                color="colorDeselect"
                id="modalProceed"
                data-testid="transitionProceed"
                onClick={() => {
                  if (buttonOneFunction) {
                    if (buttonOneParameter) {
                      buttonOneFunction(buttonOneParameter);
                    } else {
                      buttonOneFunction();
                    }
                  } else {
                    toggleModalState();
                  }
                }}
              >
                {ModalData[modalType].buttonOne}
              </Button>
            ) : null}
            {ModalData[modalType].buttonTwo ? (
              <Button
                color="blue"
                id="modalProceed"
                data-testid="transitionProceed"
                className={classes[ModalData[modalType].buttonColor]}
                onClick={() => {
                  if (buttonTwoParameter) {
                    buttonTwoFunction(buttonTwoParameter);
                  } else {
                    buttonTwoFunction();
                  }
                }}
              >
                {ModalData[modalType].buttonTwo}
              </Button>
            ) : null}
          </div>
        </div>
      </FocusTrap>
    </Modal>
  );
};

ApplicationModal.propTypes = {
  modalType: PropTypes.string,
  buttonOneFunction: PropTypes.func,
  buttonTwoFunction: PropTypes.func,
  buttonOneParameter: PropTypes.any,
  buttonTwoParameter: PropTypes.any,
  toggleModalState: PropTypes.func,
  ModalState: PropTypes.bool,
  extendedContent: PropTypes.any
};

export default ApplicationModal;
