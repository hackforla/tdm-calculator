import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBarLogin = props => {
  const { account, classes, setLoggedOutAccount } = props;

  const loginLink = (
    <li className={classes.userLogin}>
      <Link className={`${classes.link} ${classes.lastItem}`} to="/login">
        Login
      </Link>
    </li>
  );

  const userGreeting = (
    <li className={classes.userLogin}>
      <h4>Hello, {`${account.firstName} ${account.lastName} `}</h4>
    </li>
  );

  const logoutLink = (
    <li>
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
      {account.firstName && userGreeting}
      {account.email && logoutLink}
    </React.Fragment>
  );
};

NavBarLogin.propTypes = {
  account: PropTypes.object,
  classes: PropTypes.object.isRequired,
  setLoggedOutAccount: PropTypes.func.isRequired
};

export default NavBarLogin;
