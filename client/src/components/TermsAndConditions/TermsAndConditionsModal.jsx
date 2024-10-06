import React from "react";
import { createUseStyles } from "react-jss";
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

const TermsAndConditionsModal = ({ hasAcceptedTerms, onAcceptTerms }) => {
  const classes = useStyles();

  if (localStorage.getItem("termsAndConditions")) return null;

  return (
    <ModalDialog
      mounted={!hasAcceptedTerms}
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
            // THIS WILL CLOSE THE MODAL IMPLICITLY
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
            onAcceptTerms();
          }}
        >
          Accept
        </Button>
      </div>
    </ModalDialog>
  );
};

TermsAndConditionsModal.propTypes = {
  hasAcceptedTerms: PropTypes.bool,
  onAcceptTerms: PropTypes.func
};

export default TermsAndConditionsModal;
