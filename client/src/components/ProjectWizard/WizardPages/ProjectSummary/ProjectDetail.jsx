import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { numberWithCommas } from "../../helpers";

const useStyles = createUseStyles({
  rule: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "24px",
    margin: "4px auto"
  },
  ruleName: {
    flexBasis: "80%"
  },
  pointsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexBasis: "20%"
  },
  measureDetails: {
    textAlign: "right",
    fontWeight: "600",
    minWidth: "40px",
    marginRight: "10px"
  },
  measureUnits: {
    minWidth: "6rem"
  },
  leftIndent: {
    marginLeft: "20px"
  }
});

const ProjectDetail = props => {
  const classes = useStyles();
  const { rule, value: propsValue, valueTestId } = props;

  const isSubRule = rule.name.startsWith("..... ");
  const renderName = isSubRule ? rule.name.substring(6) : rule.name;
  const ruleNameStyle = isSubRule
    ? clsx(classes.ruleName, classes.leftIndent)
    : classes.ruleName;

  const displayValue = propsValue
    ? propsValue
    : rule.dataType === "boolean"
    ? rule.value
      ? "Yes"
      : "No"
    : rule.dataType === "number"
    ? numberWithCommas(rule.value)
    : "Unknown Data Type";

  return rule ? (
    <div className={clsx("space-between", classes.rule)}>
      <div className={ruleNameStyle}>{renderName}</div>
      <div className={clsx(classes.pointsContainer)}>
        <div className={classes.measureDetails} data-testid={valueTestId}>
          {displayValue}
        </div>
        <div className={clsx(classes.measureUnits)}>{rule.units}</div>
      </div>
    </div>
  ) : null;
};
ProjectDetail.propTypes = {
  rule: PropTypes.object.isRequired,
  value: PropTypes.string,
  valueTestId: PropTypes.string.isRequired
};

export default ProjectDetail;
