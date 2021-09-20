import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  rule: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "24px",
    margin: "4px auto"
  },
  ruleName: {
    minWidth: "270px"
  },
  pointsContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  measureDetails: {
    fontSize: "14px",
    textAlign: "right",
    minWidth: "40px",
    marginRight: "10px"
  },
  measureUnits: {
    fontSize: "14px",
    width: "65px"
  }
});

const LandUses = props => {
  const classes = useStyles();
  const { rules } = props;

  return (
    <div className={classes.rule}>
      <div className={classes.ruleName}>
        {rules
          .filter(
            rule => rule.used && rule.value && rule.calculationPanelId === 5
          )
          .map(r => r.name)
          .join(", ")}
      </div>
      <div className={classes.pointsContainer}>
        <div className={classes.measureDetails}></div>
        <div className={classes.measureUnits}></div>
      </div>
    </div>
  );
};
LandUses.propTypes = {
  rules: PropTypes.array.isRequired
};

export default LandUses;
