import React from "react";
import { createUseStyles } from "react-jss";
import { version } from "../../package.json";
import ContentContainer from "./Layout/ContentContainer";

const useStyles = createUseStyles({
  aboutText: {
    maxWidth: "500px",
    minWidth: 300,
    padding: "0 2em"
  },
  "@media (max-width: 768px)": {
    aboutText: {
      padding: "0"
    }
  },
  link: {
    textDecoration: "underline",
    fontWeight: "bold"
  }
});

const About = () => {
  const classes = useStyles();

  return (
    <ContentContainer componentToTrack="AboutPage">
      <h1>About TDM Calculator</h1>
      <br />
      <div className={classes.aboutText}>
        <p>
          The Transportation Demand Management Calculator was created by Hack
          For L.A in conjunction with L.A. Department of Transportation and
          Department of Planning.
        </p>
        <p>
          Hack for LA is a non-profit organization making an impact in Los
          Angeles through building digital products, programs and services using
          agile methodology and user centered design.
        </p>
        <p>
          Working with the LADOT, Hack for LA’s business analysts, software
          developers and designers, built the TDM Calculator through short
          iterative sprints.
        </p>
        <p>
          This tool was developed to help simplify the development and
          implementation of new TDM regulations for multiple stakeholders
          including the LADOT, Department of Planning, and developers of large
          real estate projects. This project will ultimately help Los Angeles
          meet it’s Mobility Plan goals by 2035.
        </p>
        <p>
          To find more about Hack for LA and their work to improve Los Angeles
          please visit:{" "}
          <a className={classes.link} href="http://www.hackforla.org">
            www.hackforla.org
          </a>
        </p>
      </div>
      <p>{`Release #: ${version}`}</p>
    </ContentContainer>
  );
};

export default About;
