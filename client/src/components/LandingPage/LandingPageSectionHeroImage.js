import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import HeroImage from "../../images/hero-image-shea-rouda-tk4qYI9Mm5A-unsplash.png";

const useStyles = createUseStyles({
  hero: {
    position: "relative"
  },
  heroImage: {
    width: "100%"
  },
  heroText: {
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    paddingLeft: 100
  },
  h1: {
    fontSize: 90,
    fontFamily: "Montserrat",
    fontWeight: 900
  },
  h2: {
    fontSize: 60
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

const LandingPageSectionHeroImage = () => {
  const classes = useStyles();
  return (
    <div className={classes.hero}>
      <img src={HeroImage} className={classes.heroImage} alt="" />
      <div className={classes.heroText}>
        <h1 className={classes.h1}>LA TDM</h1>
        <h2 className={classes.h2}>
          Better for your project.
          <br />
          Better for LA.
        </h2>
        <Link
          to={`/calculation?pageNo=1&view=w`}
          className={classes.startButton}
        >
          Start Your Project
        </Link>
      </div>
    </div>
  );
};

export default LandingPageSectionHeroImage;
