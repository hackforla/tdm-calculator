import React from "react";
import PropTypes from "prop-types";

const PdfResult = props => {
  const { rule, valueTestId } = props;

  return rule ? (
    <div>
      <h3 data-testid={valueTestId}>
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
