import React from "react";

const NavBar = props => {
  return (
    <ul
      className="navbar"
      style={{
        padding: "0.1em",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        listStyleType: "none"
      }}
    >
      <li style={{ padding: "0.5em" }}>
        <a href="/calculation">Calculation</a>
      </li>
      <li style={{ padding: "0.5em" }}>
        {" "}
        <a href="/about">About</a>
      </li>
      <li style={{ padding: "0.5em" }}>
        {" "}
        <a href="/contactus">Contact Us</a>
      </li>
      <li style={{ padding: "0.5em" }}>
        {" "}
        <a href="/admin">Admin</a>
      </li>
    </ul>
  );
};

export default NavBar;
