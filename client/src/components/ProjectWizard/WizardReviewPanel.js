import React from "react";
import { createUseStyles } from "react-jss";
import clsx from 'clsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    minWidth: "60vw"
  },
  alignCenter: {
    textAlign: "center"
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "20px"
  },
  measure: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    borderRadius: "6px",
    padding: "0.5em",
    alignItems: "center"
  },
  measureValue: {
    fontWeight: "bold",
    fontSize: "3em"
  },
  label: {
    fontWeight: "bold",
    fontSize: "1em"
  },
  heading: {
    marginTop: "1em"
  },
  rule: {
    width: "100%",
    display: "flex",
    displayDirection: "row",
    marginLeft: "1em"
  },
  ruleName: {
    flex: "1 1 auto"
  },
  value: {
    flex: "0 0 10%",
    textAlign: "right"
  },
  ruleUnits: {
    flex: "0 0 20%",
    paddingLeft: "1em"
  },
  icon: {
    flex: "0 0 5%"
  },
  calcUnits: {
    flex: "0 0 10%",
    paddingLeft: "1em"
  },
  overline: {
    borderTop: "2px solid black"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: "1em",
    justifyContent: "space-evenly"
  }
});

const WizardReviewPanel = props => {
  const classes = useStyles();
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
    <div className={clsx("tdm-wizard-review-page", classes.root)}>
      <h2 className="tdm-wizard-page-title">TDM Calculation Summary</h2>

      {projectName && projectName.value ? (
        <h3 className="tdm-wizard-page-subtitle">{projectName.value}</h3>
      ) : null}

      {projectAddress && projectAddress.value ? (
        <h3 className="tdm-wizard-page-subtitle">{projectAddress.value}</h3>
      ) : null}

      {projectDescription && projectDescription.value ? (
        <p className={classes.alignCenter}>{projectDescription.value} </p>
      ) : null}

      <div className={classes.grid}>
        {targetPoints ? (
          <div className={classes.measure}>
            <div className={classes.measureValue}>{Math.round(targetPoints.value)}</div>
            <div className={classes.label}>Target Points</div>
          </div>
        ) : null}

        {earnedPoints ? (
          <div className={classes.measure}>
            <div className={classes.measureValue}>{Math.round(earnedPoints.value)}</div>
            <div className={classes.label}>Earned Points</div>
          </div>
        ) : null}
      </div>

      <div className={classes.grid}>
        {parkingRatio ? (
          <div className={classes.measure}>
            <div className={classes.measureValue}>{`${Math.floor(parkingRatio.value).toString()} %`}</div>
            <div className={classes.label}>Provided / Required Parking</div>
          </div>
        ) : null}

        {level ? (
          <div className={classes.measure}>
            <div className={classes.measureValue}>{level.value}</div>
            <div className={classes.label}>Project Level</div>
          </div>
        ) : null}
      </div>

      <h2 className={classes.heading}>Land Uses</h2>
      <div> {`${landUses}`}</div>

      <h2 className={classes.heading}>TDM Measures Selected</h2>
      {rules && rules.length > 0
        ? measureRules.map(rule => (
            <div key={rule.id} className={classes.rule}>
              <div className={classes.ruleName}>{rule.name}</div>
              <div className={classes.value}>
                {rule.dataType === "boolean" ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : rule.dataType === "choice" ? (
                  rule.choices.filter(choice => choice.id === rule.value)[0].name
                ) : (
                  rule.value
                )}
              </div>
              <div className={classes.ruleUnits}>{rule.units}</div>
              <div className={classes.icon}><FontAwesomeIcon icon={faArrowRight} /></div>
              <div className={classes.value}>{Math.round(rule.calcValue * 100) / 100}</div>
              <div className={classes.calcUnits}>{rule.calcUnits}</div>
            </div>
          ))
        : null}

      <h2 className={classes.heading}>Required Parking Calculation</h2>
      {rules && rules.length > 0
        ? inputRules.map(rule => (
            <div key={rule.id} className={classes.rule}>
              <div className={classes.ruleName}>{rule.name}</div>
              <div className={classes.value}>{rule.value}</div>
              <div className={classes.ruleUnits}>{rule.units}</div>
              <div className={classes.icon}><FontAwesomeIcon icon={faArrowRight} /></div>
              <div className={classes.value}>{Math.round(rule.calcValue * 100) / 100}</div>
              <div className={classes.calcUnits}>{rule.calcUnits}</div>
            </div>
          ))
        : null}

      {parkingRequired ? (
        <div className={classes.rule}>
          <div className={classes.ruleName}>{parkingRequired.name}</div>
          <div className={clsx(classes.value, classes.overline)}>{Math.round(parkingRequired.value * 100) / 100}</div>
          <div className={clsx(classes.value, classes.overline)}>{parkingRequired.units}</div>
        </div>
      ) : null}

      {parkingProvided ? (
        <div className={classes.rule}>
          <div className={classes.ruleName}>{parkingProvided.name}</div>
          <div className={classes.value}>{Math.round(parkingProvided.value * 100) / 100}</div>
          <div className={classes.ruleUnits}>{parkingProvided.units}</div>
        </div>
      ) : null}

      {account.id && (!projectId || account.id === loginId) ? (
        <div className={classes.buttonContainer}>
          <button className="tdm-wizard-save-button" onClick={onSave}>
            {projectId ? "Save Project Changes" : "Save As New Project"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default WizardReviewPanel;
