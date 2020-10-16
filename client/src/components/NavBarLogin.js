import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import NavBarToolTip from "./NavBarToolTip";

const NavBarLogin = ({
  account,
  classes,
  setLoggedOutAccount,
  handleClick
}) => {
  const handleLogOut = () => {
    handleClick();
    setLoggedOutAccount();
  };

  const loginLink = (
    <li className={clsx(classes.userLogin, classes.linkBlock)}>
      <Link
        className={`${classes.link} ${classes.lastItem}`}
        to="/login"
        onClick={handleClick}
      >
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
      <button className={`link ${classes.lastItem}`} onClick={handleLogOut}>
        Logout
      </button>
    </li>
  );

  return !account || !account.email ? (
    <React.Fragment>
      <NavBarToolTip />
      {loginLink}
    </React.Fragment>
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
  setLoggedOutAccount: PropTypes.func,
  handleClick: PropTypes.func
};

export default NavBarLogin;
