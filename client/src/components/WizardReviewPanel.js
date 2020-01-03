import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";

const WizardReviewPanel = props => {
  const { rules } = props;

  const inputRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.used &&
        rule.display &&
        rule.calculationPanelId !== 5 &&
        (!!rule.value || !!rule.calcValue)
    );

  const landUses = rules
    .filter(
      rule =>
        rule.category === "input" &&
        rule.used &&
        rule.value &&
        rule.calculationPanelId === 5
    )
    .map(r => r.name)
    .join(", ");

  const parkingRequired = rules.filter(
    rule => rule.code === "PARK_REQUIREMENT"
  );
  const parkingProvided = rules.filter(rule => rule.code === "PARK_SPACES");
  const parkingRatio = rules.filter(rule => rule.code === "CALC_PARK_RATIO");
  const level = rules.filter(rule => rule.code === "PROJECT_LEVEL");
  const targetPoints = rules.filter(rule => rule.code === "TARGET_POINTS_PARK");

  const measureRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "measure" &&
        rule.used &&
        rule.display &&
        rule.calculationPanelId !== 10 &&
        (!!rule.value || !!rule.calcValue)
    );

  const earnedPoints = rules.filter(rule => rule.code === "PTS_EARNED");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        minWidth: "70vw"
      }}
    >
      <div> {`Land Use: ${landUses}`}</div>
      <h2 style={{ marginTop: "1em" }}>Project Parameters</h2>
      {rules && rules.length > 0
        ? inputRules.map(rule => (
            <div
              key={rule.id}
              style={{
                width: "100%",
                display: "flex",
                displayDirection: "row",
                marginLeft: "1em"
              }}
            >
              <div style={{ flex: "1 1 auto" }}>{rule.name}</div>
              <div style={{ flex: "0 0 10%", textAlign: "right" }}>
                {rule.value}
              </div>
              <div style={{ flex: "0 0 20%", paddingLeft: "1em" }}>
                {rule.units}
              </div>
              <div style={{ flex: "0 0 5%" }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <div style={{ flex: "0 0 10%", textAlign: "right" }}>
                {Math.round(rule.calcValue * 100) / 100}
              </div>
              <div style={{ flex: "0 0 10%", paddingLeft: "1em" }}>
                {rule.calcUnits}
              </div>
            </div>
          ))
        : null}

      {parkingRequired && parkingRequired.length === 1 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            displayDirection: "row",
            fontWeight: "bold",
            marginLeft: "1em"
          }}
        >
          <div style={{ flex: "1 1 auto" }}>{parkingRequired[0].name}</div>
          <div
            style={{
              flex: "0 0 10%",
              textAlign: "right",
              borderTop: "2px solid black"
            }}
          >
            {Math.round(parkingRequired[0].value * 100) / 100}
          </div>
          <div
            style={{
              flex: "0 0 10%",
              paddingLeft: "1em",
              borderTop: "2px solid black"
            }}
          >
            {parkingRequired[0].units}
          </div>
        </div>
      ) : null}

      {parkingProvided && parkingProvided.length === 1 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            displayDirection: "row",
            fontWeight: "bold",
            marginLeft: "1em"
          }}
        >
          <div style={{ flex: "1 1 auto" }}>{parkingProvided[0].name}</div>
          <div style={{ flex: "0 0 10%", textAlign: "right" }}>
            {Math.round(parkingProvided[0].value * 100) / 100}
          </div>
          <div style={{ flex: "0 0 10%", paddingLeft: "1em" }}>
            {parkingProvided[0].units}
          </div>
        </div>
      ) : null}

      {parkingRatio && parkingRatio.length === 1 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            displayDirection: "row",
            fontWeight: "bold",
            marginLeft: "1em"
          }}
        >
          <div style={{ flex: "1 1 auto" }}>{parkingRatio[0].name}</div>
          <div style={{ flex: "0 0 10%", textAlign: "right" }}>
            {Math.round(parkingRatio[0].value * 100) / 100}
          </div>
          <div style={{ flex: "0 0 10%", paddingLeft: "1em" }}>
            {parkingRatio[0].units}
          </div>
        </div>
      ) : null}

      {level && level.length === 1 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            displayDirection: "row",
            fontWeight: "bold",
            marginLeft: "1em"
          }}
        >
          <div style={{ flex: "1 1 auto" }}>{level[0].name}</div>
          <div style={{ flex: "0 0 10%", textAlign: "right" }}>
            {Math.round(level[0].value * 100) / 100}
          </div>
          <div style={{ flex: "0 0 10%", paddingLeft: "1em" }}>
            {level[0].units}
          </div>
        </div>
      ) : null}

      {targetPoints && targetPoints.length === 1 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            displayDirection: "row",
            fontWeight: "bold",
            fontSize: "1.5em",
            marginLeft: "0.75em"
          }}
        >
          <div style={{ flex: "1 1 auto" }}>{targetPoints[0].name}</div>
          <div style={{ flex: "0 0 10%", textAlign: "right" }}>
            {Math.round(targetPoints[0].value * 100) / 100}
          </div>
          <div style={{ flex: "0 0 10%", paddingLeft: "1em" }}>
            {targetPoints[0].units}
          </div>
        </div>
      ) : null}

      <h2 style={{ marginTop: "1em" }}>TDM Measures</h2>
      {rules && rules.length > 0
        ? measureRules.map(rule => (
            <div
              key={rule.id}
              style={{
                width: "100%",
                display: "flex",
                displayDirection: "row",
                marginLeft: "1em"
              }}
            >
              <div style={{ flex: "1 1 auto" }}>{rule.name}</div>
              <div style={{ flex: "1 1 10%", textAlign: "right" }}>
                {rule.dataType === "boolean" ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : rule.dataType === "choice" ? (
                  rule.choices.filter(choice => choice.id == rule.value)[0].name
                ) : (
                  rule.value
                )}
              </div>
              <div style={{ flex: "0 0 20%", paddingLeft: "1em" }}>
                {rule.units}
              </div>
              <div style={{ flex: "0 0 5%" }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <div
                style={{
                  flex: "0 0 10%",
                  textAlign: "right"
                }}
              >
                {Math.round(rule.calcValue * 100) / 100}
              </div>
              <div
                style={{
                  flex: "0 0 10%",
                  paddingLeft: "1em"
                }}
              >
                {rule.calcUnits}
              </div>
            </div>
          ))
        : null}

      {earnedPoints && earnedPoints.length === 1 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            displayDirection: "row",
            fontWeight: "bold",
            fontSize: "1.5em",
            marginLeft: "0.75em"
          }}
        >
          <div style={{ flex: "1 1 auto" }}>{earnedPoints[0].name}</div>
          <div
            style={{
              flex: "0 0 10%",
              textAlign: "right",
              borderTop: "2px solid black"
            }}
          >
            {Math.round(earnedPoints[0].value * 100) / 100}
          </div>
          <div
            style={{
              flex: "0 0 10%",
              paddingLeft: "1em",
              borderTop: "2px solid black"
            }}
          >
            {earnedPoints[0].units}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WizardReviewPanel;
