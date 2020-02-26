import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBarLogin = props => {
  const { account, classes, setLoggedOutAccount } = props;

  const loginLink = (
    <li className={classes.userLogin}>
      <Link className={classes.link} to="/login">
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
      <Link className={classes.link} onClick={setLoggedOutAccount}>
        Logout
      </Link>
    </li>
  );

  return !account || !account.email ? (
    loginLink
  ) : (
    <>
      {account.firstName && userGreeting}
      {account.email && logoutLink}
    </>
  );
};

NavBarLogin.propTypes = {
  account: PropTypes.object,
  classes: PropTypes.object.isRequired,
  setLoggedOutAccount: PropTypes.func.isRequired
};

export default NavBarLogin;
