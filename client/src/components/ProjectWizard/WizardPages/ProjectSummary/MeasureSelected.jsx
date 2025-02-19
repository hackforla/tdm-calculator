import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
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
    flexBasis: "40%"
  },
  ruleText: {
    flexBasis: "40%",
    textAlign: "right",
    margin: "0 16px"
  },
  pointsContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  value: {
    fontWeight: "600",
    textAlign: "right"
  },
  calcUnitsPts: {
    marginLeft: "0.5rem",
    minWidth: "6rem"
  }
});

const MeasureSelected = props => {
  const classes = useStyles();
  const { rule } = props;

  return (
    <div className={classes.rule}>
      <div className={classes.ruleName}>{rule.name}</div>

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
