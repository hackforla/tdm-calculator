import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ isAuthorized, children, path, ...rest }) {
  return (
    <Route
      path={path}
      {...rest}
      render={() => {
        return isAuthorized ? children : <Redirect to="/unauthorized" />;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  isAuthorized: PropTypes.bool, // The result of a boolean expr indicating if route is authorized
  children: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired
};

export default ProtectedRoute;
