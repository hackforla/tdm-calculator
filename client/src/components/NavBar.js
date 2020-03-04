import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
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
      {account && account.role === "admin" && (
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

NavBar.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    calculationId: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    dataType: PropTypes.string.isRequired,
    value: PropTypes.any,
    units: PropTypes.string,
    functionBody: PropTypes.string,
    cssClass: PropTypes.string,
    panelDisplayOrder: PropTypes.number.isRequired,
    displayOrder: PropTypes.number.isRequired,
    calculationPanelId: PropTypes.number.isRequired,
    panelName: PropTypes.string
  }),
  onInputChange: PropTypes.func,
  account: PropTypes.shape({
    email: PropTypes.string,
    role: PropTypes.string
  }),
  setLoggedOutAccount: PropTypes.func,
  isCreatingNewProject: PropTypes.bool
};

export default NavBar;
