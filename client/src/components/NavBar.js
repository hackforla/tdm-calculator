import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  const { account, setLoggedOutAccount } = props;
  return (
    <ul
      className="navbar"
      style={{
        flexGrow: "0",
        flexShrink: "0",
        flexBasis: "content",
        padding: "0.1em",
        // display: "flex",
        display: 'none',
        flexDirection: "row",
        justifyContent: "space-between",
        listStyleType: "none"
      }}
    >
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/calculation">Calculation</Link>
      </li>
      {/* <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contactus">Contact Us</Link>
      </li> */}
      {/* if there's an account in state, display logout and check if they are admin*/}
      {account && account.email ? (
        <>
          {account.role === "admin" ? (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          ) : null}
          <li>
            <button className="link" onClick={setLoggedOutAccount}>
              Logout
            </button>
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
