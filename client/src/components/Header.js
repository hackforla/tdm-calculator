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
        <img src={logo} />
      </div>
    </div>
  );
};

export default Header;
