import React, { useState, useEffect, useRef } from "react";
import UserContext from "./contexts/UserContext";
import App from "./App";

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

  const [hasAcceptedTerms, setAcceptedTerms] = useState(() => {
    const accepted = localStorage.getItem("termsAndConditions");
    return accepted === "Accepted";
  });

  useEffect(() => {
    if (hasAcceptedTerms) {
      localStorage.setItem("termsAndConditions", "Accepted");
    }
  }, [hasAcceptedTerms]);

  const onAcceptTerms = () => {
    setAcceptedTerms(true);
    setChecklistModalOpen(true);
  };

  const toggleChecklistModal = () => {
    setChecklistModalOpen(!checklistModalOpen);
  };

  return (
    <React.Fragment>
      <UserContext.Provider value={{ account, updateAccount }}>
        <App
          account={account}
          contentContainerRef={contentContainerRef}
          appContainerRef={appContainerRef}
          checklistModalOpen={checklistModalOpen}
          toggleChecklistModal={toggleChecklistModal}
          hasAcceptedTerms={hasAcceptedTerms}
          onAcceptTerms={onAcceptTerms}
        />
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default AppWrapper;
