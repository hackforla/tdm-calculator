import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ResultView from "./ResultView";

const useStyles = createUseStyles({
  resultList: {
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
    <div className={classes.resultList}>
      {rules && rules.length > 0
        ? rules.map(rule => <ResultView key={rule.id} rule={rule} />)
        : null}
    </div>
  );
};
ResultList.propTypes = {
  rules: PropTypes.array.isRequired
};

export default ResultList;
