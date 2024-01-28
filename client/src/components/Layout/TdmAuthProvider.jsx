import React, { useState } from "react";
import PropTypes from "prop-types";
import UserContext from "../../contexts/UserContext";

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

const TdmSecurity = ({ children }) => {
  const [account, setAccount] = useState(getUserFromLocalStorage());

  const updateAccount = userAccount => {
    /*
      Storing user account object in Local Storage as well as state allows the
      login session to persist across browser sessions. It also allows a deep
      link to a protexted client path be propery authenticated.
     */
    localStorage.setItem("currentUser", JSON.stringify(userAccount));
    setAccount(userAccount);
  };

  return (
    <UserContext.Provider value={{ account, updateAccount }}>
      {children}
    </UserContext.Provider>
  );
};

TdmSecurity.propTypes = {
  children: PropTypes.any
};

export default TdmSecurity;
