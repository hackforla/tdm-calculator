import React from "react";
import { Link } from "react-router-dom";

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
        <Link to="/calculation">Calculation</Link>
      </li>
      <li style={{ padding: "0.5em" }}>
        {" "}
        <Link to="/about">About</Link>
      </li>
      <li style={{ padding: "0.5em" }}>
        {" "}
        <Link to="/contactus">Contact Us</Link>
      </li>
      <li style={{ padding: "0.5em" }}>
        {" "}
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  );
};

export default NavBar;
