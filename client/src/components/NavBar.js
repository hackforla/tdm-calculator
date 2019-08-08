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
      <li>
        <Link to="/calculation">Calculation</Link>
      </li>
      <li>
        {" "}
        <Link to="/about">About</Link>
      </li>
      <li>
        {" "}
        <Link to="/contactus">Contact Us</Link>
      </li>
      <li>
        {" "}
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        {" "}
        <Link to="/login">Login</Link>
      </li>
      <li>
        {" "}
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  );
};

export default NavBar;
