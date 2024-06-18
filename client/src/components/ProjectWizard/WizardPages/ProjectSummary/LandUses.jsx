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
    minWidth: "270px",
    fontSize: "14px"
  },
  value: {
    display: "flex",
    fontSize: "14px",
    justifyContent: "flex-end"
  }
});

const LandUses = props => {
  const classes = useStyles();
  const { rules } = props;

  return (
    <div className={classes.rule}>
      <div className={classes.ruleName}>Land Uses</div>
      <div className={classes.value}>
        {rules
          .filter(
            rule => rule.used && rule.value && rule.calculationPanelId === 5
          )
          .map(r => r.name)
          .join(", ")}
      </div>
    </div>
  );
};
LandUses.propTypes = {
  rules: PropTypes.array.isRequired
};

export default LandUses;
