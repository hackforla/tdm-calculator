import React from "react";

const WizardResultPanelItem = props => {
  const { rule } = props;
  return (
    <div className="tdm-calculation-metrics-panel-item">
      <div
        style={{
          fontSize: "40px",
          fontFamily: "Oswald, Calibri",
          fontStyle: "bold"
        }}
      >
        {rule.value}
      </div>
      <h3 style={{ fontSize: "16px" }}>{rule.name}</h3>
      {/* <div> {rule.units}</div> */}
    </div>
  );
};

export default WizardResultPanelItem;
