import React from "react";
import { Link } from "react-router-dom";

const LoginLink = ({classes}) => (
  <li className={classes.userLogin}>
    <Link className={classes.link} to="/login">
      Login
    </Link>
  </li>
);
const UserGreeting = ({classes, account}) => (
  <li className={classes.userLogin}>
    <h4 >Hello, {`${account.firstName} ${account.lastName} `}</h4>
  </li>
)
const LogoutLink = ({classes, handleClick}) => (
  <li >
    <Link className={classes.link} onClick={handleClick}>
      Logout
    </Link>
  </li>
)

const NavBarLogin = props => {
  const {account, classes, setLoggedOutAccount} = props;

  if(!account || !account.email) {
    return (
      <LoginLink classes={classes} />
    )
  } else {
    return (  
      <>
        {(account.firstName) &&  <UserGreeting classes={classes} account={account} />}
        {(account.email) && <LogoutLink classes={classes} handleClick={setLoggedOutAccount}/>}
      </>
    )
  }                                                                                                                                                 
};

export default NavBarLogin;