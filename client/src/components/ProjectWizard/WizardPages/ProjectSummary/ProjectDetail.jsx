import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  rule: {
    width: "96%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "24px",
    margin: "4px auto",
    padding: "0 2%"
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
  }
});

const ProjectDetail = props => {
  const classes = useStyles();
  const { rule, value, valueTestId } = props;

  return rule ? (
    <div className={clsx("space-between", classes.rule)}>
      <div className={clsx(classes.ruleName)}>{rule.name}</div>
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
