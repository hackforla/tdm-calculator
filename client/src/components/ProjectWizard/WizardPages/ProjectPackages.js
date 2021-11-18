import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
import ToolTip from "../../ToolTip/ToolTip";
import ToolTipLabel from "../../ToolTip/ToolTipLabel";

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
    fontSize: "20px",
    fontWeight: "700",
    fontFamily: "Calibri"
  },
  boxContent: {
    margin: "1em",
    fontFamily: "Calibri",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "17px"
  },
  caption: {
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "22px",
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
  },
  tooltipLabel: {
    flexGrow: "1",
    flexShrink: "1"
  },
  //TODO: refactor labels
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

function ProjectPackages(props) {
  const { allowResidentialPackage, allowSchoolPackage } = props;

  //TODO: use or remove theme. it's not actually getting used by the useStyles...
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div>
      {allowResidentialPackage && allowSchoolPackage ? (
        <>
          <h1 className="tdm-wizard-page-title">
            You qualify for bonus packages!
          </h1>
          <h3 className="tdm-wizard-page-subtitle">
            All LEVEL 1 projects qualify for at least one optional bonus
            package. Based on your land uses you qualify for both packages. Here
            is a breakdown of each package.
          </h3>
        </>
      ) : (
        <>
          <h1 className="tdm-wizard-page-title">
            You qualify for a bonus package!
          </h1>
          <h3 className="tdm-wizard-page-subtitle">
            All LEVEL 1 projects qualify for one optional bonus package. Based
            on your land use you qualify for the package below.
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
              <h4 style={{ textAlign: "center" }}>
                Residential or Employment Package
              </h4>
            </div>
            <div className={classes.boxContent}>
              <div className={classes.caption}>This Package includes:</div>
              <table className={classes.table1}>
                <tbody>
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
                    style={{
                      borderTop: "2px solid #002E6D",
                      marginTop: "0.5em"
                    }}
                  >
                    <td className={classes.subtotal1}>15</td>
                    <td className={classes.subtotal2}>Points</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {allowSchoolPackage ? (
          <div className={classes.box}>
            <div className={classes.boxHeader}>
              <h4 style={{ textAlign: "center" }}>School Package</h4>
            </div>
            <div className={classes.boxContent}>
              <div className={classes.caption}>This Package includes:</div>
              <table className={classes.table1}>
                <tbody>
                  <tr>
                    <td className={classes.col1}>+2</td>
                    <td className={classes.col2}>Points for Bike Parking</td>
                  </tr>
                  <tr>
                    <td className={classes.col1}>+6</td>
                    <td className={classes.col2}>
                      Points for Encouragement Program
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.col1}></td>
                    <td className={classes.col2}>
                      (Voluntary Travel Behavior...)
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.col1}>+2</td>
                    <td className={classes.col2}>Points for HOV Program</td>
                  </tr>
                  <tr>
                    <td className={classes.col1}>+4</td>
                    <td className={classes.col2}>
                      Points for School Safety Program
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.col1}>+1</td>
                    <td className={classes.col2}>Bonus Point</td>
                  </tr>
                  <tr
                    style={{
                      borderTop: "2px solid #002E6D",
                      marginTop: "0.5em"
                    }}
                  >
                    <td className={classes.subtotal1}>15</td>
                    <td className={classes.subtotal2}>Points</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
      {allowResidentialPackage && allowSchoolPackage ? (
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
        <span style={{ textAlign: "left" }}>
          <ToolTipLabel
            id="tooltip-package-description"
            tooltipContent="There are many TDM strategies choices and most involve making long-term commitments in meeting program compliance.         Small development projects (defined as Program Level 1 that provide no more than the parking baseline), are provided TDM packages that allow fulfillment of the minimum 15 point target from a pre-selected menu.             A point incentive is provided for the packages made up of strategies that work together to reinforce their effectiveness in reducing drive-alone trips.             Each strategy selected on its own does not result in the required minimum point target but several selected together will. Each package can be unselected and individual strategies that will work best to both achieve the TDM program goals and your specific development objectives should be chosen. "
          >
            <ToolTipIcon />
          </ToolTipLabel>

          <ToolTip id={"tooltip-package-description"} />
        </span>
      </h3>
    </div>
  );
}

ProjectPackages.propTypes = {
  allowResidentialPackage: PropTypes.bool.isRequired,
  allowSchoolPackage: PropTypes.bool.isRequired
};

export default ProjectPackages;
