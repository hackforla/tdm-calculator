import React from "react";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  container: {
    maxWidth: "30rem"
  },
  title: {
    margin: "2px"
  },
  text: {
    color: "#0F2940",
    fontSize: "18px"
  },
  section: {
    paddingLeft: "30px",
    fontSize: "16px"
  },
  sectionLast: {
    paddingLeft: "30px",
    fontSize: "16px",
    marginBottom: "5px"
  },
  indent: {
    paddingLeft: "25px",
    fontSize: "16px"
  },
  indentSpecial: {
    paddingLeft: "68px",
    fontSize: "16px"
  },
  bulletIndent: {
    paddingLeft: "100px",
    marginTop: "2px",
    fontSize: "16px"
  },
  undoBold: {
    fontWeight: "normal"
  }
});

const ChecklistContent = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Checklist</h1>
      <br />
      <p className={classes.text}>
        Listed below are the documents that you may need when using{" "}
        <a href="/calculation">Create Project.</a>
      </p>
      <br />
      <div>
        <article className={classes.section}>
          p.1
          <span className={classes.indent}>General project information</span>
        </article>
        <ul className={classes.bulletIndent}>
          <li>Name</li>
          <li>Address</li>
          <li>AIN/APN</li>
        </ul>
      </div>
      <div>
        <article className={classes.section}>
          p.2
          <span className={classes.indent}>
            Planned floor area (sqft) for specific use types
          </span>
        </article>
        <ul className={classes.bulletIndent}>
          <li>Retail</li>
          <li>Employment/Office</li>
          <li>Warehouse/Industrial</li>
          <li>Medical</li>
        </ul>
        <span className={classes.indentSpecial}>
          Planned unit types/sizes for specific use types
        </span>
        <ul className={classes.bulletIndent}>
          <li>Residential (Dwelling Units)</li>
          <li>Hotel/Motel (Rooms)</li>
          <li>School (Students)</li>
          <li>Arena/Stadium/Theatre (Seats)</li>
        </ul>
      </div>
      <div>
        <article className={classes.section}>
          p.3
          <span className={classes.indent}>
            Planned number of parking spaces provided
          </span>
        </article>
      </div>
      <br />
      <div>
        <article className={classes.sectionLast}>
          p.4
          <span className={classes.indent}>
            Planned TDM strategies{" "}
            <span className={classes.undoBold}>(Optional)</span>
          </span>
        </article>
      </div>
      <br />
      <p className={classes.text}>
        If your project&apos;s land use is not listed above, please check LAMC
        Section 12.26 J.3(c) of the{" "}
        <a
          href="https://planning.lacity.org/odocument/bb9114b3-29e3-423f-8b91-027afb242e63/Revised_DRAFT_TDMOrdinance_June2022.pdf"
          target="external"
        >
          {" "}
          Draft Revised TDM Ordinance{" "}
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className={classes.externalLinkIcon}
          />
        </a>{" "}
        for applicability and exemption details.
      </p>
    </div>
  );
};

export default ChecklistContent;
