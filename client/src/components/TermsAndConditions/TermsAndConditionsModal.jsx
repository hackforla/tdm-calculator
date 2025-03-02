import React from "react";
import { createUseStyles } from "react-jss";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

const useStyles = createUseStyles({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
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

      <div className={classes.buttonFlexBox}>
        <Button
          id="cy-terms-decline"
          onClick={e => {
            e.preventDefault();
            window.location.href = "https://ladot.lacity.org/";
            // THIS WILL CLOSE THE MODAL IMPLICITLY
          }}
          variant="secondary"
        >
          Decline and exit site
        </Button>

        <Button
          id="cy-terms-accept"
          variant="primary"
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
