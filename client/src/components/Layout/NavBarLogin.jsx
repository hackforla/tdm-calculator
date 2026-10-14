import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTheme } from "react-jss";
import CloseBox from "../UI/CloseBox";
import Popup from "reactjs-popup";
import { MdWarning } from "react-icons/md";
import { useReplaceAriaAttribute } from "hooks/useReplaceAriaAttribute";

const NavBarLogin = ({ classes, handleHamburgerMenuClick, setNavbarOpen }) => {
  const theme = useTheme();
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

  const elementId = `login-link`;
  const popupContentId = `popup-content-${elementId}`;
  useReplaceAriaAttribute({
    elementId,
    deps: [],
    attrToRemove: "aria-describedby",
    attrToAdd: "aria-controls",
    value: popupContentId
  });

  const loginLink = (
    <Link
      id="cy-login-menu-item"
      className={`${classes.link} ${classes.lastItem}`}
      to="/login"
      onClick={handleHamburgerMenuClick}
      onFocus={() => setNavbarOpen(true)}
      onBlur={() => setNavbarOpen(false)}
    >
      Login
    </Link>
  );

  const getUserGreeting = account => (
    <li className={classes.userLogin}>
      <NavLink
        className={`${classes.link} ${classes.lastItem}`}
        to={{
          pathname: `/updateaccount/${(account && account.email) || ""}`,
          state: { prevPath: location.pathname }
        }}
        onFocus={() => setNavbarOpen(true)}
        onBlur={() => setNavbarOpen(false)}
      >
        Hello, {`${account.firstName} ${account.lastName} `}
      </NavLink>
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
          userContext.updateAccount(null);
          handleHamburgerMenuClick;
        }}
        onFocus={() => setNavbarOpen(true)}
        onBlur={() => setNavbarOpen(false)}
      >
        Logout
      </Link>
    </li>
  );

  useEffect(() => {
    const handleScroll = () => {
      const tooltip = document.querySelector(".popup-content");
      const loginButton = document.getElementById("cy-login-menu-item");
      if (tooltip && loginButton) {
        const rect = loginButton.getBoundingClientRect();
        tooltip.style.top = `${Math.floor(
          rect.bottom + window.scrollY + 10
        )}px`;
      }
    };

    const scrollableElement = document.querySelector("#body");
    scrollableElement.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return !account || !account.email ? (
    <li className={clsx(classes.userLogin, classes.linkBlock)}>{loginLink}</li>
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
  handleHamburgerMenuClick: PropTypes.func,
  setNavbarOpen: PropTypes.func.isRequired
};

export default NavBarLogin;
