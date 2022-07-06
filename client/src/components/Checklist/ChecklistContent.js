import React from "react";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  title: {
    color: "#0F2940",
    fontFamily: "Calibri Bold",
    fontSize: "24px",
    margin: "2px"
  },
  text: {
    color: "#0F2940",
    fontSize: "18px"
  },
  section: {
    paddingLeft: "30px",
    fontFamily: "calibri bold",
    fontSize: "16px"
  },
  sectionLast: {
    paddingLeft: "30px",
    fontFamily: "calibri bold",
    fontSize: "16px",
    marginBottom: "5px"
  },
  indent: {
    paddingLeft: "25px",
    fontFamily: "calibri bold",
    fontSize: "16px"
  },
  indentSpecial: {
    paddingLeft: "68px",
    fontFamily: "calibri bold",
    fontSize: "16px"
  },
  bulletIndent: {
    paddingLeft: "100px",
    marginTop: "2px",
    fontFamily: "Calibri",
    fontSize: "16px"
  },
  undoBold: {
    fontFamily: "Calibri",
    fontWeight: "normal"
  }
});

const ChecklistContent = () => {
  const classes = useStyles();
  return (
    <>
      <h3 className={classes.title}>Checklist</h3>
      <br />
      <p className={classes.text}>
        Listed below are the documents that you may need when using Create
        Project.
      </p>
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
          <li>Residentian (Dwelling Units)</li>
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
          href="https://planning.lacity.org/odocument/1dc924ce-b94a-403b-afe0-17ba33b3dbe1/Draft_TDM_Ordinance.pdf"
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
    </>
  );
};

export default ChecklistContent;
