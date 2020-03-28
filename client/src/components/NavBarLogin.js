import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBarLogin = ({ account, classes, setLoggedOutAccount }) => {
  const loginLink = (
    <li className={(classes.userLogin, classes.linkBlock)}>
      <Link className={`${classes.link} ${classes.lastItem}`} to="/login">
        Login
      </Link>
    </li>
  );

  const getUserGreeting = account => (
    <li className={classes.userLogin}>
      <h4>Hello, {`${account.firstName} ${account.lastName} `}</h4>
    </li>
  );

  const logoutLink = (
    <li className={classes.linkBlock}>
      <button
        className={`link ${classes.lastItem}`}
        onClick={setLoggedOutAccount}
      >
        Logout
      </button>
    </li>
  );

  return !account || !account.email ? (
    loginLink
  ) : (
    <React.Fragment>
      {getUserGreeting(account)}
      {logoutLink}
    </React.Fragment>
  );
};

NavBarLogin.propTypes = {
  account: PropTypes.object,
  classes: PropTypes.object.isRequired,
  setLoggedOutAccount: PropTypes.func
};

export default NavBarLogin;
