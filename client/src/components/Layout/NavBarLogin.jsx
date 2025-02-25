import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTheme } from "react-jss";
import Popup from "reactjs-popup";
import { MdClose, MdWarning } from "react-icons/md";

const NavBarLogin = ({ classes, handleHamburgerMenuClick }) => {
  const theme = useTheme();
  const userContext = useContext(UserContext);
  const account = userContext.account;

  const [isCalculation, setIsCalculation] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const closeModal = () => setTooltipOpen(false);

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
    <Link
      id="cy-login-menu-item"
      className={`${classes.link} ${classes.lastItem}`}
      to="/login"
      onClick={handleHamburgerMenuClick}
    >
      Login
    </Link>
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
          userContext.updateAccount(null);
          handleHamburgerMenuClick;
        }}
      >
        Logout
      </Link>
    </li>
  );

  return !account || !account.email ? (
    !isCalculation ? (
      <li className={clsx(classes.userLogin, classes.linkBlock)}>
        {loginLink}
      </li>
    ) : (
      <li className={clsx(classes.userLogin, classes.linkBlock)}>
        <Popup
          open={tooltipOpen}
          onClose={closeModal}
          closeOnDocumentClick={false}
          lockScroll={true}
          trigger={<span style={{ cursor: "pointer" }}>{loginLink}</span>}
          position="bottom right"
          arrow={true}
          arrowStyle={{
            borderColor: theme.colors.warning,
            color: theme.colorTooltipBackground
          }}
          contentStyle={{
            borderRadius: "5px",
            border: "1px solid " + theme.colors.warning,
            width: "25rem",
            backgroundColor: theme.colorTooltipBackground,
            boxShadow:
              "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)"
          }}
        >
          {close => {
            return (
              <div style={{ margin: "1rem" }}>
                <MdClose
                  style={{
                    backgroundColor: "transparent",
                    color: theme.colors.secondary.gray,
                    border: "none",
                    position: "absolute",
                    top: "0.25rem",
                    right: "0.25rem",
                    cursor: "pointer"
                  }}
                  onClick={close}
                />
                {/* </button> */}
                <div style={{ display: "flex", margin: "0" }}>
                  <MdWarning
                    style={{
                      color: theme.colors.warning,
                      width: "20px",
                      height: "20px",
                      margin: "0"
                    }}
                  />
                  <div style={{ marginLeft: "0.5rem" }}>
                    Only projects created after logging in can be saved
                  </div>
                </div>
              </div>
            );
          }}
        </Popup>
        {/* <NavBarToolTip /> */}
      </li>
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
