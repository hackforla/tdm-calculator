import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  alignCenter: {
    textAlign: "center"
  },
  label: {
    fontWeight: 500,
    marginTop: "10px",
    textTransform: "uppercase"
  },
  measure: {
    height: "132px",
    minWidth: "49%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Oswald"
  },
  measureValue: {
    fontSize: "42px",
    marginTop: "33px",
    fontWeight: "700"
  }
});

const Result = props => {
  const classes = useStyles();
  const { rule, borderStyle, valueTestId } = props;

  return rule ? (
    <div className={clsx(classes.measure, borderStyle)}>
      <div className={classes.measureValue} data-testid={valueTestId}>
        {Math.round(rule.value)}
      </div>
      <div className={clsx(classes.alignCenter, classes.label)}>
        {rule.name}
      </div>
    </div>
  ) : null;
};
Result.propTypes = {
  rule: PropTypes.object.isRequired,
  borderStyle: PropTypes.string.isRequired,
  valueTestId: PropTypes.string
};

export default Result;
