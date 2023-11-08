import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import ModalDialog from "../UI/AriaModal/ModalDialog";
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
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
  };

  if (localStorage.getItem("termsAndConditions")) return null;

  return (
    <ModalDialog
      mounted={modalOpen}
      onClose={closeModal}
      omitCloseBox={true}
      underlayClickExits={false}
      escapeExits={false}
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
            navigate(0);
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

export default TermsAndConditionsModal;
