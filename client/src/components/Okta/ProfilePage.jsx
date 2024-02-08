import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

import { createUseStyles, useTheme } from "react-jss";

import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles(theme => ({
  content: {
    maxWidth: "1000px"
  },
  heading: {
    color: theme.colorPrimary
  }
}));

const ProfilePage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      setUserInfo(authState.idToken.claims);
      // get user information from `/userinfo` endpoint
      oktaAuth.getUser().then(info => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <ContentContainer>
      <h1>Ojta User Profile (ID Token Claims) </h1>
      <div className={classes.content}>
        <p>
          Below is the information from your ID token which was obtained during
          the &nbsp;
          <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">
            PKCE Flow
          </a>{" "}
          and is now stored in local storage.
        </p>
        <p>
          This route is protected with the <code>&lt;SecureRoute&gt;</code>{" "}
          component, which will ensure that this page cannot be accessed until
          you have authenticated.
        </p>
        <h2>Auth</h2>
        <pre>{JSON.stringify(authState, null, 2)}</pre>
        <h2>Claims</h2>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userInfo).map(claimEntry => {
              const claimName = claimEntry[0];
              const claimValue = claimEntry[1];
              const claimId = `claim-${claimName}`;
              return (
                <tr key={claimName}>
                  <td>{claimName}</td>
                  <td id={claimId}>{claimValue.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ContentContainer>
  );
};

export default ProfilePage;
