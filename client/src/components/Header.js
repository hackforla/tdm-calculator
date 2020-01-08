import React from "react";
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
    background: "#002E6D"
  }
});

const history = createBrowserHistory();

const Header = props => {
  const { account, setAccount } = props;
  const classes = useStyles();

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
            style={{ height: "2em", padding: 10 }}
            src={logo}
            alt="LA Department of Transportation Logo"
          />
        </a>
      </div>
      <NavBar
        account={account}
        setLoggedOutAccount={setLoggedOutAccount}
      />
      {/* <h1>TDM Calculator</h1> */}
      {props.account && props.account.firstName ? (
        <h4>{`${props.account.firstName} ${props.account.lastName} `}</h4>
      ) : null}
    </div>
  );
};

export default Header;
