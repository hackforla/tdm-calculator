import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  ruleValue: {
    fontSize: "40px",
    fontFamily: "Oswald, Calibri",
    fontStyle: "bold"
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
      <div className={classes.ruleValue}>{rule.value}</div>
      <h3 className={classes.ruleName}>{rule.name}</h3>
      {/* <div> {rule.units}</div> */}
    </div>
  );
};
SidebarPoints.propTypes = {
  rule: PropTypes.object.isRequired
};

export default SidebarPoints;
