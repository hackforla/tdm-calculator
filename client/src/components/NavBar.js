import React from "react";
import { createUseStyles } from "react-jss";
import { NavLink, withRouter } from "react-router-dom";
import NavBarLogin from "./NavBarLogin";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  navbar: {
    flexGrow: "1",
    flexShrink: "0",
    flexBasis: "content",
    marginLeft: "2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    listStyleType: "none",
    "@media print": {
      display: "none"
    },
    "@media (max-width:900px)": {
      marginLeft: "1em"
    },
    "@media (max-width:768px)": {
      marginLeft: 0
    }
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    marginRight: "2em",
    "&:hover": {
      color: "#a7c539"
    },
    "@media (max-width:900px)": {
      marginRight: "1em"
    }
  },
  currentLink: {
    borderBottom: "2px solid #a7c539"
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
    "@media (max-width:768px)": {
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
    paddingRight: 0,
    marginRight: "1em",
    "@media (max-width:900px)": {
      marginLeft: "1em"
    },
    "@media (max-width:768px)": {
      marginLeft: 0
    }
  },
  "@media (max-width:768px)": {
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

const NavBar = ({ account, navbarOpen, setNavbarOpen }) => {
  const classes = useStyles();

  const handleHamburgerMenuClick = () => {
    setNavbarOpen(window.innerWidth < 768 ? !navbarOpen : false);
  };

  return (
    <ul className={classes.navbar}>
      {account && account.id && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            activeClassName={classes.currentLink}
            to="/projects"
            onClick={handleHamburgerMenuClick}
          >
            My Projects
          </NavLink>
        </li>
      )}
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          activeClassName={classes.currentLink}
          to="/calculation/1"
          onClick={handleHamburgerMenuClick}
        >
          Create Project
        </NavLink>
      </li>
      {account && account.isSecurityAdmin && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            activeClassName={classes.currentLink}
            to="/roles"
            onClick={handleHamburgerMenuClick}
          >
            Security
          </NavLink>
        </li>
      )}
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          activeClassName={classes.currentLink}
          to="/about"
          onClick={handleHamburgerMenuClick}
        >
          About
        </NavLink>
      </li>
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          activeClassName={classes.currentLink}
          to="/publiccomment"
          onClick={handleHamburgerMenuClick}
        >
          Public Comment
        </NavLink>
      </li>
      <NavBarLogin
        account={account}
        classes={classes}
        navbarOpen={navbarOpen}
        handleHamburgerMenuClick={handleHamburgerMenuClick}
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

export default withRouter(NavBar);
