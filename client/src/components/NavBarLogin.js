import React, { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx";
import NavBarToolTip from "./NavBarToolTip";

const NavBarLogin = ({ classes, handleHamburgerMenuClick }) => {
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const [isCalculation, setIsCalculation] = useState(false);

  const location = useLocation();

  useEffect(() => {
    let match = matchPath(location.pathname, {
      path: "/calculation/:id"
    });
    if (match) {
      setIsCalculation(true);
    } else {
      setIsCalculation(false);
    }
  }, [location.pathname]);

  const loginLink = (
    <li className={clsx(classes.userLogin, classes.linkBlock)}>
      <Link
        id="cy-login-menu-item"
        className={`${classes.link} ${classes.lastItem}`}
        to="/login"
        onClick={handleHamburgerMenuClick}
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
      <Link
        className={`${classes.link} ${classes.lastItem}`}
        to={{
          pathname: `/login/${(account && account.email) || ""}`,
          state: { prevPath: location.pathname }
        }}
        onClick={() => {
          userContext.updateAccount({});
          handleHamburgerMenuClick;
        }}
      >
        Logout
      </Link>
    </li>
  );

  return !account || !account.email ? (
    !isCalculation ? (
      <>{loginLink}</>
    ) : (
      <>
        <NavBarToolTip />
        {loginLink}
      </>
    )
  ) : (
    <>
      {getUserGreeting(account)}
      {logoutLink}
    </>
  );
};

NavBarLogin.propTypes = {
  account: PropTypes.object,
  classes: PropTypes.object.isRequired,
  handleHamburgerMenuClick: PropTypes.func
};

export default NavBarLogin;
