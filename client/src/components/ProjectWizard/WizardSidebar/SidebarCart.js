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
  row: { display: "flex", justifyContent: "space-between" },
  noDisplay: {
    display: "none !important"
  }
});

const SidebarCart = props => {
  const { strategyRules } = props;
  const classes = useStyles();
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
            <div classes={classes.dataName}>{rule.name}</div>
            <div className={classes.dataPointsCell}>
              <span className={classes.dataPoints}>
                {Math.round(rule.calcValue * 100) / 100}
              </span>
              <span className={classes.dataUnits}>&nbsp;pts</span>
            </div>
          </div>
        ))}
    </div>
  );
};

SidebarCart.propTypes = {
  strategyRules: PropTypes.array
};

export default SidebarCart;
