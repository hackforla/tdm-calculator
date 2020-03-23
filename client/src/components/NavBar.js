import React from "react";
import { createUseStyles } from "react-jss";
import { Link, withRouter } from "react-router-dom";
import NavBarLogin from "./NavBarLogin";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  navbar: {
    flexGrow: "1",
    flexShrink: "0",
    flexBasis: "content",
    padding: "0.1em 0.1em 0.1em 2em",
    display: "flex",
    // display: 'none',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    listStyleType: "none",
    "@media print": {
      display: "none"
    }
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    paddingRight: "2em",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  userLogin: {
    marginLeft: "auto"
  },
  lastItem: {
    marginLeft: "2em",
    paddingRight: 0,
    marginRight: "1em"
  }
});

const NavBar = props => {
  const { account, setLoggedOutAccount, location } = props;
  const classes = useStyles();

  const showNewProjectLink = () => {
    return location.pathname.split("/")[1] === "calculation" ? null : (
      <li>
        <Link className={classes.link} to="/calculation/1">
          New Project
        </Link>
      </li>
    );
  };

  return (
    <ul className={classes.navbar}>
      <li>
        <Link className={classes.link} to="/">
          Home
        </Link>
      </li>
      {account && account.id && (
        <li>
          <Link className={classes.link} to="/projects">
            Projects
          </Link>
        </li>
      )}

      {showNewProjectLink()}
      {/* {account && account.isAdmin && (
        <li>
          <Link className={classes.link} to="/admin">
            Admin
          </Link>
        </li>
      )} */}
      {account && account.isSecurityAdmin && (
        <li>
          <Link className={classes.link} to="/roles">
            Security
          </Link>
        </li>
      )}
      <li>
        <Link className={classes.link} to="/about">
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
  isCreatingNewProject: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default withRouter(NavBar);
