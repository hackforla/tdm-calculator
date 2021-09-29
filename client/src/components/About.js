import React from "react";
import { createUseStyles } from "react-jss";
import { version } from "../../package.json";
import ContentContainer from "./Layout/ContentContainer";

const useStyles = createUseStyles({
  aboutContent: {
    maxWidth: "1000px"
  },
  linklist: {
    marginBottom: "0.8em"
  }
});

const About = () => {
  const classes = useStyles();

  return (
    <ContentContainer componentToTrack="AboutPage">
      <h1>About the TDM Calculator</h1>
      <div className={classes.aboutContent}>
        <h3>What does TDM mean?</h3>
        <p>
          Transportation Demand Management (TDM) refers to the strategies a city
          uses to influence travel behavior and accommodate growing demands on
          its transportation system.
        </p>
        <h3>TDM Program Update</h3>
        <p>
          Los Angeles Department of Transportation (LADOT) and Los Angeles City
          Planning (LACP) are working together to update the City’s TDM
          ordinance to provide Angelenos with a variety of sustainable
          transportation options, increase accessibility throughout the City,
          and reduce single-occupancy vehicle trips, which benefits the
          environment, public health, and can ease congestion.
        </p>
        <h3>What is the TDM Calculator?</h3>
        <p>
          The TDM Calculator is a tool developed to help simplify the
          development and implementation of the proposed updates to the City’s
          TDM regulations. The TDM Calculator helps communicate the compliance
          requirements of the proposed TDM Program to multiple stakeholders
          including developers of real estate projects, residents, and
          transportation planning practitioners. This project will ultimately
          help Los Angeles meet the sustainable transportation goals of the
          City’s Mobility Plan 2035 and the Mayor’s Green New Deal.
        </p>
        <p>
          The TDM Calculator was created by Hack For LA in collaboration with
          the Los Angeles Department of Transportation (LADOT) and the Los
          Angeles Department of City Planning (LACP). Hack for LA is a local
          non-profit organization making an impact in Los Angeles through
          building digital products, programs and services using Lean-Agile
          methodology and user centered design.
        </p>
        <p>
          Learn more about <a href="http://www.hackforla.org">Hack for LA</a>
        </p>
        <h3>Status of the TDM Calculator</h3>

        <p>
          The TDM Calculator is in a beta phase and is still undergoing testing
          and development. A public use version of the TDM Calculator will be
          developed after the updated TDM ordinance is approved by the City
          Council and Mayor.{" "}
        </p>
        <h3>Additional Resources</h3>

        <ul>
          <li className={classes.linklist}>
            <a href="https://planning.lacity.org/plans-policies/initiatives-policies/mobility">
              Los Angeles City Planning, Mobility
            </a>
          </li>
          <li className={classes.linklist}>
            <a href="https://planning.lacity.org/odocument/9fae920f-d618-4362-bd01-adb6abfbd80d/Draft_TDM_Program_Guidelines.pdf">
              Proposed Ordinances and Initiatives
            </a>
          </li>
          <li className={classes.linklist}>
            <a href="https://www.youtube.com/watch?v=mAxseCqySuM">
              Informational Video (January 2021)
            </a>
          </li>
          <li className={classes.linklist}>
            <a href="https://planning.lacity.org/odocument/d7e3780b-3155-44a4-98cf-0fd673a6612b/TDM-FactSheet_English.pdf">
              Fact Sheet - English (January 2021)
            </a>
          </li>
          <li className={classes.linklist}>
            <a href="https://planning.lacity.org/odocument/9dae2614-5b29-4dce-8b8d-9060f6900386/TDM-FactSheet_Spanish.pdf">
              Hoja Informativa - Español (Enero 2021)
            </a>
          </li>
        </ul>
      </div>

      <p>{`Release #: ${version}`}</p>
    </ContentContainer>
  );
};

export default About;
