import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import NavBarLogin from "./NavBarLogin";

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
  const { account, setLoggedOutAccount, isCreatingNewProject } = props;
  const classes = useStyles();

  const showNewProjectLink = () => {
    return isCreatingNewProject ? null : (
      <li>
        <Link className={classes.link} to="/calculation?pageNo=1&view=w">
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
      <li>
        <Link className={classes.link} to="/projects">
          Projects
        </Link>
      </li>
      {showNewProjectLink()}
      {account.role === "admin" && (
        <li>
          <Link className={classes.link} to="/admin">
            Admin
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

export default NavBar;
