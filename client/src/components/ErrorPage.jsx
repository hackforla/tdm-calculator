import React from "react";
import ContentContainer from "./Layout/ContentContainer";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
  heading1: theme.typography.heading1
}));

const ErrorPage = () => {
  // const location = useLocation();
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <ContentContainer>
      <h1 className={classes.heading1}>Invalid Page</h1>
      <p>{`The path ${window.location.href} is not a valid page in this application.`}</p>
    </ContentContainer>
  );
};

export default ErrorPage;
