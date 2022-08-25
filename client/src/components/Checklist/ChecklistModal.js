import React from "react";
import { createUseStyles } from "react-jss";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import PropTypes from "prop-types";
import ChecklistContent from "./ChecklistContent";

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
    fontSize: "25px",
    cursor: "pointer"
  }
});

const modalStyleDefaultOverrides = {
  overlay: {
    backgroundColor: "rgba(15, 41, 64, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "20"
  },
  content: {
    position: "static",
    top: "50px",
    right: "auto",
    bottom: "auto",
    left: "200px",
    boxSizing: "border-box",
    maxHeight: "fit-content",
    width: "500px",
    padding: "25px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)",
    borderRadius: "10px"
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
        x
      </span>
      <ChecklistContent />
    </Modal>
  );
};

ChecklistModal.propTypes = {
  checklistModalOpen: PropTypes.bool,
  toggleChecklistModal: PropTypes.func
};

export default withRouter(ChecklistModal);
