import React from "react";
import logo from "../images/ladot.png";

const Header = () => {
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
      <div>
        <a href="//ladot.lacity.org" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="LA Department of Transportation Logo" />
        </a>
      </div>
    </div>
  );
};

export default Header;
