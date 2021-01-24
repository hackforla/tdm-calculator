import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ToolTipIcon from "./ToolTipIcon";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";

const useStyles = createUseStyles({
  ruleValue: {
    fontSize: "100px",
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
  },
  tooltip: {
    color: "rgb(30, 36, 63) !important",
    minWidth: "200px",
    maxWidth: "400px",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: "bold",
    "-webkit-box-shadow": "0px 0px 8px rgba(0, 46, 109, 0.2)",
    "-moz-box-shadow": "0px 0px 8px rgba(0, 46, 109, 0.2)",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    "-webkit-border-radius": 2,
    "-moz-border-radius": 2,
    borderRadius: 2,
    "&.show": {
      visibility: "visible !important",
      opacity: "1 !important"
    }
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
        <span
          className={clsx(classes.projectLevelContainer, noToolTip)}
          data-tip={rule.description}
          data-iscapture="true"
          data-html="true"
          data-class={classes.tooltip}
        >
          <ToolTipIcon
            containerStyle={{
              fontSize: 16,
              verticalAlign: "top",
              "&:hover": { cursor: "pointer" }
            }}
          />
        </span>
      </h3>
      {/* <div> {rule.units}</div> */}
      <ReactTooltip
        place="right"
        type="info"
        effect="float"
        multiline={true}
        style={{
          width: "25vw"
        }}
        textColor="#32578A"
        backgroundColor="#F7F9FA"
        borderColor="rgb(30, 36, 63)"
        border={true}
        offset={{ right: 20 }}
      />
    </div>
  );
};
SidebarPoints.propTypes = {
  rule: PropTypes.object.isRequired
};

export default SidebarPoints;
