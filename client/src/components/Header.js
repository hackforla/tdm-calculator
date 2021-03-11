import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/ladot_white.png";
import NavBar from "./NavBar";

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
  }
});

const Header = ({ account }) => {
  const classes = useStyles();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleHamburgerMenuClick = () => setNavbarOpen(!navbarOpen);

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
      <button
        className={classes.hamburgerButton}
        onClick={handleHamburgerMenuClick}
      >
        <FontAwesomeIcon icon={faBars} className={classes.hamburger} />
      </button>
      <NavBar
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
        account={account}
      />
    </div>
  );
};

Header.propTypes = {
  account: PropTypes.object.isRequired
};

export default Header;
