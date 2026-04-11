import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import ContentContainer from "./Layout/ContentContainer";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
  heading1: theme.typography.heading1
}));

const RouteErrorBoundary = () => {
  const error = useRouteError();
  const theme = useTheme();
  const classes = useStyles(theme);

  let message;
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "An unexpected error occurred.";
  }

  return (
    <ContentContainer>
      <h1 className={classes.heading1}>Something went wrong</h1>
      <p>{message}</p>
    </ContentContainer>
  );
};

export default RouteErrorBoundary;
