import React from "react";
import { Link } from "react-router-dom";
import { handleLogout } from "../services/account-service";

const NavBar = props => {
  const { account, setLoggedOutAccount } = props;
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
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contactus">Contact Us</Link>
      </li>
      {/* if there's an account in state, display logout and check if they are admin*/}
      {account.email ? (
        <>
          {account.role === "admin" ? (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          ) : null}
          <li onClick={setLoggedOutAccount}>
            <a href="">Logout</a>
          </li>
        </>
      ) : (
        <>
          {/* if no account in state, show login button*/}
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBar;
