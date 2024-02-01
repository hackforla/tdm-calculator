import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
// import svg from "../../images/Angeleno_white_background-SVG.svg";

const LoginButton = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [oktaUserInfo, setOktaUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setOktaUserInfo(null);
    } else {
      oktaAuth.getUser().then(info => {
        setOktaUserInfo(info);
        // const token = oktaAuth.getAccessToken();
        // accountService.getAuthorization({
        //   email: info.email,
        //   firstName: info.givenName,
        //   lastName: info.FamilyName,
        //   oktaAccessToken: token
        // });
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const handleLogin = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const handleLogout = async () => {
    await oktaAuth.signOut();
  };

  if (!oktaUserInfo)
    return (
      <button
        onClick={handleLogin}
        style={{
          color: "green",
          backgroundColor: "white",
          fontSize: "1.5em",
          padding: "0.25em",
          borderRadius: ".25em"
        }}
      >
        LA Sign in with Angeleno
      </button>
    );
  return (
    <div>
      <button
        onClick={handleLogout}
        style={{
          color: "green",
          backgroundColor: "white",
          fontSize: "1.5em",
          padding: "0.25em",
          borderRadius: ".25em"
        }}
      >
        LA Sign out with Angeleno
      </button>
    </div>
  );
};

export default LoginButton;
