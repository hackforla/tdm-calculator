import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx";
import NavBarToolTip from "../Layout/NavBarToolTip";
import LoginButton from "./LoginButton";

const NavBarLogin = ({ classes, handleHamburgerMenuClick }) => {
  const userContext = useContext(UserContext);
  let account = userContext.account;
  let navigate = useNavigate();
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

  const getUserGreeting = account => (
    <li className={classes.userLogin}>
      <div
        className={`${classes.link} ${classes.lastItem}`}
        to={{
          pathname: `/updateaccount/${(account && account.email) || ""}`,
          state: { prevPath: location.pathname }
        }}
      >
        Hello, {`${account.firstName} ${account.lastName} `}
      </div>
    </li>
  );

  const loginButton = (
    <li className={clsx(classes.userLogin, classes.linkBlock)}>
      <LoginButton onClick={() => handleHamburgerMenuClick} />
    </li>
  );

  const logoutButton = (
    <li className={classes.linkBlock}>
      <LoginButton
        onClick={() => {
          handleHamburgerMenuClick();
          navigate("/logout", { state: { prevPath: location.pathname } });
        }}
      />
    </li>
  );

  return !account || !account.email ? (
    !isCalculation ? (
      <>{loginButton}</>
    ) : (
      <>
        <NavBarToolTip />
        {loginButton}
      </>
    )
  ) : (
    <>
      {getUserGreeting(account)}
      {logoutButton}
    </>
  );
};

NavBarLogin.propTypes = {
  account: PropTypes.object,
  classes: PropTypes.object.isRequired,
  handleHamburgerMenuClick: PropTypes.func
};

export default NavBarLogin;
