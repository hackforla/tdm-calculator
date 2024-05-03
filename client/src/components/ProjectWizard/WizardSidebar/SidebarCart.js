import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    width: "100%",
    flexBasis: "100%",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid black"
  },
  headerName: {
    fontSize: "16pt",
    weight: "bold",
    textAlign: "left"
  },
  dataName: {
    fontSize: "16px",
    fontFamily: "Calibri",
    lineHeight: "18px",
    marginTop: "5px"
  },
  headerPoints: {
    fontSize: "12pt",
    weight: "500",
    textAlign: "right",
    marginBottom: "2px"
  },
  dataPointsCell: { textAlign: "right" },
  dataPoints: { fontSize: "18px", fontFamily: "Oswald" },
  dataUnits: { fontSize: "14px", fontFamily: "Calibri", marginBottom: "10px" },
  row: {
    display: "flex",
    justifyContent: "space-between"
  },
  noDisplay: {
    display: "none !important"
  },
  reducedParkingBox: {
    margin: "0.5em auto",
    padding: "1em 1em",
    fontSize: "10pt",
    borderRadius: "8px",
    minWidth: "16em",
    background: "#FFFFFF",
    boxSizing: "border-box",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    border: "1px solid #0F2940"
  }
});

const SidebarCart = props => {
  const { strategyRules, page } = props;
  const classes = useStyles();
  const reducedParkingRule = strategyRules.find(
    r => r.code === "STRATEGY_PARKING_5"
  );
  const showReducedParkingNotification =
    page === 3 && reducedParkingRule && reducedParkingRule.calcValue > 0;
  let reductionPercentageText = "";
  if (showReducedParkingNotification) {
    switch (reducedParkingRule.calcValue) {
      case 12:
        reductionPercentageText = "90-100%";
        break;
      case 8:
        reductionPercentageText = "50-89%";
        break;
      case 4:
        reductionPercentageText = "25-49%";
        break;
      default:
        reductionPercentageText = "10-24%";
        break;
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.headerName}>TDM STRATEGIES SELECTED</div>
        <div className={classes.headerPoints}>EARNED POINTS</div>
      </div>
      <hr />

      {strategyRules
        .filter(r => r.calcValue > 0)
        .map(rule => (
          <div
            key={rule.code}
            className={strategyRules ? classes.row : classes.noDisplay}
          >
            <div className={classes.dataName}>{rule.name}</div>
            <div className={classes.dataPointsCell}>
              <span className={classes.dataPoints}>
                {Math.round(rule.calcValue * 100) / 100}
              </span>
              <span className={classes.dataUnits}>&nbsp;pts</span>
            </div>
          </div>
        ))}

      {showReducedParkingNotification && (
        <div className={classes.reducedParkingBox}>
          {`Automatically earned ${reducedParkingRule.calcValue.toString()} points
          on the TDM Strategy Reduced Parking Supply for reducing parking 
          by ${reductionPercentageText} below the Baseline.`}
        </div>
      )}
    </div>
  );
};

SidebarCart.propTypes = {
  strategyRules: PropTypes.array,
  page: PropTypes.number
};

export default SidebarCart;
