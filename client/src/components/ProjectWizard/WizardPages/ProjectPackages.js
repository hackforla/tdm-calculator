import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Tooltip from "../SidebarPoints/ToolTip";

const useStyles = createUseStyles({
  box: {
    backgroundColor: "#E7EBF0",
    padding: "0",
    maxWidth: "30%",
    margin: "1em"
  },
  boxHeader: {
    color: "white",
    backgroundColor: "#003069",
    padding: "1em",
    minHeight: "3em",
    fontFamily: "Open Sans",
    fontSize: "20px",
    fontWeight: "700"
  },
  boxContent: {
    margin: "1em",
    fontFamily: "Calibri",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "17px"
  },
  caption: {
    textAlign: "center"
  },
  table1: {
    width: "90%",
    margin: "1em",
    fontSize: "0.8em"
  },
  col1: {
    padding: "0.2em 0 0.2em 0.2em",
    fontSize: "15px",
    fontWeight: "700",
    lineHeight: "17px"
  },
  col2: {
    padding: "0.2em 0 0.2em 1em",
    fontSize: "15px",
    fontWeight: "700",
    lineHeight: "17px"
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
  }
});

function ProjectPackages(props) {
  const { allowResidentialPackage, allowEmploymentPackage } = props;
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div>
      {allowResidentialPackage && allowEmploymentPackage ? (
        <>
          <h1 className="tdm-wizard-page-title">
            You qualify for bonus packages!
          </h1>
          <h3 className="tdm-wizard-page-subtitle">
            All LEVEL 1 projects qualify for at least one optional bonus
            package. Based on your land uses you qualify for both pacakges. Here
            is a breakdown of each package, and point totals when both are
            selected.
          </h3>
        </>
      ) : (
        <>
          <h1 className="tdm-wizard-page-title">
            You qualify for a bonus package!
          </h1>
          <h3 className="tdm-wizard-page-subtitle">
            All LEVEL 1 projects qualify for at least one optional bonus
            package. Based on your land use you qualify for the package below.
          </h3>
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%"
        }}
      >
        {allowResidentialPackage ? (
          <div className={classes.box}>
            <div className={classes.boxHeader}>
              <h4 style={{ textAlign: "center" }}>Residential Package</h4>
            </div>
            <div className={classes.boxContent}>
              <div className={classes.caption}>This Package includes:</div>
              <table className={classes.table1}>
                <tr>
                  <td className={classes.col1}>+2</td>
                  <td className={classes.col2}>Points for Bike Parking</td>
                </tr>
                <tr>
                  <td className={classes.col1}>+4</td>
                  <td className={classes.col2}>
                    Points for Encouragement Program
                  </td>
                </tr>
                <tr>
                  <td className={classes.col1}></td>
                  <td className={classes.col2}>
                    (Education, Marketing & Outreach)
                  </td>
                </tr>
                <tr>
                  <td className={classes.col1}>+8</td>
                  <td className={classes.col2}>
                    Points for Unbundling Parking
                  </td>
                </tr>
                <tr>
                  <td className={classes.col1}>+1</td>
                  <td className={classes.col2}>Bonus Point</td>
                </tr>
                <tr
                  style={{ borderTop: "2px solid #002E6D", marginTop: "0.5em" }}
                >
                  <td className={classes.subtotal1}>15</td>
                  <td className={classes.subtotal2}>Points</td>
                </tr>
              </table>
            </div>
          </div>
        ) : null}
        {allowEmploymentPackage ? (
          <div className={classes.box}>
            <div className={classes.boxHeader}>
              <h4 style={{ textAlign: "center" }}>Employment Package</h4>
            </div>
            <div className={classes.boxContent}>
              <div className={classes.caption}>This Package includes:</div>
              <table className={classes.table1}>
                <tr>
                  <td className={classes.col1}>+2</td>
                  <td className={classes.col2}>Points for Bike Parking</td>
                </tr>
                <tr>
                  <td className={classes.col1}>+4</td>
                  <td className={classes.col2}>
                    Points for Encouragement Program
                  </td>
                </tr>
                <tr>
                  <td className={classes.col1}></td>
                  <td className={classes.col2}>
                    (Education, Marketing & Outreach)
                  </td>
                </tr>
                <tr>
                  <td className={classes.col1}>+8</td>
                  <td className={classes.col2}>Points for Parking Cashout</td>
                </tr>
                <tr>
                  <td className={classes.col1}>+1</td>
                  <td className={classes.col2}>Bonus Point</td>
                </tr>
                <tr
                  style={{ borderTop: "2px solid #002E6D", marginTop: "0.5em" }}
                >
                  <td className={classes.subtotal1}>15</td>
                  <td className={classes.subtotal2}>Points</td>
                </tr>
              </table>
            </div>
          </div>
        ) : null}
        {allowEmploymentPackage ? (
          <div className={classes.box}>
            <div className={classes.boxHeader}>
              <h4 style={{ textAlign: "center" }}>
                Employment & Residential Packages
              </h4>
            </div>
            <div className={classes.boxContent}>
              <div className={classes.caption}>These Packages include:</div>
              <table className={classes.table1}>
                <tr>
                  <td className={classes.col1}>+2</td>
                  <td className={classes.col2}>Points for Bike Parking</td>
                </tr>
                <tr>
                  <td className={classes.col1}>+4</td>
                  <td className={classes.col2}>
                    Points for Encouragement Program
                  </td>
                </tr>
                <tr>
                  <td className={classes.col1}></td>
                  <td className={classes.col2}>
                    (Education, Marketing & Outreach)
                  </td>
                </tr>
                <tr>
                  <td className={classes.col1}>+8</td>
                  <td className={classes.col2}>
                    Points for Unbundling Parking
                  </td>
                </tr>
                <tr>
                  <td className={classes.col1}>+8</td>
                  <td className={classes.col2}>Points for Parking Cashout</td>
                </tr>
                <tr>
                  <td className={classes.col1}>+1</td>
                  <td className={classes.col2}>Bonus Point</td>
                </tr>
                <tr
                  style={{ borderTop: "2px solid #002E6D", marginTop: "0.5em" }}
                >
                  <td
                    className={classes.subtotal1}
                    styles={{ paddingTop: "1em", fontWeight: "bolder" }}
                  >
                    24
                  </td>
                  <td className={classes.subtotal2}>Points</td>
                </tr>
              </table>
            </div>
          </div>
        ) : null}
      </div>
      {allowResidentialPackage && allowEmploymentPackage ? (
        <>
          <h3 className="tdm-wizard-page-subtitle">
            You will be able to select these packages on the next page.
          </h3>
        </>
      ) : (
        <>
          <h3 className="tdm-wizard-page-subtitle">
            You will be able to select this package on the next page.
          </h3>
        </>
      )}
      <h3 className="tdm-wizard-page-subtitle">
        Learn more about packages
        <span className={classes.projectLevelContainer}>
          <Tooltip
            tipText={`There are many TDM strategies choices and most involve making long-term commitments in meeting program compliance. 
Small development projects (defined as Program Level 1 that provide no more than the parking baseline), are provided TDM packages that allow fulfillment of the minimum 15 point target from a pre-selected menu. 
A point incentive is provided for the packages made up of strategies that work together to reinforce their effectiveness in reducing drive-alone trips. 
Each strategy selected on its own does not result in the required minimum point target but several selected together will. Each package can be unselected and individual strategies that will work best to both achieve the TDM program goals and your specific development objectives should be chosen. 
`}
          />
        </span>
      </h3>
    </div>
  );
}
ProjectPackages.propTypes = {
  projectLevel: PropTypes.number.isRequired,
  rules: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  allowResidentialPackage: PropTypes.bool.isRequired,
  allowEmploymentPackage: PropTypes.bool.isRequired
};

export default ProjectPackages;
