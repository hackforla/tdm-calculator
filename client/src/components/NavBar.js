import React from "react";
import { createUseStyles } from "react-jss";
import { Link, withRouter } from "react-router-dom";
import NavBarLogin from "./NavBarLogin";
import PropTypes from "prop-types";
import clsx from "clsx";

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
      textDecoration: "underline"
    },
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
    location,
    navbarOpen,
    setNavbarOpen
  } = props;
  const classes = useStyles();

  const handleClick = () => {
    setNavbarOpen(window.innerWidth < 768 ? !navbarOpen : false);
  };

  const showNewProjectLink = () => {
    return location.pathname.split("/")[1] === "calculation" ? null : (
      <li className={classes.linkBlock}>
        <Link
          className={classes.link}
          to="/calculation/1"
          onClick={handleClick}
        >
          New Project
        </Link>
      </li>
    );
  };

  return (
    <ul className={classes.navbar}>
      <li className={classes.linkBlock}>
        <Link className={classes.link} to="/" onClick={handleClick}>
          Home
        </Link>
      </li>
      <li className={classes.linkBlock}>
        <Link className={classes.link} to="/projects" onClick={handleClick}>
          Projects
        </Link>
      </li>
      {showNewProjectLink()}
      {/* {account && account.isAdmin && (
        <li>
          <Link className={classes.link} to="/admin">
            Admin
          </Link>
        </li>
      )} */}
      {account /* && account.isSecurityAdmin */ && (
        <li className={classes.linkBlock}>
          <Link className={classes.link} to="/roles" onClick={handleClick}>
            Security
          </Link>
        </li>
      )}
      <li className={classes.linkBlock}>
        <Link className={classes.link} to="/about" onClick={handleClick}>
          About
        </Link>
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
  // rule: PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   calculationId: PropTypes.number.isRequired,
  //   code: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   category: PropTypes.string.isRequired,
  //   dataType: PropTypes.string.isRequired,
  //   value: PropTypes.any,
  //   units: PropTypes.string,
  //   functionBody: PropTypes.string,
  //   cssClass: PropTypes.string,
  //   panelDisplayOrder: PropTypes.number.isRequired,
  //   displayOrder: PropTypes.number.isRequired,
  //   calculationPanelId: PropTypes.number.isRequired,
  //   panelName: PropTypes.string
  // }),
  // onInputChange: PropTypes.func,
  account: PropTypes.shape({
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
