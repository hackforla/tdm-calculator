import React from "react";

const ResultView = props => {
  const { rule } = props;
  return (
    <React.Fragment>
      <div className="tdm-calculation-metrics-panel">
        <h3 style={{ textAlign: "center" }}>{rule.name}</h3>
        <div style={{ fontSize: "2em", flexBasis: "50%" }}>{rule.value}</div>
        <div> {rule.units}</div>
      </div>
    </React.Fragment>
  );
};

export default ResultView;
