import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  ruleValue: {
    fontSize: "40px",
    fontFamily: "Oswald, Calibri",
    fontStyle: "bold"
  },
  ruleValueHidden: {
    fontSize: "40px",
    fontFamily: "Oswald, Calibri",
    fontStyle: "bold",
    visibility: "hidden"
  },
  ruleName: {
    fontSize: "16px",
    textAlign: "center"
  }
});

const SidebarPoints = props => {
  const classes = useStyles();
  const { rule } = props;
  return (
    <div className="tdm-calculation-metrics-panel-item">
      <div
        className={
          rule.value && rule.value !== "0"
            ? classes.ruleValue
            : classes.ruleValueHidden
        }
      >
        {rule.value}
      </div>
      <h3 className={classes.ruleName}>{rule.name}</h3>
      {/* <div> {rule.units}</div> */}
    </div>
  );
};
SidebarPoints.propTypes = {
  rule: PropTypes.object.isRequired
};

export default SidebarPoints;
