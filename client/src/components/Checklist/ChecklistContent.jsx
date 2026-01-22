import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { MdLaunch } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  container: {
    padding: "0 2.5rem 1rem 2.5rem ",
    maxWidth: "30rem",
    marginTop: "0px"
  },
  heading1: theme.typography.heading1,
  mainBullet: {
    ...theme.typography.paragraph1,
    fontWeight: "700",
    marginTop: "1rem",
    marginLeft: "2rem",
    textAlign: "left",
    lineHeight: "1.5rem",
    color: theme.colors.secondary.darkNavy
  },
  bulletIndent: {
    paddingLeft: "100px",
    marginTop: "2px"
  },
  indentSpecial: {
    ...theme.typography.paragraph1,
    fontWeight: "700",
    marginTop: "1rem",
    marginLeft: "5.2rem",
    textAlign: "left",
    lineHeight: "1.5rem"
  }
}));

const ChecklistContent = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.container}>
      <h1 className={classes.heading1}>Checklist</h1>
      <p className={theme.typography.subHeading}>
        Listed below are the documents that you may need when using{" "}
        <a href="/calculation">Create Project.</a>
      </p>
      <div>
        <article className={classes.mainBullet}>
          p.1
          <span className={classes.mainBullet}>
            General project information
          </span>
        </article>
        <ul className={classes.bulletIndent}>
          <li>Name</li>
          <li>Address</li>
          <li>AIN/APN</li>
        </ul>
      </div>
      <div>
        <article className={classes.mainBullet}>
          p.2
          <span className={classes.mainBullet}>
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
        <article className={classes.mainBullet}>
          p.3
          <span className={classes.mainBullet}>
            Planned number of parking spaces provided
          </span>
        </article>
      </div>
      <div>
        <article className={classes.mainBullet}>
          p.4
          <span className={classes.mainBullet}>
            Planned TDM strategies{" "}
            <span className={classes.undoBold}>(Optional)</span>
          </span>
        </article>
      </div>
      <div
        className={theme.typography.paragraph1}
        style={{ marginTop: "1rem" }}
      >
        If your project&apos;s land use is not listed above, please check LAMC
        Section 12.26 J.3(c) of the{" "}
        <a
          href="https://planning.lacity.org/odocument/bb9114b3-29e3-423f-8b91-027afb242e63/Revised_DRAFT_TDMOrdinance_June2022.pdf"
          target="external"
        >
          {" "}
          Draft Revised TDM Ordinance{" "}
          <MdLaunch className={classes.externalLinkIcon} />
        </a>{" "}
        for applicability and exemption details.
      </div>
    </div>
  );
};

export default ChecklistContent;
