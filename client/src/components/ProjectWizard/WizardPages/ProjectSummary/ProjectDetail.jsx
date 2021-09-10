import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

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
    fontFamily: "Oswald",
    fontSize: "18px",
    textAlign: "right",
    fontWeight: "bold",
    minWidth: "40px",
    marginRight: "10px"
  },
  measureUnits: {
    fontSize: "14px",
    width: "65px"
  },
  leftIndent: {
    marginLeft: "20px"
  }
});

const ProjectDetail = props => {
  const classes = useStyles();
  const { rule, value, valueTestId } = props;

  const isSubRule = rule.name.startsWith("..... ");
  const renderName = isSubRule ? rule.name.substring(6) : rule.name;
  const ruleNameStyle = isSubRule
    ? clsx(classes.ruleName, classes.leftIndent)
    : classes.ruleName;

  return rule ? (
    <div className={clsx("space-between", classes.rule)}>
      <div className={ruleNameStyle}>{renderName}</div>
      <div className={clsx(classes.pointsContainer)}>
        <div className={classes.measureDetails} data-testid={valueTestId}>
          {value}
        </div>
        <div className={clsx(classes.measureUnits)}>{rule.units}</div>
      </div>
    </div>
  ) : null;
};
ProjectDetail.propTypes = {
  rule: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  valueTestId: PropTypes.string.isRequired
};

export default ProjectDetail;
