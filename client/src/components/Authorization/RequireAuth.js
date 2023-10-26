import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function RequireAuth({ children, isAuthorized, redirectTo }) {
  return isAuthorized ? children : <Redirect to={redirectTo} />;
}

RequireAuth.propTypes = {
  children: PropTypes.any,
  isAuthorized: PropTypes.bool,
  redirectTo: PropTypes.string
};

export default RequireAuth;
