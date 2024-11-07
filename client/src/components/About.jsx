import React from "react";
import { createUseStyles } from "react-jss";
import packageInfo from "../../package.json";
import ContentContainer from "./Layout/ContentContainer";
import { MdLaunch } from "react-icons/md";

const useStyles = createUseStyles({
  aboutContent: {
    maxWidth: "1000px"
  },
  linklist: {
    marginBottom: "0.8em"
  },
  externalLinkIcon: {
    fontSize: "14px",
    padding: " 0 0.4em",
    color: "#00F"
  }
});

const About = () => {
  const classes = useStyles();

  return (
    <ContentContainer>
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
          Learn more about{" "}
          <a href="http://www.hackforla.org" target="external">
            Hack for LA <MdLaunch className={classes.externalLinkIcon} />
          </a>
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
            <a
              href="https://planning.lacity.org/odocument/c3c9b320-4431-49ff-99d2-15b479c06074/Revised_DRAFT_TDMProgramGuidelines_June2022.pdf/#page=48"
              target="external"
            >
              Glossary
              <MdLaunch className={classes.externalLinkIcon} />
            </a>
          </li>
          <li className={classes.linklist}>
            <a
              href="https://planning.lacity.org/plans-policies/initiatives-policies/mobility"
              target="external"
            >
              Los Angeles City Planning, Mobility
              <MdLaunch className={classes.externalLinkIcon} />
            </a>
          </li>
          <li className={classes.linklist}>
            <a
              href="https://planning.lacity.org/odocument/c3c9b320-4431-49ff-99d2-15b479c06074/Revised_DRAFT_TDMProgramGuidelines_June2022.pdf"
              target="external"
            >
              Proposed Ordinances and Initiatives
              <MdLaunch className={classes.externalLinkIcon} />
            </a>
          </li>
          <li className={classes.linklist}>
            <a
              href="https://www.youtube.com/watch?v=mAxseCqySuM"
              target="external"
            >
              Informational Video (January 2021)
              <MdLaunch className={classes.externalLinkIcon} />
            </a>
          </li>
          <li className={classes.linklist}>
            <a
              href="https://planning.lacity.org/odocument/d7e3780b-3155-44a4-98cf-0fd673a6612b/TDM-FactSheet_English.pdf"
              target="external"
            >
              Fact Sheet - English (January 2021)
              <MdLaunch className={classes.externalLinkIcon} />
            </a>
          </li>
          <li className={classes.linklist}>
            <a
              href="https://planning.lacity.org/odocument/9dae2614-5b29-4dce-8b8d-9060f6900386/TDM-FactSheet_Spanish.pdf"
              target="external"
            >
              Hoja Informativa - Español (Enero 2021)
              <MdLaunch className={classes.externalLinkIcon} />
            </a>
          </li>
        </ul>
      </div>

      <p>{`Release #: ${packageInfo.version}`}</p>
    </ContentContainer>
  );
};

export default About;
