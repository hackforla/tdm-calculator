import React from "react";
import logo from "../images/ladot.png";

const Header = props => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "1em",
        paddingRight: "1em"
      }}
    >
      <h1>TDM Calculator</h1>
      {props.account ? <h4>{props.account.email}</h4> : null}
      <div>
        <a href="//ladot.lacity.org" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="LA Department of Transportation Logo" />
        </a>
      </div>
    </div>
  );
};

export default Header;
