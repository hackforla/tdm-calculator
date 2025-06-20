import React from "react";
import ContentContainer from "../Layout/ContentContainer";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
  heading1: theme.typography.heading1,
  paragraph: {
    marginTop: "2em",
    maxWidth: "40em"
  }
}));

const Unauthorized = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <ContentContainer>
      <h1 className={classes.heading1}>Attempt to Access Restricted Page</h1>
      <div className={classes.paragraph}>
        <p>
          The feature you are attempting to access is not allowed for this login
          account. Most likely, you pasted a link in the address bar to a page
          that requires you to be logged in to an account with elevated
          privileges. Or someone may have accessed the restricted page and has
          since logged out, but you used the Browser&apos;s &quot;Back&quot;
          button to attempt to go back to the restricted page.
        </p>
        <p>
          Please log in with an account that has the requisite permissions, or
          use the menu to select another page.
        </p>
      </div>
    </ContentContainer>
  );
};

export default Unauthorized;
