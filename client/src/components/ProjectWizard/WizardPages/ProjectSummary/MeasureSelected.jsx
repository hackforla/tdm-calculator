import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { roundToTwo } from "../../helpers";

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
  ruleText: {
    fontSize: "14px",
    textAlign: "center",
    margin: "0 16px"
  },
  detailsContainer: {
    display: "flex",
    minWidth: "180px",
    maxWidth: "35%"
  },
  pointsContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  value: {
    fontFamily: "Oswald",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "right"
  },
  calcUnitsPts: {
    margin: "3px 45px 0 10px"
  }
});

const MeasureSelected = props => {
  const classes = useStyles();
  const { rule } = props;

  return (
    <div className={classes.rule}>
      <div className={classes.ruleName}>{rule.name}</div>
      <div className={clsx("justify-content-center", classes.detailsContainer)}>
        <div className={classes.ruleText}>
          {rule.dataType === "boolean" || rule.dataType === "number"
            ? null
            : rule.dataType === "choice"
            ? rule.choices.find(
                choice => Number(choice.id) === Number(rule.value)
              )
              ? rule.choices.find(
                  choice => Number(choice.id) === Number(rule.value)
                ).name
              : rule.value
            : rule.value}
        </div>
      </div>
      <div className={classes.pointsContainer}>
        <div className={classes.value}>{roundToTwo(rule.calcValue)}</div>
        <div className={classes.calcUnitsPts}>{rule.calcUnits}</div>
      </div>
    </div>
  );
};
MeasureSelected.propTypes = {
  rule: PropTypes.object.isRequired
};

export default MeasureSelected;
