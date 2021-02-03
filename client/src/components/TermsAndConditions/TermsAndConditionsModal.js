import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "react-modal";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

const useStyles = createUseStyles({
  modalActions: {
    display: "flex",
    justifyContent: "center",
    margin: "42px auto"
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
    maxHeight: "80%",
    width: "80%",
    padding: "60px 56px 0px 60px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)"
  }
};

const TermsAndConditionsModal = () => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(true);
  const history = useHistory();

  const toggleTermsAndConditionsModal = () => {
    setModalOpen(!modalOpen);
  };

  if (localStorage.getItem("termsAndConditions")) return null;

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={toggleTermsAndConditionsModal}
      shouldCloseOnOverlayClick={false}
      contentLabel="Terms and Conditions Modal"
      style={modalStyleDefaultOverrides}
      className={classes.modal}
    >
      <TermsAndConditionsContent />

      <div className={classes.modalActions}>
        <Button
          id="cy-terms-decline"
          onClick={e => {
            e.preventDefault();
            window.location.href = "https://ladot.lacity.org/";
          }}
          variant="outlined"
        >
          Decline and exit site
        </Button>

        <Button
          id="cy-terms-accept"
          color="colorPrimary"
          onClick={e => {
            e.preventDefault();
            window.localStorage.setItem("termsAndConditions", "Accepted");
            history.go(0);
          }}
        >
          Accept
        </Button>
      </div>
    </Modal>
  );
};

TermsAndConditionsModal.propTypes = {
  termsAndConditionsModalProp: PropTypes.string
};

export default withRouter(TermsAndConditionsModal);
