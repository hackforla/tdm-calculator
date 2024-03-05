import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader";
import { numberWithCommas, getRule, roundToTwo } from "../../helpers";
import ProjectInfoContainer from "./ProjectInfoContainer";
import ProjectDetail from "./ProjectDetail";
import MeasureSelected from "./MeasureSelected";
import PointsEarnedMessage from "./PointsEarnedMessage";
import LandUses from "./LandUses";
import Result from "./Result";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  projectSummary: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto"
  },
  reviewPage: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    maxWidth: "600px",
    minWidth: "60vw"
  },
  // success: {
  //   color: "#A7C539"
  // },
  failure: {
    color: "#E46247"
  },
  successBorder: {
    border: "2px solid #A7C539"
  },
  failureBorder: {
    border: "2px solid #E46247"
  },
  normalBorder: {
    border: "1px solid #E7EBF0"
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
    marginTop: "25px"
  },
  categoryHeaderContainer: {
    background: "#E7EBF0",
    paddingLeft: "12px",
    paddingTop: "4px"
  },
  categoryHeader: {
    fontSize: "24px",
    fontFamily: "Calibri",
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: "32px"
    // fontSmoothing: "antialiased"
  },
  resultsContainer: {
    padding: "30px 0",
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
    fontFamily: "Calibri",
    fontWeight: "500",
    fontSize: "12px",
    color: "#00000",
    paddingTop: "5px",
    marginRight: "31px"
  },
  summaryContainer: {
    display: "flex",
    minWidth: "180px",
    maxWidth: "100%",
    marginTop: "4px",
    padding: "12px"
  },
  tempTextContainer: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
    padding: "12px"
  },
  tempText: {
    fontFamily: "Calibri",
    fontStyle: "italic",
    fontSize: "14px",
    color: "#C35302"
  }
});

const ProjectSummary = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { rules } = props;

  const parkingRequired = getRule(rules, "PARK_REQUIREMENT");
  const parkingProvided = getRule(rules, "PARK_SPACES");
  const parkingRatio = getRule(rules, "CALC_PARK_RATIO");
  const projectDescription = getRule(rules, "PROJECT_DESCRIPTION");
  const level = getRule(rules, "PROJECT_LEVEL");
  const targetPoints = getRule(rules, "TARGET_POINTS_PARK");
  const earnedPoints = getRule(rules, "PTS_EARNED");
  const projectName = getRule(rules, "PROJECT_NAME");

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

  const earnedPointsBorderStyle = targetPointsReached
    ? classes.successBorder
    : classes.failureBorder;

  return (
    <div className={clsx(classes.reviewPage, classes.projectSummary)}>
      <h1 style={{ ...theme.typography.heading1, margin: 0, padding: 0 }}>
        TDM Calculation Summary
      </h1>
      <div style={{ ...theme.typography.paragraph1, margin: 0, padding: 0 }}>
        {props.dateModified && (
          <span className={classes.lastSaved}>
            <FontAwesomeIcon icon={faClock} /> &nbsp;Last saved:{" "}
            {props.dateModified}
          </span>
        )}
      </div>

      {!loading ? (
        <>
          <div className={classes.categoryContainer}>
            <div
              className={clsx("space-between", classes.categoryHeaderContainer)}
            >
              <span className={classes.categoryHeader}>
                RESULTS FOR PROJECT: {projectName.value}
              </span>
            </div>
            <div className={clsx("space-between", classes.resultsContainer)}>
              <Result
                rule={earnedPoints}
                borderStyle={earnedPointsBorderStyle}
                valueTestId={"summary-earned-points-value"}
              />
              <Result
                rule={targetPoints}
                borderStyle={classes.normalBorder}
                valueTestId={"summary-target-points-value"}
              />
            </div>
            <PointsEarnedMessage targetPointsReached={targetPointsReached} />
          </div>

          {rules ? <ProjectInfoContainer rules={rules} /> : null}

          <div className={classes.categoryContainer}>
            <div
              className={clsx("space-between", classes.categoryHeaderContainer)}
            >
              <span className={classes.categoryHeader}>
                TDM STRATEGIES SELECTED
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
                  <div className={classes.rule}>
                    <div className={classes.ruleName}>
                      User-Defined Strategy Details:
                    </div>
                  </div>
                  <div
                    className={clsx("border-gray", classes.summaryContainer)}
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
                value={level.value.toString()}
                valueTestId={"summary-project-level-value"}
              />
              <LandUses rules={rules} />
              {rulesNotEmpty
                ? specificationRules.map(rule => {
                    return (
                      <ProjectDetail
                        rule={rule}
                        valueTestId={""}
                        key={rule.id}
                      />
                    );
                  })
                : null}
              <ProjectDetail
                rule={parkingProvided}
                value={numberWithCommas(roundToTwo(parkingProvided.value))}
                valueTestId={""}
              />
              <ProjectDetail
                rule={parkingRequired}
                value={numberWithCommas(roundToTwo(parkingRequired.value))}
                valueTestId={""}
              />
              <ProjectDetail
                rule={parkingRatio}
                value={Math.floor(parkingRatio.value).toString()}
                valueTestId={"summary-parking-ratio-value"}
              />
              {projectDescription &&
              projectDescription.value &&
              projectDescription.value.length > 0 ? (
                <div>
                  <div className={classes.rule}>
                    <div className={classes.ruleName}>
                      {projectDescription.name}:
                    </div>
                  </div>
                  <div
                    className={clsx("border-gray", classes.summaryContainer)}
                  >
                    {projectDescription.value}
                  </div>
                </div>
              ) : null}
            </div>
            <div className={classes.tempTextContainer}>
              <span className={classes.tempText}>
                The ordinances behind this TDM calculator are still in public
                comment. No submission is possible at this time.
              </span>
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
