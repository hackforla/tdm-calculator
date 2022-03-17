import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  title: {
    color: "#0F2940"
  },
  section: {
    paddingLeft: "30px",
    fontFamily: "Calibri Bold"
  },
  indent: {
    paddingLeft: "25px"
  },
  indentSpecial: {
    paddingLeft: "75.5px",
    fontFamily: "Calibri Bold"
  },
  bulletIndent: {
    paddingLeft: "100px",
    marginTop: "2px"
  },
  undoBold: {
    fontFamily: "Calibri"
  }
});

const ChecklistContent = () => {
  const classes = useStyles();
  return (
    <>
      <h1 className={classes.title}>Checklist</h1>
      <br />
      <p>
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
        <article className={classes.section}>
          p.4
          <span className={classes.indent}>
            Planned TDM strategies{" "}
            <span className={classes.undoBold}>(Optional)</span>
          </span>
        </article>
      </div>
    </>
  );
};

export default ChecklistContent;
