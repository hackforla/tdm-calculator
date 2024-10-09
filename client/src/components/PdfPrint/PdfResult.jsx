import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  result: {
    marginTop: "10px",
    marginBottom: "-10px",
    padding: "0px",
    fontSize: "17px",
    textIndent: "10px"
  }
});

const PdfResult = props => {
  const { rule, valueTestId } = props;
  const classes = useStyles();
  return rule ? (
    <div>
      <h3 data-testid={valueTestId} className={classes.result}>
        {rule.name}: {Math.round(rule.value)}
      </h3>
    </div>
  ) : null;
};
PdfResult.propTypes = {
  rule: PropTypes.object.isRequired,
  valueTestId: PropTypes.string
};

export default PdfResult;
