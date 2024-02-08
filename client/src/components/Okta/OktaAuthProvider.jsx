import React from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import { Security } from "@okta/okta-react";
import { toRelativeUrl } from "@okta/okta-auth-js";

const OktaAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  const { oktaAuth } = useLoaderData();

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
