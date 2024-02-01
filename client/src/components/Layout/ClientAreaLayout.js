import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withToastProvider } from "../../contexts/Toast";
import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import TermsAndConditionsModal from "../TermsAndConditions/TermsAndConditionsModal";
import ChecklistModal from "../Checklist/ChecklistModal";
import OktaAuthProvider from "../Okta/OktaAuthProvider";
import OktaTdmAuthProvider from "../Okta/OktaTdmAuthProvider";
import TdmAuthProvider from "./TdmAuthProvider";

const useStyles = createUseStyles({
  app: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  }
});

const ClientAreaLayout = ({ appContainerRef }) => {
  const classes = useStyles();
  const [checklistModalOpen, setChecklistModalOpen] = useState(false);
  const [hasAcceptedTerms, setAcceptedTerms] = useState(() => {
    const accepted = localStorage.getItem("termsAndConditions");
    return accepted === "Accepted";
  });

  const toggleChecklistModal = () => {
    setChecklistModalOpen(!checklistModalOpen);
  };

  useEffect(() => {
    if (hasAcceptedTerms) {
      localStorage.setItem("termsAndConditions", "Accepted");
    }
  }, [hasAcceptedTerms]);

  const onAcceptTerms = () => {
    setAcceptedTerms(true);
    setChecklistModalOpen(true);
  };

  return (
    <div className={classes.app} id="app-container" ref={appContainerRef}>
      {process.env.REACT_APP_OKTA === "T" ? (
        <OktaAuthProvider>
          <OktaTdmAuthProvider>
            <TermsAndConditionsModal
              hasAcceptedTerms={hasAcceptedTerms}
              onAcceptTerms={onAcceptTerms}
            />
            <ChecklistModal
              checklistModalOpen={checklistModalOpen}
              toggleChecklistModal={toggleChecklistModal}
            />
            <Header />
            <Outlet />
            <Footer toggleChecklistModal={toggleChecklistModal} />
          </OktaTdmAuthProvider>
        </OktaAuthProvider>
      ) : (
        <TdmAuthProvider>
          <TermsAndConditionsModal
            hasAcceptedTerms={hasAcceptedTerms}
            onAcceptTerms={onAcceptTerms}
          />
          <ChecklistModal
            checklistModalOpen={checklistModalOpen}
            toggleChecklistModal={toggleChecklistModal}
          />
          <Header />
          <Outlet />
          <Footer toggleChecklistModal={toggleChecklistModal} />
        </TdmAuthProvider>
      )}
    </div>
  );
};

ClientAreaLayout.propTypes = {
  appContainerRef: PropTypes.any
};

export default withToastProvider(ClientAreaLayout);
