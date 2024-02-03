import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../contexts/UserContext";
import * as accountService from "../../services/account.service";
import { useOktaAuth } from "@okta/okta-react";

const OktaTdmAuthProvider = ({ children }) => {
  const userContext = useContext(UserContext);
  const [account, setAccount] = useState();

  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    const authenticate = async () => {
      if (!authState || !authState.isAuthenticated) {
        // When user isn't authenticated, forget any user info
        return;
      } else {
        // get user information from `/userinfo` endpoint
        const info = await oktaAuth.getUser();
        try {
          const response = await accountService.getAuthorization({
            email: info.email,
            firstName: info.given_name,
            lastName: info.family_name,
            oktaAccessToken: authState.accessToken.accessToken
          });
          if (response.isSuccess) {
            setAccount(response.user);
          } else {
            setAccount(null);
          }
        } catch (err) {
          setAccount(null);
        }
      }
    };
    authenticate();
  }, [authState, oktaAuth, userContext]); // Update if authState changes

  return (
    <UserContext.Provider value={{ account, updateAccount: setAccount }}>
      {children}
    </UserContext.Provider>
  );
};

OktaTdmAuthProvider.propTypes = {
  children: PropTypes.any
};

export default OktaTdmAuthProvider;
