import React from "react";
import { createUseStyles } from "react-jss";
import ResultView from "./ResultView";

const useStyles = createUseStyles({
  root: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "-0.5em"
  }
});

const ResultList = props => {
  const classes = useStyles();
  const { rules } = props;

  return (
    <div className={classes.root}>
      {rules && rules.length > 0
        ? rules.map(rule => <ResultView key={rule.id} rule={rule} />)
        : null}
    </div>
  );
};

export default ResultList;
