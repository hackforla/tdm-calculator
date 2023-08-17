import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import ModalDialog from "../UI/ModalDialog/ModalDialog";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

const useStyles = createUseStyles({
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "42px auto"
  }
});

const TermsAndConditionsModal = () => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(true);
  const history = useHistory();

  const closeModal = () => {
    setModalOpen(false);
  };

  if (localStorage.getItem("termsAndConditions") || !modalOpen) return null;

  return (
    <ModalDialog
      onClose={closeModal}
      showCloseBox={false}
      closeOnEscape={false}
      closeOnBackdropClick={false}
    >
      <div style={{ overflowY: "auto", maxHeight: "80vh", marginTop: "3rem" }}>
        <TermsAndConditionsContent />
      </div>

      <div className={classes.modalActions}>
        <Button
          id="cy-terms-decline"
          onClick={e => {
            e.preventDefault();
            window.location.href = "https://ladot.lacity.org/";
            closeModal();
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
            closeModal();
          }}
        >
          Accept
        </Button>
      </div>
    </ModalDialog>
  );
};

TermsAndConditionsModal.propTypes = {
  termsAndConditionsModalProp: PropTypes.string
};

export default withRouter(TermsAndConditionsModal);
