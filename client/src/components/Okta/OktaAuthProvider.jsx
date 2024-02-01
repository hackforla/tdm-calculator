import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import config from "../../okta.config";

const oktaAuth = new OktaAuth(config.oidc);

const OktaAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
};

OktaAuthProvider.propTypes = {
  children: PropTypes.any
};

export default OktaAuthProvider;
