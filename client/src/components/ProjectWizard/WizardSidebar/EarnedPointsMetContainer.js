import React from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  pointsNotification: {
    border: "2px solid transparent",
    backgroundColor: ({ theme }) => theme.colorPrimary,
    color: ({ theme }) => theme.colorText,
    boxShadow: "0px 0px 5px rgba(0, 0, 0, .2)",
    marginTop: "16px",
    maxWidth: "250px",
    display: "flex",
    justifyContent: "center",
    zIndex: "1",
    padding: "16px 24px",
    lineHeight: "1.4",
    margin: "auto"
  }
});

const EarnedPointsMetContainer = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.pointsNotification}>Success! Target achieved!</div>
  );
};

export default EarnedPointsMetContainer;
