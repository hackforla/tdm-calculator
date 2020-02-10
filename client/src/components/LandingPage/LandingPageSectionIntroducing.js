import React from "react";
import { createUseStyles } from "react-jss";
import planning from "../../images/planning.svg";
import checklist from "../../images/checklist.svg";
import computer from "../../images/computer.svg";
import handshake from "../../images/handshake.svg";
import construction from "../../images/construction.svg";

const useStyles = createUseStyles({
  root: {
    paddingTop: "6em",
    paddingBottom: "6em"
  },
  introText: {
    textAlign: "center",
    margin: "0 auto",
    width: "45%",
    paddingTop: "1em",
    paddingBottom: "1em"
  },
  title: {
    fontSize: "42px",
    fontWeight: "normal"
  },
  titleStrong: {
    fontSize: "82px",
    fontWeight: "bold",
    lineHeight: "110px"
  },
  paragraph: {
    fontSize: "22px"
  },
  iconContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  icon: {
    margin: "1em 3em"
  }
});

const LandingPageSectionIntroducing = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.introText}>
        <h2 className={classes.title}>
          Introducing
          <br />
          <span className={classes.titleStrong}>LA TDM</span>
        </h2>
        <p className={classes.paragraph}>
          Lorem ipsum dolor sit <strong>amet</strong>, consectetur adipiscing{" "}
          <strong>elit</strong>, sed do <strong>eiusmod</strong> tempor
          incididunt ut <strong>labore</strong> et dolore magna aliqua. Tellus
          id <strong>interdum</strong> velit laoreet id.
        </p>
      </div>
      <div className={classes.iconContainer}>
        <div className={classes.icon}>
          <img src={planning} alt="planning-icon" />
        </div>
        <div className={classes.icon}>
          <img src={checklist} alt="checklist-icon" />
        </div>
        <div className={classes.icon}>
          <img src={computer} alt="computer-icon" />
        </div>
        <div className={classes.icon}>
          <img src={handshake} alt="handshake-icon" />
        </div>
        <div className={classes.icon}>
          <img src={construction} alt="construction-icon" />
        </div>
      </div>
    </div>
  );
};

export default LandingPageSectionIntroducing;
