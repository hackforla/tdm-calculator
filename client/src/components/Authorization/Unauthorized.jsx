import React from "react";
import ContentContainer from "../Layout/ContentContainer";

const Unauthorized = () => {
  return (
    <ContentContainer>
      <h1 style={{ marginTop: 0 }}>Attempt to Access Restricted Page</h1>
      <div style={{ marginTop: "2em", maxWidth: "40em" }}>
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
