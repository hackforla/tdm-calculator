import React, { useEffect } from "react";
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
    modalType,
    // title,
    // text,
    // icon,
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
        event.preventDefault();
        toggleModalState(false);
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
      <div className={classes.deselectedWrapper}>
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
          //First Button
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
          //Second Button
          <Button
            color="colorDeselect"
            id="modalProceed"
            data-testid="transitionProceed"
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

// Modal.propTypes = {
// title: PropTypes.string,
// text: PropTypes.string,
// icon: PropTypes.string,
// buttonOne: PropTypes.string,
// buttonTwo: PropTypes.string,
// nestedComponent: ""
// };
export default ApplicationModal;
