import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function RequireAuth({ children, isAuthorized, redirectTo }) {
  return isAuthorized ? children : <Navigate to={redirectTo} />;
}

RequireAuth.propTypes = {
  children: PropTypes.any,
  isAuthorized: PropTypes.bool,
  redirectTo: PropTypes.string
};

export default RequireAuth;
