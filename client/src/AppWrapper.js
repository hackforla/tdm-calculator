import React, { useState, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import NavConfirmModal from "./components/NavConfirmModal";
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
  const [checklistModalOpen, setChecklistModalOpen] = useState(true);
  const contentContainerRef = useRef();
  const appContainerRef = useRef();

  const toggleChecklistModal = () => {
    setChecklistModalOpen(!checklistModalOpen);
    window.localStorage.setItem("checklist", "Accepted");
  };

  if (localStorage.getItem("checklist")) return null;

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

  return (
    <React.Fragment>
      <AppInsightsContext.Provider value={reactPlugin}>
        <UserContext.Provider value={{ account, updateAccount }}>
          <Router getUserConfirmation={getUserConfirmation}>
            <AppInsightsErrorBoundary
              onError={<ErrorPage />}
              appInsights={reactPlugin}
            >
              <NavConfirmModal
                confirmTransition={confirmTransition}
                isOpenNavConfirmModal={isOpenNavConfirmModal}
                setIsOpenNavConfirmModal={setIsOpenNavConfirmModal}
              />
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
