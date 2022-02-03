import React from "react";
import ContentContainer from "../Layout/ContentContainer";

const Unauthorized = () => {
  return (
    <ContentContainer componentToTrack="Unauthrorized">
      <h1>Attempt to Access Forbidden Page</h1>
      <p>
        The feature you are attempting to access is not allowed for this login.
      </p>
      <p>
        Please log in with an account that has the requisite permissions, or use
        the menu to select another page.
      </p>
    </ContentContainer>
  );
};

export default Unauthorized;
