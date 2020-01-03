import React from "react";
import logo from "../images/ladot.png";

const Header = props => {
  return (
    <div
      style={{
        flexGrow: "0",
        flexShrink: "0",
        flexBasis: "content",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "1em",
        paddingRight: "1em"
      }}
    >
      <h1>TDM Calculator</h1>
      {props.account && props.account.firstName ? (
        <h4>{`${props.account.firstName} ${props.account.lastName} `}</h4>
      ) : null}
      <div>
        <a href="//ladot.lacity.org" target="_blank" rel="noopener noreferrer">
          <img
            style={{ height: "3em" }}
            src={logo}
            alt="LA Department of Transportation Logo"
          />
        </a>
      </div>
    </div>
  );
};

export default Header;
