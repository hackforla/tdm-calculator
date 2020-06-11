import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/ladot_white.png";
import NavBar from "./NavBar";

const useStyles = createUseStyles({
  root: {
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

const Header = props => {
  const { account, setAccount, isCreatingNewProject } = props;
  const classes = useStyles();
  const history = useHistory();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const setLoggedOutAccount = () => {
    localStorage.clear();
    setAccount({});
    history.push("/login");
  };

  const handleClick = () => setNavbarOpen(!navbarOpen);

  return (
    <div className={clsx(classes.root, navbarOpen ? "navbarOpen" : "")}>
      <div className={classes.logoContainer}>
        <a href="//ladot.lacity.org" target="_blank" rel="noopener noreferrer">
          <img
            className={classes.logo}
            src={logo}
            alt="LA Department of Transportation Logo"
          />
        </a>
      </div>
      <button className={classes.hamburgerButton} onClick={handleClick}>
        <FontAwesomeIcon icon={faBars} className={classes.hamburger} />
      </button>
      <NavBar
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
        account={account}
        setLoggedOutAccount={setLoggedOutAccount}
        isCreatingNewProject={isCreatingNewProject}
      />
    </div>
  );
};

Header.propTypes = {
  account: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }),
  setAccount: PropTypes.func,
  isCreatingNewProject: PropTypes.bool
};

export default Header;
