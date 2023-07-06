import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
// import NavConfirmModal from "./components/NavConfirmModal";
import ApplicationModal from "./components/Modal/ApplicationModal";
import {
  AppInsightsContext,
  AppInsightsErrorBoundary
} from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./AppInsights";

const getUserFromLocalStorage = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    try {
      const parsedAccount = JSON.parse(currentUser);
      return parsedAccount;
    } catch (err) {
      return {};
    }
  } else {
    return {};
  }
};

const AppWrapper = () => {
  const [account, setAccount] = useState(getUserFromLocalStorage());
  const [confirmTransition, setConfirmTransition] = useState(null);
  const [hasConfirmedTransition, setHasConfirmedTransition] = useState(true);
  const [isOpenNavConfirmModal, setIsOpenNavConfirmModal] = useState(false);
  const [checklistModalOpen, setChecklistModalOpen] = useState(false);
  const contentContainerRef = useRef();
  const appContainerRef = useRef();

  const updateAccount = userAccount => {
    /* 
      Storing user account object in Local Storage as well as state allows the
      login session to persist across browser sessions. It also allows a deep 
      link to a protexted client path be propery authenticated.
     */
    localStorage.setItem("currentUser", JSON.stringify(userAccount));
    setAccount(userAccount);
  };

  const getUserConfirmation = (_message, defaultConfirmCallback) => {
    setHasConfirmedTransition(false);
    setConfirmTransition(() => ({
      defaultConfirmCallback: defaultConfirmCallback,
      setHasConfirmedTransition: setHasConfirmedTransition
    }));
    setIsOpenNavConfirmModal(!isOpenNavConfirmModal);
  };

  useEffect(() => {
    if (localStorage.getItem("termsAndConditions")) {
      if (localStorage.getItem("checklist")) {
        setChecklistModalOpen(false);
      } else {
        setChecklistModalOpen(true);
        window.localStorage.setItem("checklist", "Accepted");
      }
    }
  }, []);

  const toggleChecklistModal = () => {
    if (!localStorage.getItem("checklist")) {
      if (checklistModalOpen === false) {
        setChecklistModalOpen(true);
        window.localStorage.removeItem("checklist");
      } else {
        setChecklistModalOpen(false);
        window.localStorage.setItem("checklist", "Accepted");
      }
    }
  };

  return (
    <React.Fragment>
      <AppInsightsContext.Provider value={reactPlugin}>
        <UserContext.Provider value={{ account, updateAccount }}>
          <Router getUserConfirmation={getUserConfirmation}>
            <AppInsightsErrorBoundary
              onError={<ErrorPage />}
              appInsights={reactPlugin}
            >
              <ApplicationModal
                modalType={"NavConfirm"}
                ModalState={isOpenNavConfirmModal}
                toggleModalState={setIsOpenNavConfirmModal}
                buttonTwoFunction={confirmTransition}
              ></ApplicationModal>
              <App
                account={account}
                hasConfirmedTransition={hasConfirmedTransition}
                isOpenNavConfirmModal={isOpenNavConfirmModal}
                contentContainerRef={contentContainerRef}
                appContainerRef={appContainerRef}
                checklistModalOpen={checklistModalOpen}
                toggleChecklistModal={toggleChecklistModal}
              />
            </AppInsightsErrorBoundary>
          </Router>
        </UserContext.Provider>
      </AppInsightsContext.Provider>
    </React.Fragment>
  );
};

export default AppWrapper;
