import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/ladot_white.png";
import NavBar from "./NavBar";
import { Environment } from "../helpers/Environment";

const useStyles = createUseStyles({
  header: {
    flexGrow: "0",
    flexShrink: "0",
    flexBasis: "content",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "1em",
    paddingRight: "1em",
    background: "#002E6D",
    zIndex: 10,
    "& h4": {
      color: "white"
    },
    "@media (max-width:900px)": {
      paddingRight: 0
    },
    "@media (max-width:768px)": {
      paddingLeft: 0,
      flexWrap: "wrap",
      overflow: "hidden",
      maxHeight: 54.4,
      transition: "max-height .5s ease-in-out",
      "&.navbarOpen": {
        maxHeight: 301.6
      }
    }
  },
  logo: {
    height: "2em",
    padding: 10
  },
  hamburgerButton: {
    display: "none",
    backgroundColor: "#002E6D",
    border: "none",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#aaa",
      cursor: "pointer"
    }
  },
  hamburger: {
    color: "white",
    fontSize: "2em"
  },
  "@media (max-width: 768px)": {
    logoContainer: {
      justifySelf: "start"
    },
    hamburgerButton: {
      display: "block",
      marginLeft: "auto",
      marginRight: "1em"
    }
  },
  environmentBadge: {
    backgroundColor: "orange",
    fontSize: "18px",
    padding: "4px 12px",
    borderRadius: "6px"
  }
});

const Header = () => {
  const classes = useStyles();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleHamburgerMenuClick = () => setNavbarOpen(!navbarOpen);

  const environmentBadge = Environment ? (
    <div className={classes.environmentBadge}>{Environment}</div>
  ) : null;

  return (
    <div className={clsx(classes.header, navbarOpen ? "navbarOpen" : "")}>
      <div className={classes.logoContainer}>
        <a href="//ladot.lacity.org" target="_blank" rel="noopener noreferrer">
          <img
            className={classes.logo}
            src={logo}
            alt="LA Department of Transportation Logo"
          />
        </a>
      </div>
      {Environment !== "PROD" ? environmentBadge : null}
      <button
        className={classes.hamburgerButton}
        onClick={handleHamburgerMenuClick}
      >
        <FontAwesomeIcon icon={faBars} className={classes.hamburger} />
      </button>
      <NavBar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
    </div>
  );
};

export default Header;
