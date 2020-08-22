import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ToolTip from "./ToolTip";
import clsx from "clsx";

const useStyles = createUseStyles({
  ruleValue: {
    fontSize: "40px",
    fontFamily: "Oswald, Calibri",
    fontWeight: "bold",
    marginBottom: 6
  },
  ruleName: {
    fontFamily: "Oswald, Calibri",
    fontSize: "16px",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  lowOpacity: {
    opacity: 0.4
  },
  noDisplay: {
    display: "none !important"
  }
});

const SidebarPoints = props => {
  const classes = useStyles();
  const { rule } = props;
  const opacityTest =
    rule.value && rule.value !== "0" ? "" : classes.lowOpacity;
  const noToolTip = rule.value === 0 ? classes.noDisplay : "";

  return (
    <div className={clsx("tdm-calculation-metrics-panel-item", opacityTest)}>
      <div className={classes.ruleValue}>{rule.value}</div>
      <h3 className={classes.ruleName}>
        {rule.name}
        <span className={clsx(classes.projectLevelContainer, noToolTip)}>
          <ToolTip tipText={rule.description} />
        </span>
      </h3>
      {/* <div> {rule.units}</div> */}
    </div>
  );
};
SidebarPoints.propTypes = {
  rule: PropTypes.object.isRequired
};

export default SidebarPoints;
