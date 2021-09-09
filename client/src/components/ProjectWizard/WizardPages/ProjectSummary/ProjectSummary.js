import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader";
import { numberWithCommas, getRule, roundToTwo } from "../../helpers";
import ProjectInfoContainer from "./ProjectInfoContainer";
import ProjectDetail from "./ProjectDetail";
import MeasureSelected from "./MeasureSelected";
import PointsEarnedMessage from "./PointsEarnedMessage";

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
  success: {
    color: "#A7C539"
  },
  failure: {
    color: "#E46247"
  },
  label: {
    fontWeight: 500,
    marginTop: "10px",
    textTransform: "uppercase"
  },
  rule: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "24px",
    margin: "4px auto"
  },
  ruleName: {
    minWidth: "270px"
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
  categoryContainer: {
    marginTop: "40px"
  },
  categoryHeaderContainer: {
    background: "#E7EBF0",
    padding: "12px"
  },
  categoryHeader: {
    fontSize: "16px",
    fontFamily: "Oswald",
    fontWeight: "bold"
  },
  resultsContainer: {
    paddingTop: "16px",
    height: "170px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%"
  },
  measuresContainer: {
    paddingTop: "10px",
    margin: "0 12px"
  },
  earnedPoints: {
    fontFamily: "Oswald",
    fontWeight: "500",
    fontSize: "12px",
    color: "#0F2940",
    paddingTop: "5px",
    marginRight: "31px"
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
  pointsContainer: {
    display: "flex",
    justifyContent: "flex-end"
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
      <div className={classes.ruleName}>
        {rules
          .filter(
            rule => rule.used && rule.value && rule.calculationPanelId === 5
          )
          .map(r => r.name)
          .join(", ")}
      </div>
      <div className={classes.pointsContainer}>
        <div className={classes.measureDetails}></div>
        <div className={classes.measureUnits}></div>
      </div>
    </div>
  );

  const parkingRequired = getRule(rules, "PARK_REQUIREMENT");
  const parkingProvided = getRule(rules, "PARK_SPACES");
  const parkingRatio = getRule(rules, "CALC_PARK_RATIO");
  const level = getRule(rules, "PROJECT_LEVEL");
  const targetPoints = getRule(rules, "TARGET_POINTS_PARK");
  const earnedPoints = getRule(rules, "PTS_EARNED");

  const userDefinedStrategy = getRule(rules, "STRATEGY_APPLICANT");

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

  const rulesNotEmpty = rules && rules.length > 0;

  const earnedPointsValueStyle = targetPointsReached
    ? clsx(classes.measureValue, classes.success)
    : clsx(classes.measureValue, classes.failure);

  const renderResult = (rule, textStyle, valueTestId) =>
    rule ? (
      <div className={clsx("border-gray", classes.measure)}>
        <div className={textStyle} data-testid={valueTestId}>
          {Math.round(rule.value)}
        </div>
        <div className={clsx(classes.alignCenter, classes.label)}>
          {rule.name}
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
      {rules ? <ProjectInfoContainer rules={rules} /> : null}

      {!loading ? (
        <>
          <div className={classes.categoryContainer}>
            <div
              className={clsx("space-between", classes.categoryHeaderContainer)}
            >
              <span className={classes.categoryHeader}>RESULTS</span>
            </div>
            <div className={clsx("space-between", classes.resultsContainer)}>
              {renderResult(
                earnedPoints,
                earnedPointsValueStyle,
                "summary-earned-points-value"
              )}
              {renderResult(
                targetPoints,
                classes.measureValue,
                "summary-target-points-value"
              )}
            </div>
            <PointsEarnedMessage targetPointsReached={targetPointsReached} />
          </div>

          <div className={classes.categoryContainer}>
            <div
              className={clsx("space-between", classes.categoryHeaderContainer)}
            >
              <span className={classes.categoryHeader}>
                TDM MEASURES SELECTED
              </span>
              <span className={classes.earnedPoints}>EARNED POINTS</span>
            </div>
            <div className={classes.measuresContainer}>
              {rulesNotEmpty
                ? measureRules.map(rule => (
                    <MeasureSelected rule={rule} key={rule.id} />
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
            <div
              className={clsx("space-between", classes.categoryHeaderContainer)}
            >
              <span className={classes.categoryHeader}>PROJECT DETAILS</span>
            </div>
            <div className={classes.measuresContainer}>
              <ProjectDetail
                rule={level}
                value={level.value}
                valueTestId={"summary-project-level-value"}
              />
              {landUses}
              {rulesNotEmpty
                ? specificationRules.map(rule => {
                    if (typeof rule.value == "boolean") {
                      rule.value ? (rule.value = "Yes") : "No";
                    }
                    return (
                      <ProjectDetail
                        rule={rule}
                        value={numberWithCommas(rule.value)}
                        valueTestId={""}
                        key={rule.id}
                      />
                    );
                  })
                : null}
              <ProjectDetail
                rule={parkingRequired}
                value={numberWithCommas(roundToTwo(parkingRequired.value))}
                valueTestId={""}
              />
              <ProjectDetail
                rule={parkingProvided}
                value={numberWithCommas(roundToTwo(parkingProvided.value))}
                valueTestId={""}
              />
              <ProjectDetail
                rule={parkingRatio}
                value={Math.floor(parkingRatio.value).toString()}
                valueTestId={"summary-parking-ratio-value"}
              />
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
