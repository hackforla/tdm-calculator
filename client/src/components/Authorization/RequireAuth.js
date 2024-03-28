import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserContext from "../../contexts/UserContext";

/*
  If user attempts to access react route that 
  requires Authentication or Authorization, this wrapper
  component determines if the Auth requirements are
  met and redirects to an /unauthorized route if not.

  If the roles prop is omitted, then the user only
  needs to be authenticated (i.e., logged in)
  Otherwise, the roles prop is an array of strings
  for roles that are allowed access to the 
  route. Allowable roles are "isAdmin" and
  "isSecurityAdmin" at this time.
*/
function RequireAuth({ children, roles }) {
  const userContext = useContext(UserContext);
  let allow = true;
  if (!userContext.account) {
    allow = true;
  } else if (!roles || roles.length === 0) {
    allow = true;
  } else {
    allow = roles.some(role => userContext.account[role]);
  }

  return allow ? children : <Navigate to={"/unauthorized"} />;
}

RequireAuth.propTypes = {
  children: PropTypes.any,
  roles: PropTypes.array
};

export default RequireAuth;
