import React from "react";
import { createUseStyles } from "react-jss";
import Modal from "react-modal";
import PropTypes from "prop-types";
import ChecklistContent from "./ChecklistContent";
import { FaX } from "react-icons/fa6";

import "./ChecklistModal.css";

const useStyles = createUseStyles({
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "42px auto"
  },
  close: {
    display: "flex",
    justifyContent: "flex-end",
    border: "0 solid white",
    backgroundColor: "transparent",
    "&:hover": {
      cursor: "pointer"
    }
  }
});

const modalStyleDefaultOverrides = {
  overlay: {
    zIndex: "999",
    position: "fixed",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    fontSize: "1rem",
    fontWeight: "normal"
  },
  content: {
    maxWidth: "90vw",
    minWidth: "40vw",
    padding: "1rem",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    border: "1px solid #d8dce3",
    borderRadius: "0",
    boxSizing: "border-box",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 1)"
  }
};

const ChecklistModal = ({ checklistModalOpen, toggleChecklistModal }) => {
  const classes = useStyles();

  return (
    <Modal
      closeTimeoutMS={1500}
      isOpen={checklistModalOpen}
      onRequestClose={toggleChecklistModal}
      shouldCloseOnOverlayClick={true}
      contentLabel="Checklist Modal"
      style={modalStyleDefaultOverrides}
      className={classes.modal}
    >
      <span className={classes.close} onClick={toggleChecklistModal}>
        {/* <FontAwesomeIcon icon={faX} /> */}
        <FaX />
      </span>
      <ChecklistContent />
    </Modal>
  );
};

ChecklistModal.propTypes = {
  checklistModalOpen: PropTypes.bool,
  toggleChecklistModal: PropTypes.func
};

export default ChecklistModal;
