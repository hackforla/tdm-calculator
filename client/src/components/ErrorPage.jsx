import React from "react";
import ContentContainer from "./Layout/ContentContainer";

const ErrorPage = () => {
  // const location = useLocation();
  return (
    <ContentContainer>
      <h1 style={{ marginTop: 0 }}>Invalid Page</h1>
      <p>{`The path ${window.location.href} is not a valid page in this application.`}</p>
    </ContentContainer>
  );
};

export default ErrorPage;
