import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx";
import NavBarToolTip from "./NavBarToolTip";

const NavBarLogin = ({ classes, handleHamburgerMenuClick }) => {
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const [isCalculation, setIsCalculation] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (pathname.startsWith("/calculation/")) {
      setIsCalculation(true);
    } else {
      setIsCalculation(false);
    }
  }, [pathname]);

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
      <Link
        className={`${classes.link} ${classes.lastItem}`}
        to={{
          pathname: `/updateaccount/${(account && account.email) || ""}`,
          state: { prevPath: location.pathname }
        }}
      >
        Hello, {`${account.firstName} ${account.lastName} `}
      </Link>
    </li>
  );

  const logoutLink = (
    <li className={classes.linkBlock}>
      <Link
        className={`${classes.link} ${classes.lastItem}`}
        to={{
          pathname: `/logout`,
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
