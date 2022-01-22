import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "./components/user-context";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import NavConfirmModal from "./components/NavConfirmModal";
import {
  AppInsightsContext,
  AppInsightsErrorBoundary
} from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./AppInsights";

const AppWrapper = () => {
  const [account, setAccount] = useState({});
  const [confirmTransition, setConfirmTransition] = useState(null);
  const [hasConfirmedTransition, setHasConfirmedTransition] = useState(true);
  const [isOpenNavConfirmModal, setIsOpenNavConfirmModal] = useState(false);
  const contentContainerRef = useRef();
  const appContainerRef = useRef();

  const setLoggedInAccount = loggedInUser => {
    setAccount(loggedInUser);
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        const parsedAccount = JSON.parse(currentUser);
        setAccount(parsedAccount);
      } catch (err) {
        // TODO: replace with production error logging.
        console.error(
          "Unable to parse current user from local storage.",
          currentUser
        );
      }
    } else {
      setLoggedInAccount({});
    }
  }, []);

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
        <UserContext.Provider value={account}>
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
                setLoggedInAccount={setLoggedInAccount}
                hasConfirmedTransition={hasConfirmedTransition}
                isOpenNavConfirmModal={isOpenNavConfirmModal}
                contentContainerRef={contentContainerRef}
                appContainerRef={appContainerRef}
              />
            </AppInsightsErrorBoundary>
          </Router>
        </UserContext.Provider>
      </AppInsightsContext.Provider>
    </React.Fragment>
  );
};

export default AppWrapper;
