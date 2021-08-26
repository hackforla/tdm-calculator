import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader";
import { numberWithCommas } from "../helpers";

const useStyles = createUseStyles({
  projectSummary: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto"
  },
  alignCenter: {
    textAlign: "center"
  },
  measure: {
    height: "132px",
    minWidth: "49%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Oswald"
  },
  measureValue: {
    fontSize: "42px",
    marginTop: "33px",
    fontWeight: "bold"
  },
  Success: {
    color: "#748927"
  },
  Failure: {
    color: "#E46247"
  },
  measurePercent: {
    fontSize: "24px",
    marginLeft: "3px"
  },
  label: {
    fontWeight: 500,
    marginTop: "10px",
    textTransform: "uppercase"
  },
  rule: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "24px",
    margin: "4px auto"
  },
  ruleName: {
    minWidth: "270px"
  },
  value: {
    fontFamily: "Oswald",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "right"
  },
  calcUnitsPts: {
    margin: "3px 45px 0 10px"
  },
  calcUnitsSpcs: {
    margin: "3px 38px 0 10px"
  },
  bold: {
    fontFamily: "Calibri Bold"
  },
  loaderContainer: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center"
  },
  lastSaved: {
    fontSize: "14px",
    color: "#6F6C64"
  },
  lastSavedContainer: {
    margin: "24px auto 0"
  },
  projectInfoContainer: {
    margin: "70px auto 0",
    width: "100%",
    minHeight: "100px"
  },
  textProjectInfoHeader: {
    fontSize: "18px",
    fontWeight: "900",
    fontFamily: "Calibri Bold"
  },
  projectInfoDetailsContainer: {
    borderTop: "1px solid #E7EBF0",
    marginTop: "13px",
    paddingTop: "13px",
    height: "55px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%"
  },
  projectInfoDetailsSubContainer: {
    display: "flex",
    alignItems: "center",
    maxHeight: "20px",
    width: "50%"
  },
  projectInfoCategory: {
    fontFamily: "Oswald",
    fontSize: "12px",
    textTransform: "uppercase",
    textAlign: "right",
    color: "rgba(15, 41, 64, 0.5)",
    minWidth: "100px",
    marginRight: "17px"
  },
  projectInfoDetails: {
    fontFamily: "Calibri Bold"
  },
  categoryContainer: {
    marginTop: "40px"
  },
  categoryHeader: {
    fontFamily: "Oswald",
    fontWeight: "bold",
    background: "#E2E2E2",
    maxWidth: "600px"
  },
  resultsContainer: {
    borderTop: "1px solid #E7EBF0",
    marginTop: "3px",
    paddingTop: "16px",
    height: "350px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%"
  },
  resultsSuccess: {
    width: "100%",
    textAlign: "center",
    color: "#748927"
  },
  resultsFailure: {
    width: "100%",
    textAlign: "center",
    color: "#E46247"
  },
  landUsesContainer: {
    borderTop: "1px solid #E7EBF0",
    marginTop: "3px",
    paddingTop: "16px"
  },
  measuresContainer: {
    borderTop: "1px solid #E7EBF0",
    marginTop: "5px",
    paddingTop: "16px"
  },
  earnedPoints: {
    fontFamily: "Oswald",
    fontWeight: "500",
    fontSize: "12px",
    color: "rgba(15, 41, 64, 0.5)",
    paddingTop: "5px",
    marginRight: "36px"
  },
  measureDetails: {
    fontSize: "14px",
    textAlign: "right",
    minWidth: "40px",
    marginRight: "10px"
  },
  measureUnits: {
    fontSize: "14px",
    width: "65px"
  },
  detailsContainer: {
    display: "flex",
    minWidth: "180px",
    maxWidth: "35%"
  },
  specificationDetailsContainer: {
    minWidth: "140px",
    display: "flex",
    justifyContent: "flex-end"
  },
  pointsContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  ruleText: {
    fontSize: "14px",
    textAlign: "center",
    margin: "0 16px"
  },
  projectDescription: {
    display: "block",
    marginTop: "6px"
  },
  summaryContainer: {
    display: "flex",
    minWidth: "180px",
    maxWidth: "100%",
    marginRight: "3em",
    border: "1px 	#E7EBF0 solid",
    borderRadius: "5px",
    marginTop: "8px",
    padding: "12px"
  }
});

const ProjectSummary = props => {
  const classes = useStyles();
  const { rules } = props;

  const landUses = (
    <div className={clsx(classes.rule)}>
      <div className={classes.rule}>
        {rules
          .filter(
            rule => rule.used && rule.value && rule.calculationPanelId === 5
          )
          .map(r => r.name)
          .join(", ")}
      </div>
      <div className={classes.specificationDetailsContainer}>
        <div className={classes.measureDetails}></div>
        <div className={classes.measureUnits}></div>
      </div>
    </div>
  );

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

  const buildingPermit = getRule("BUILDING_PERMIT");
  const caseNumber = getRule("CASE_NO_LADOT");
  const parcelNumber = getRule("APN");
  const versionNumber = getRule("VERSION_NO");

  const parkingRequired = getRule("PARK_REQUIREMENT");
  const parkingProvided = getRule("PARK_SPACES");
  const parkingRatio = getRule("CALC_PARK_RATIO");
  const level = getRule("PROJECT_LEVEL");
  const targetPoints = getRule("TARGET_POINTS_PARK");
  const earnedPoints = getRule("PTS_EARNED");

  const userDefinedStrategy = getRule("STRATEGY_APPLICANT");

  // Note: a rule is not effective if the value is any falsey value or "0"
  const measureRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "measure" &&
        rule.used &&
        rule.display &&
        rule.calculationPanelId !== 10 &&
        (!!(rule.value && rule.value !== "0") ||
          !!(rule.calcValue && rule.calcValue !== "0"))
    );

  const specificationRules =
    rules &&
    rules.filter(
      rule =>
        rule.category === "input" &&
        rule.used &&
        rule.display &&
        rule.calculationPanelId !== 5 &&
        rule.calculationPanelId !== 31 &&
        (!!(rule.value && rule.value !== "0") ||
          !!(rule.calcValue && rule.calcValue !== "0"))
    );

  const loading =
    !level &&
    !parkingRatio &&
    !targetPoints &&
    !earnedPoints &&
    rules &&
    !rules.length &&
    !parkingRequired &&
    !parkingProvided;

  const targetPointsReached =
    earnedPoints &&
    Math.round(earnedPoints.value) >= Math.round(targetPoints.value);

  const renderLevel = level ? (
    <div className={clsx(classes.rule)}>
      <div className={classes.rule} data-testid="summary-project-level-label">
        {level.name}
      </div>
      <div className={classes.specificationDetailsContainer}>
        <div
          className={classes.measureDetails}
          data-testid="summary-project-level-value"
        >
          {level.value}
        </div>
        <div className={classes.measureUnits}></div>
      </div>
    </div>
  ) : null;

  const renderBaselineParking = parkingRequired ? (
    <div className={classes.rule}>
      <div className={clsx(classes.rule)}>{parkingRequired.name}</div>
      <div className={clsx(classes.pointsContainer)}>
        <div className={classes.measureDetails}>
          {numberWithCommas(Math.round(parkingRequired.value * 100) / 100)}
        </div>
        <div className={clsx(classes.measureUnits)}>spaces</div>
      </div>
    </div>
  ) : null;

  const renderParkingProvided = parkingProvided ? (
    <div className={classes.rule}>
      <div className={clsx(classes.rule)}>{parkingProvided.name}</div>
      <div className={classes.pointsContainer}>
        <div className={classes.measureDetails}>
          {numberWithCommas(Math.round(parkingProvided.value * 100) / 100)}
        </div>
        <div className={clsx(classes.measureUnits)}>spaces</div>
      </div>
    </div>
  ) : null;

  const renderParkingRatio = parkingRatio ? (
    <div className={classes.rule}>
      <div
        className={clsx(classes.rule, classes.bold)}
        data-testid="summary-parking-ratio-label"
      >
        {parkingRatio.name}
      </div>
      <div className={classes.pointsContainer}>
        <div
          className={classes.value}
          data-testid="summary-parking-ratio-value"
        >
          {`${Math.floor(parkingRatio.value).toString()}`}
        </div>
        <div className={classes.measureUnits}>%</div>
      </div>
    </div>
  ) : null;

  const renderTargetPoints = targetPoints ? (
    <div className={clsx("border-gray", classes.measure)}>
      <div
        className={classes.measureValue}
        data-testid={"summary-target-points-value"}
      >
        {Math.round(targetPoints.value)}
      </div>
      <div
        className={clsx(classes.alignCenter, classes.label)}
        data-testid={"summary-target-points-label"}
      >
        {targetPoints.name}
      </div>
    </div>
  ) : null;

  const earnedPointsValueStyle = targetPointsReached
    ? clsx(classes.measureValue, classes.Success)
    : clsx(classes.measureValue, classes.Failure);

  const renderEarnedPoints = earnedPoints ? (
    <div className={clsx("border-gray", classes.measure)}>
      <div
        className={earnedPointsValueStyle}
        data-testid={"summary-earned-points-value"}
      >
        {Math.round(earnedPoints.value)}
      </div>
      <div
        className={clsx(classes.alignCenter, classes.label)}
        data-testid={"summary-earned-points-label"}
      >
        {earnedPoints.name}
      </div>
    </div>
  ) : null;

  return (
    <div className={clsx("tdm-wizard-review-page", classes.projectSummary)}>
      <h1 className="tdm-wizard-page-title">TDM Calculation Summary</h1>
      <div className={classes.lastSavedContainer}>
        {props.dateModified && (
          <span className={classes.lastSaved}>
            <FontAwesomeIcon icon={faClock} /> &nbsp;Last saved:{" "}
            {props.dateModified}
          </span>
        )}
      </div>
      <div className={classes.projectInfoContainer}>
        {projectName && projectName.value ? (
          <span className={classes.textProjectInfoHeader}>
            {projectName.value}
          </span>
        ) : null}
        {projectAddress && projectAddress.value ? (
          <span className={classes.textProjectInfoHeader}>
            {" "}
            {projectAddress.value}
          </span>
        ) : null}
        {projectDescription && projectDescription.value ? (
          <span className={classes.projectDescription}>
            {projectDescription.value}{" "}
          </span>
        ) : null}
        <div className={classes.projectInfoDetailsContainer}>
          <div className={classes.projectInfoDetailsSubContainer}>
            <span className={classes.projectInfoCategory}>
              BUILDING PERMIT #
            </span>
            {buildingPermit && buildingPermit.value ? (
              <span className={classes.projectInfoDetails}>
                {buildingPermit.value}
              </span>
            ) : null}
          </div>
          <div className={classes.projectInfoDetailsSubContainer}>
            <span className={classes.projectInfoCategory}>PARCEL # (AIN)</span>
            {parcelNumber && parcelNumber.value ? (
              <span className={classes.projectInfoDetails}>
                {parcelNumber.value}
              </span>
            ) : null}
          </div>
          <div className={classes.projectInfoDetailsSubContainer}>
            <span className={classes.projectInfoCategory}>CASE #</span>
            {caseNumber && caseNumber.value ? (
              <span className={classes.projectInfoDetails}>
                {caseNumber.value}
              </span>
            ) : null}
          </div>
          <div className={classes.projectInfoDetailsSubContainer}>
            <span className={classes.projectInfoCategory}>VERSION #</span>
            {versionNumber && versionNumber.value ? (
              <span className={classes.projectInfoDetails}>
                {versionNumber.value}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {!loading ? (
        <>
          <div className={classes.categoryContainer}>
            <span className={classes.categoryHeader}>RESULTS</span>
            <div className={clsx("space-between", classes.resultsContainer)}>
              {renderEarnedPoints}
              {renderTargetPoints}

              {targetPointsReached ? (
                <span className={classes.resultsSuccess}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={classes.Success}
                  />{" "}
                  &nbsp;You have successfully earned the target points. Please,
                  print and submit
                </span>
              ) : (
                <span className={classes.resultsFailure}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={classes.Failure}
                  />{" "}
                  &nbsp;You have not reached the target points. Please, go back
                  and review your strategies
                </span>
              )}
            </div>
          </div>

          <div className={classes.categoryContainer}>
            <div className={clsx("space-between")}>
              <span className={classes.categoryHeader}>
                TDM MEASURES SELECTED
              </span>
              <span className={classes.earnedPoints}>EARNED POINTS</span>
            </div>
            <div className={classes.measuresContainer}>
              {rules && rules.length > 0
                ? measureRules.map(rule => (
                    <div key={rule.id} className={classes.rule}>
                      <div className={classes.ruleName}>{rule.name}</div>
                      <div
                        className={clsx(
                          "justify-content-center",
                          classes.detailsContainer
                        )}
                      >
                        <div className={classes.ruleText}>
                          {rule.dataType === "boolean"
                            ? null
                            : rule.dataType === "choice"
                            ? rule.choices.find(
                                choice =>
                                  Number(choice.id) === Number(rule.value)
                              )
                              ? rule.choices.find(
                                  choice =>
                                    Number(choice.id) === Number(rule.value)
                                ).name
                              : rule.value
                            : rule.value}
                        </div>
                      </div>
                      <div className={classes.pointsContainer}>
                        <div className={classes.value}>
                          {Math.round(rule.calcValue * 100) / 100}
                        </div>
                        <div className={classes.calcUnitsPts}>
                          {rule.calcUnits}
                        </div>
                      </div>
                    </div>
                  ))
                : null}
              {userDefinedStrategy.calcValue &&
              userDefinedStrategy.comment.length > 0 ? (
                <div>
                  <div className={classes.ruleName}>
                    Details about User Defined Strategy
                  </div>
                  <div
                    className={clsx(
                      "justify-content-center",
                      classes.summaryContainer
                    )}
                  >
                    {userDefinedStrategy.comment}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className={classes.categoryContainer}>
            <div className={clsx("space-between")}>
              <span className={classes.categoryHeader}>PROJECT DETAILS</span>
            </div>
            <div className={classes.measuresContainer}>
              {renderLevel}
              {landUses}
              {rules && rules.length > 0
                ? specificationRules.map(rule => {
                    if (typeof rule.value == "boolean") {
                      rule.value ? (rule.value = "Yes") : "No";
                    }
                    return (
                      <div
                        key={rule.id}
                        className={clsx("space-between", classes.rule)}
                      >
                        <div className={classes.ruleName}>{rule.name}</div>
                        <div className={classes.specificationDetailsContainer}>
                          <div className={classes.measureDetails}>
                            {numberWithCommas(rule.value)}
                          </div>
                          <div className={classes.measureUnits}>
                            {rule.units}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
              {renderBaselineParking}
              {renderParkingProvided}
              {renderParkingRatio}
            </div>
          </div>
        </>
      ) : (
        <div className={classes.loaderContainer}>
          <Loader loaded={false} className="spinner" left="auto" />
        </div>
      )}
    </div>
  );
};
ProjectSummary.propTypes = {
  rules: PropTypes.array.isRequired,
  account: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  loginId: PropTypes.number.isRequired,
  dateModified: PropTypes.string || null
};

export default ProjectSummary;
