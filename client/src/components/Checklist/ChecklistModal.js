import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "react-modal";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import ChecklistContent from "./ChecklistContent";

const useStyles = createUseStyles({
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "42px auto"
  },
  close: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "30px"
  }
});

const modalStyleDefaultOverrides = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100
  },
  content: {
    position: "static",
    top: "50px",
    right: "auto",
    bottom: "auto",
    left: "200px",
    boxSizing: "border-box",
    maxHeight: "500px",
    width: "500px",
    padding: "30px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)"
  }
};

const ChecklistModal = () => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(true);
  const history = useHistory();

  const toggleChecklistModal = () => {
    setModalOpen(!modalOpen);
  };

  if (localStorage.getItem("checklist")) return null;

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={toggleChecklistModal}
      shouldCloseOnOverlayClick={false}
      contentLabel="Checklist Modal"
      style={modalStyleDefaultOverrides}
      className={classes.modal}
    >
      <span className={classes.close} onClick={toggleChecklistModal}>
        x
      </span>
      <ChecklistContent />

      <div className={classes.modalActions}>
        <Button
          onClick={e => {
            e.preventDefault();
            window.localStorage.setItem("checklist", "Accepted");
            history.go(0);
          }}
        >
          Accept
        </Button>
      </div>
    </Modal>
  );
};

ChecklistModal.propTypes = {
  checklistModalProp: PropTypes.string
};

export default withRouter(ChecklistModal);
