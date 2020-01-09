import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";

const WizardReviewPanel = props => {
  const { rules, account, projectId, loginId, onSave } = props;

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

  const getRule = code => {
    const ruleList = rules.filter(rule => rule.code === code);
    if (ruleList && ruleList[0]) {
      return ruleList[0];
    }
    return null;
  };

  const projectName = getRule("PROJECT_NAME");
  const projectAddress = getRule("PROJECT_ADDRESS");
  const projectDescription = getRule("PROJECT_DESCRIPTION");

  const parkingRequired = getRule("PARK_REQUIREMENT");
  const parkingProvided = getRule("PARK_SPACES");
  const parkingRatio = getRule("CALC_PARK_RATIO");
  const level = getRule("PROJECT_LEVEL");
  const targetPoints = getRule("TARGET_POINTS_PARK");
  const earnedPoints = getRule("PTS_EARNED");

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

  const inputRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.used &&
        rule.display &&
        rule.calculationPanelId !== 5 &&
        rule.calculationPanelId !== 31 &&
        (!!rule.value || !!rule.calcValue)
    );

  return (
    <div
      className="tdm-wizard-review-page"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        minWidth: "60vw"
      }}
    >
      <h2 className="tdm-wizard-page-title">TDM Calculation Summary</h2>
      {projectName && projectName.value ? (
        <h3 className="tdm-wizard-page-subtitle">{projectName.value}</h3>
      ) : null}
      {projectAddress && projectAddress.value ? (
        <h3 className="tdm-wizard-page-subtitle">{projectAddress.value}</h3>
      ) : null}

      {projectDescription && projectDescription.value ? (
        <p style={{ textAlign: "center" }}>{projectDescription.value} </p>
      ) : null}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        {targetPoints ? (
          <div
            style={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              borderRadius: "6px",
              padding: "0.5em",
              alignItems: "center"
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "3em"
              }}
            >
              {Math.round(targetPoints.value)}
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1em"
              }}
            >
              Target Points
            </div>
          </div>
        ) : null}

        {earnedPoints ? (
          <div
            style={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              borderRadius: "6px",
              padding: "0.5em",
              alignItems: "center"
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "3em"
              }}
            >
              {Math.round(earnedPoints.value)}
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1em"
              }}
            >
              Earned Points
            </div>
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "1em",
          justifyContent: "space-evenly"
        }}
      >
        {parkingRatio ? (
          <div
            style={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              borderRadius: "6px",
              padding: "0.5em",
              alignItems: "center"
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "3em"
              }}
            >
              {`${Math.floor(parkingRatio.value).toString()} %`}
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1em",
                textAlign: "center"
              }}
            >
              Provided / Required Parking
            </div>
          </div>
        ) : null}

        {level ? (
          <div
            style={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              border: "1px solid black",
              borderRadius: "6px",
              padding: "0.5em",
              alignItems: "center"
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "3em"
              }}
            >
              {level.value}
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1em"
              }}
            >
              Project Level
            </div>
          </div>
        ) : null}
      </div>

      <h2 style={{ marginTop: "1em" }}>Land Uses</h2>
      <div> {`${landUses}`}</div>

      <h2 style={{ marginTop: "1em" }}>TDM Measures Selected</h2>
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
                  rule.choices.filter(choice => choice.id === rule.value)[0]
                    .name
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

      <h2 style={{ marginTop: "1em" }}>Required Parking Calculation</h2>
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

      {parkingRequired ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            displayDirection: "row",
            fontWeight: "bold",
            marginLeft: "1em"
          }}
        >
          <div style={{ flex: "1 1 auto" }}>{parkingRequired.name}</div>
          <div
            style={{
              flex: "0 0 10%",
              textAlign: "right",
              borderTop: "2px solid black"
            }}
          >
            {Math.round(parkingRequired.value * 100) / 100}
          </div>
          <div
            style={{
              flex: "0 0 10%",
              paddingLeft: "1em",
              borderTop: "2px solid black"
            }}
          >
            {parkingRequired.units}
          </div>
        </div>
      ) : null}

      {parkingProvided ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            displayDirection: "row",
            fontWeight: "bold",
            marginLeft: "1em"
          }}
        >
          <div style={{ flex: "1 1 auto" }}>{parkingProvided.name}</div>
          <div style={{ flex: "0 0 10%", textAlign: "right" }}>
            {Math.round(parkingProvided.value * 100) / 100}
          </div>
          <div style={{ flex: "0 0 10%", paddingLeft: "1em" }}>
            {parkingProvided.units}
          </div>
        </div>
      ) : null}

      {account.id && account.id === loginId ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1em",
            justifyContent: "space-evenly"
          }}
        >
          <button className="tdm-wizard-save-button" onClick={onSave}>
            {projectId ? "Save Project Changes" : "Save As New Project"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default WizardReviewPanel;
