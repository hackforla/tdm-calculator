import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "544px",
    width: "100%",
    backgroundColor: "#002E6D",
    position: "relative",
    overflowX: "hidden",
    color: "white"
  },
  info: {
    position: "absolute",
    left: "0",
    marginLeft: "5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "45%",
    height: "70%",
    "& > h2": {
      fontSize: "60px",
      marginBottom: "15px"
    },
    "& > h4": {
      fontSize: "30px",
      fontWeight: "100",
      fontStyle: "normal",
      lineHeight: "40px",
      marginBottom: "42px"
    },
    "& > button": {
      backgroundColor: "#002E6D",
      color: "white",
      border: "2px solid white",
      borderRadius: "0",
      width: "300px",
      height: "60px"
    }
  },
  imageContainers: {
    position: "relative",
    overflow: "hidden",
    width: "40%",
    height: "100%",
    backgroundSize: "cover",
    clipPath: "polygon(50% 0%, 100% 0%, 50% 100%, 0% 100%)",
    maxWidth: "450px",
    margin: "0 -225px 0 0"
  },
  imageOne: {
    backgroundImage: "url(../assets/outdoor-construction-anthony-fomin.jpg)",
    backgroundPosition: "center right"
  },
  imageTwo: {
    backgroundColor: "white",
    backgroundImage: "url(../assets/indoor-construction-charles.jpg)",
    backgroundPosition: "bottom"
  },
  imageThree: {
    clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%)",
    margin: "0 -150px 0 0",
    backgroundColor: "blue",
    backgroundImage:
      "url(../assets/construction-hat-woman-claudio-hirschberger.jpg)",
    backgroundPosition: "right bottom"
  },
  cta: {
    fontSize: "25px"
  }
});

const LandingPageSectionWhyLATDM = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <h2>
          Why <strong>LA TDM?</strong>
        </h2>
        <h4>
          See how real estate developers have improved their compliance ratings
          and contributed to a more accessible Los Angeles.
        </h4>
        <button className={classes.cta}>Learn More</button>
      </div>
      <div className={clsx(classes.imageOne, classes.imageContainers)} />
      <div className={clsx(classes.imageTwo, classes.imageContainers)} />
      <div className={clsx(classes.imageThree, classes.imageContainers)} />
    </div>
  );
};

export default LandingPageSectionWhyLATDM;
