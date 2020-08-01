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

const NavBar = props => {
  const {
    account,
    setLoggedOutAccount,
    // location,
    navbarOpen,
    setNavbarOpen
  } = props;
  const classes = useStyles();

  const handleClick = () => {
    setNavbarOpen(window.innerWidth < 768 ? !navbarOpen : false);
  };

  return (
    <ul className={classes.navbar}>
      {/* <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          activeClassName={classes.currentLink}
          exact
          to="/"
          onClick={handleClick}
        >
          Home
        </NavLink>
      </li> */}
      {account && account.id && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            activeClassName={classes.currentLink}
            to="/projects"
            onClick={handleClick}
          >
            My Projects
          </NavLink>
        </li>
      )}
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          activeClassName={classes.currentLink}
          to="/calculation/1/"
        >
          Create Project
        </NavLink>
      </li>
      {/* {account && account.isAdmin && (
        <li>
          <Link className={classes.link} to="/admin">
            Admin
          </Link>
        </li>
      )} */}
      {account && account.isSecurityAdmin && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            activeClassName={classes.currentLink}
            to="/roles"
            onClick={handleClick}
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
          onClick={handleClick}
        >
          About
        </NavLink>
      </li>
      {/* 
      <li>
        <Link className={classes.link} to="/contactus">Contact Us</Link>
      </li> */}
      <NavBarLogin
        account={account}
        classes={classes}
        setLoggedOutAccount={setLoggedOutAccount}
        navbarOpen={navbarOpen}
        handleClick={handleClick}
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
  setLoggedOutAccount: PropTypes.func,
  navbarOpen: PropTypes.bool,
  setNavbarOpen: PropTypes.func,
  isCreatingNewProject: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default withRouter(NavBar);
