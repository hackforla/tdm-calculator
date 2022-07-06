import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  box: {
    backgroundColor: "#E7EBF0",
    padding: "0",
    maxWidth: "75%",
    margin: "1em auto"
  },
  boxHeader: {
    color: "white",
    backgroundColor: "#003069",
    padding: ".2em",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "Calibri"
  },
  boxContent: {
    margin: "0 0.1em",
    fontFamily: "Calibri",
    fontWeight: "700",
    fontSize: "12px",
    lineHeight: "17px",
    padding: "0.2em 0.2em 0.05em 0.2em"
  },
  caption: {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "22px",
    textAlign: "center"
  },
  table1: {
    width: "90%",
    margin: "0 1em 1em 1em",
    fontSize: "0.8em",
    padding: "0.1em 0em 0.5em 0.1em"
  },
  col1: {
    padding: "0.2em 0 0.2em 0.2em",
    fontSize: "15px",
    fontWeight: "700",
    lineHeight: "17px",
    textAlign: "right"
  },
  col2: {
    padding: "0.2em 0 0.2em 0.2em",
    fontSize: "15px",
    fontWeight: "700",
    lineHeight: "17px",
    textAlign: "left"
  },
  subtotal1: {
    padding: "0.5em 0 0.2em 0.2em",
    fontWeight: "700",
    fontSize: "18px"
  },
  subtotal2: {
    padding: "0.5em 0 0.2em 1em",
    fontWeight: "700",
    fontSize: "18px"
  },
  tooltipLabel: {
    flexGrow: "1",
    flexShrink: "1"
  },
  tooltip: {
    color: "rgb(30, 36, 63) !important",
    padding: "15px",
    minWidth: "200px",
    maxWidth: "400px",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: "bold",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    borderRadius: 2,
    "&.show": {
      visibility: "visible !important",
      opacity: "1 !important"
    }
  }
});

export const TooltipResidential = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <>
      <div className={classes.box}>
        <div className={classes.boxHeader}>
          <h4 style={{ textAlign: "center", margin: "0.2em 0.5em" }}>
            Selecting this package preselects the following strategies
          </h4>
        </div>
        <div className={classes.boxContent}>
          <table className={classes.table1}>
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td className={classes.col2}>Bike Parking</td>
                <td className={classes.col1}>+ 2 Points</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td className={classes.col2}>Encouragement Program</td>
                <td className={classes.col1}>+ 4 Points</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td className={classes.col2}>Unbundling Parking</td>
                <td className={classes.col1}>+ 8 Points</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p>
        Level 1 non-school projects that provide no more than 110% of the
        Citywide Parking Baseline may be eligible for this optional bonus
        package. Because the strategies in a Bonus Package work together to
        reinforce their effectiveness in reducing drive-alone trips, projects
        that select a Bonus Package are awarded{" "}
        <span style={{ fontWeight: "bold" }}>
          {" "}
          one additional bonus point, for a total of 15 earned points.
        </span>{" "}
        Bonus Packages may not be ideal for all projects but are a way to
        provide easy compliance and implementation for small projects.
      </p>
    </>
  );
};

export const TooltipSchool = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.box}>
        <div className={classes.boxHeader}>
          <h4 style={{ textAlign: "center", margin: "0.2em 0.5em" }}>
            Selecting this package preselects the following strategies
          </h4>
        </div>
        <div className={classes.boxContent}>
          <table className={classes.table1}>
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td className={classes.col2}>Bike Parking</td>
                <td className={classes.col1}>+ 2 Points</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td className={classes.col2}>Encouragement Program</td>
                <td className={classes.col1}>+ 6 Points</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td className={classes.col2}>HOV Program</td>
                <td className={classes.col1}>+ 2 Points</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td className={classes.col2}>School Safety Program</td>
                <td className={classes.col1}>+ 4 Points</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p>
        Level 1 school projects that provide no more than 110% of the Citywide
        Parking Baseline may be eligible for this optional bonus package.
        Because the strategies in a Bonus Package work together to reinforce
        their effectiveness in reducing drive-alone trips, projects that select
        a Bonus Package are awarded{" "}
        <span style={{ fontWeight: "bold" }}>
          {" "}
          one additional bonus point, for a total of 15 earned points.
        </span>{" "}
        Bonus Packages may not be ideal for all projects but are a way to
        provide easy compliance and implementation for small projects.
      </p>
    </>
  );
};
