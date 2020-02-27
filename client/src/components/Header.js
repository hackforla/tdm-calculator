import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { createBrowserHistory } from "history";
import NavBar from "./NavBar";
import logo from "../images/ladot_white.png";

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
    }
  },
  logo: {
    height: "2em",
    padding: 10
  }
});

const history = createBrowserHistory();

const Header = props => {
  const { account, setAccount, isCreatingNewProject } = props;
  const classes = useStyles();

  // TODO: url path changes to /login, but page doesn't actually redirect you to login page
  const setLoggedOutAccount = () => {
    localStorage.clear();
    setAccount({});
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <div>
        <a href="//ladot.lacity.org" target="_blank" rel="noopener noreferrer">
          <img
            className={classes.logo}
            src={logo}
            alt="LA Department of Transportation Logo"
          />
        </a>
      </div>
      <NavBar
        account={account}
        setLoggedOutAccount={setLoggedOutAccount}
        isCreatingNewProject={isCreatingNewProject}
      />
      {account && account.firstName ? (
        <h4>Hello, {`${account.firstName} ${account.lastName} `}</h4>
      ) : null}
    </div>
  );
};
Header.propTypes = {
  account: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }),
  setAccount: PropTypes.func.isRequired,
  isCreatingNewProject: PropTypes.bool.isRequired
};

export default Header;
