import React from "react";

const ResultPanelItem = props => {
  const { rule } = props;
  return (
    <div className="tdm-calculation-metrics-panel-item">
      <div style={{ fontSize: "4em" }}>{rule.value}</div>
      <h3 style={{ fontSize: "0.75em" }}>{rule.name}</h3>
      {/* <div> {rule.units}</div> */}
    </div>
  );
};

export default ResultPanelItem;
