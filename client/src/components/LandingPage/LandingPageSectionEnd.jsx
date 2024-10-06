import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  landingPageEnd: {
    paddingTop: "6em",
    paddingBottom: "6em",
    textAlign: "center",
    margin: "0 auto"
  },
  heading: {
    fontSize: 55,
    fontWeight: 800
  },
  paragraph: {
    fontSize: 28,
    fontWeight: 400
  },
  startButton: {
    display: "inline-block",
    background: "#a7c539",
    color: "#002e6d",
    lineHeight: 1,
    fontSize: "25px",
    fontWeight: "bold",
    padding: "20px 55px 20px 55px",
    border: 0,
    textAlign: "center",
    marginTop: "40px",
    "-webkit-border-radius": "5px",
    "-ms-border-radius": "5px",
    "-moz-border-radius": "5px",
    "-o-border-radius": "5px",
    borderRadius: "5px"
  }
});

const LandingPageSectionEnd = () => {
  const classes = useStyles();

  return (
    <div className={classes.landingPageEnd}>
      <h2 className={classes.heading}>Preparing for a new project?</h2>
      <p className={classes.paragraph}>Let us help you get started right.</p>
      <Link to="/calculation/1/0" className={classes.startButton}>
        Get Started
      </Link>
    </div>
  );
};

export default LandingPageSectionEnd;
