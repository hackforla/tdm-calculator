import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    minHeight: "80px"
  },
  col: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    position: "relative"
  },
  leftCol: {
    backgroundColor: "#a7c539"
  },
  rightCol: {
    backgroundColor: "#002e6d"
  },
  arrow: {
    content: "",
    width: 0,
    height: 0,
    borderTop: "40px solid transparent",
    borderBottom: "40px solid transparent",
    borderLeft: "40px solid #a7c539",
    position: "absolute",
    left: 0
  },
  link: {
    color: "#ffffff",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "none"
    }
  }
});

const LandingPageSectionResidentialDev = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={clsx(classes.col, classes.leftCol)}>
        <h3>Residential Real Estate Developer?</h3>
      </div>
      <div className={clsx(classes.col, classes.rightCol)}>
        <div className={classes.arrow} />
        <h3>
          <Link to="#" className={classes.link}>
            How Mobility Plan 2035 affects you ❯
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default LandingPageSectionResidentialDev;
