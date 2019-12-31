import React from "react";

const WizardReviewPanel = props => {
  const { rules } = props;

  const inputRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.used &&
        rule.display &&
        (!!rule.value || !!rule.calcValue)
    );

  const parkingRequired = rules.filter(
    rule => rule.code === "PARK_REQUIREMENT"
  );
  const parkingProvided = rules.filter(rule => rule.code === "PARK_SPACES");
  const level = rules.filter(rule => rule.code === "LEVEL");
  const targetPoints = rules.filter(rule => rule.code === "TARGET_POINTS_PARK");

  const measureRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.used &&
        rule.display &&
        (!!rule.value || !!rule.calcValue)
    );

  const earnedPoints = rules.filter(rule => rule.code === "PTS_EARNED");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        alignContent: "stretch"
      }}
    >
      {rules && rules.length > 0
        ? inputRules.map(rule => (
            <div
              key={rule.id}
              style={{
                width: "80%",
                display: "flex",
                displayDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <div>{rule.name}</div>
              <div>{rule.value}</div>
              <div>{rule.calcValue}</div>
              <div>{rule.calcUnits}</div>
            </div>
          ))
        : null}
    </div>
  );
};

export default WizardReviewPanel;
