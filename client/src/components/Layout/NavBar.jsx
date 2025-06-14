import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { createUseStyles } from "react-jss";
import { NavLink } from "react-router-dom";
import NavBarLogin from "./NavBarLogin";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  navbar: {
    flexGrow: "1",
    flexShrink: "0",
    flexBasis: "content",
    margin: "0 0 0 2em",
    padding: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    listStyleType: "none",
    "@media print": {
      display: "none"
    },
    "@media (max-width:1024px)": {
      marginLeft: "1em"
    },
    "@media (max-width:900px)": {
      marginLeft: 0
    }
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    marginRight: "5px",
    padding: "0.4em 0.75em",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      color: "#0f2940",
      backgroundColor: "#fff"
    },
    "@media (max-width:1024px)": {
      marginRight: "1em"
    },
    "&.active": {
      borderBottom: "1px solid #fff"
    },
    "&:focus": {
      color: "#0f2940",
      backgroundColor: "#fff"
    }
  },
  linkUnclickable: {
    color: "rgba(255, 255, 255, 0.5)",
    textDecoration: "none",
    marginRight: "2em",
    pointer: "none",
    cursor: "default",
    "@media (max-width:900px)": {
      marginRight: "1em"
    }
  },
  linkBlock: {
    "@media (max-width:900px)": {
      borderTop: "2px solid #0f2940",
      width: "100%",
      paddingTop: ".5em",
      paddingBottom: ".5em",
      display: "flex",
      justifyContent: "center",
      "&:last-child": {
        borderBottom: "2px solid #0f2940"
      }
    }
  },
  userLogin: {
    marginLeft: "auto"
  },
  lastItem: {
    marginLeft: "2em",
    marginRight: "1em",
    "@media (max-width:1024px)": {
      marginLeft: "1em"
    },
    "@media (max-width:900px)": {
      marginLeft: 0
    }
  },
  "@media (max-width:900px)": {
    navbar: {
      flexDirection: "column",
      minWidth: "100%"
    },
    userLogin: {
      marginLeft: 0,
      borderTop: "2px solid #0f2940",
      width: "100%",
      paddingTop: ".5em",
      paddingBottom: ".5em",
      display: "flex",
      justifyContent: "center"
    }
  }
});

const NavBar = ({ navbarOpen, setNavbarOpen }) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const account = userContext.account;

  const handleHamburgerMenuClick = () => {
    setNavbarOpen(window.innerWidth < 900 ? !navbarOpen : false);
  };

  return (
    <ul className={classes.navbar} onBlur={() => setNavbarOpen(false)}>
      {account && account.id && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            to="/projects"
            onClick={handleHamburgerMenuClick}
            onFocus={() => setNavbarOpen(true)}
          >
            My Projects
          </NavLink>
        </li>
      )}
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          to="/calculation/1/0"
          onClick={handleHamburgerMenuClick}
          onFocus={() => setNavbarOpen(true)}
        >
          Create Project
        </NavLink>
      </li>
      {account && account.isSecurityAdmin && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            to="/roles"
            onClick={handleHamburgerMenuClick}
            onFocus={() => setNavbarOpen(true)}
          >
            Security
          </NavLink>
        </li>
      )}
      {account && !account.isAdmin && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            to="/submissions"
            onClick={handleHamburgerMenuClick}
            onFocus={() => setNavbarOpen(true)}
          >
            Submissions
          </NavLink>
        </li>
      )}
      {account && account.isAdmin && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            to="/managesubmissions"
            onClick={handleHamburgerMenuClick}
            onFocus={() => setNavbarOpen(true)}
          >
            Manage Submissions
          </NavLink>
        </li>
      )}
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          to="/about"
          onClick={handleHamburgerMenuClick}
          onFocus={() => setNavbarOpen(true)}
        >
          About
        </NavLink>
      </li>
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          to="/faqs"
          onClick={handleHamburgerMenuClick}
          onFocus={() => setNavbarOpen(true)}
        >
          FAQ
        </NavLink>
      </li>
      {account && !account.isAdmin && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            to="/feedback"
            onClick={handleHamburgerMenuClick}
            onFocus={() => setNavbarOpen(true)}
          >
            Feedback
          </NavLink>
        </li>
      )}
      <NavBarLogin
        account={account}
        classes={classes}
        navbarOpen={navbarOpen}
        handleHamburgerMenuClick={handleHamburgerMenuClick}
        setNavbarOpen={setNavbarOpen}
      />
    </ul>
  );
};

NavBar.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    role: PropTypes.string,
    isAdmin: PropTypes.bool,
    isSecurityAdmin: PropTypes.bool
  }),
  navbarOpen: PropTypes.bool,
  setNavbarOpen: PropTypes.func.isRequired
};

export default NavBar;
