import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClock } from "@fortawesome/free-solid-svg-icons";
// import Loader from "react-loader";

// numberWithCommas,
// roundToTwo
// import { getRule } from "../ProjectWizard/helpers";

// import ProjectInfoContainer from "../ProjectWizard/WizardPages/ProjectSummary/ProjectInfoContainer";
// import ProjectDetail from "../ProjectWizard/WizardPages/ProjectSummary/ProjectDetail";
// import MeasureSelected from "../ProjectWizard/WizardPages/ProjectSummary/MeasureSelected";
// import PointsEarnedMessage from "../ProjectWizard/WizardPages/ProjectSummary/PointsEarnedMessage";
// import LandUses from "../ProjectWizard/WizardPages/ProjectSummary/LandUses";
// import Result from "../ProjectWizard/WizardPages/ProjectSummary/Result";
import PdfDate from "./PdfDate";

const useStyles = createUseStyles({
  Pdf: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    minWidth: "80vw",
    margin: "50px auto"
  },
  success: {
    color: "#A7C539"
  },
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
    padding: "12px"
  },
  categoryHeader: {
    fontSize: "16px",
    fontFamily: "Oswald",
    fontWeight: "700"
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
    fontFamily: "Oswald",
    fontWeight: "500",
    fontSize: "12px",
    color: "#0F2940",
    paddingTop: "5px",
    marginRight: "31px"
  },
  summaryContainer: {
    display: "flex",
    minWidth: "180px",
    maxWidth: "100%",
    marginTop: "4px",
    padding: "12px"
  }
});

// eslint-disable-next-line react/display-name
export const Pdf = forwardRef((props, ref) => {
  const classes = useStyles();
  // const { rules, ProjectDetail } = props;

  // const parkingRequired = getRule(rules, "PARK_REQUIREMENT");
  // const parkingProvided = getRule(rules, "PARK_SPACES");
  // const parkingRatio = getRule(rules, "CALC_PARK_RATIO");
  // const projectDescription = getRule(rules, "PROJECT_DESCRIPTION");
  // const level = getRule(rules, "PROJECT_LEVEL");
  // const targetPoints = getRule(rules, "TARGET_POINTS_PARK");
  // const earnedPoints = getRule(rules, "PTS_EARNED");

  // const userDefinedStrategy = getRule(rules, "STRATEGY_APPLICANT");

  // Note: a rule is not effective if the value is any falsey value or "0"
  // const measureRules =
  //   rules &&
  //   rules.filter(
  //     rule =>
  //       rule.category === "measure" &&
  //       rule.used &&
  //       rule.display &&
  //       rule.calculationPanelId !== 10 &&
  //       (!!(rule.value && rule.value !== "0") ||
  //         !!(rule.calcValue && rule.calcValue !== "0"))
  //   );

  // const specificationRules =
  //   rules &&
  //   rules.filter(
  //     rule =>
  //       rule.category === "input" &&
  //       rule.used &&
  //       rule.display &&
  //       rule.calculationPanelId !== 31 &&
  //       (!!(rule.value && rule.value !== "0") ||
  //         !!(rule.calcValue && rule.calcValue !== "0"))
  //   );

  // const loading =
  //   !level &&
  //   !parkingRatio &&
  //   !targetPoints &&
  //   !earnedPoints &&
  //   rules &&
  //   !rules.length &&
  //   !parkingRequired &&
  //   !parkingProvided;

  // const targetPointsReached =
  //   earnedPoints &&
  //   Math.round(earnedPoints.value) >= Math.round(targetPoints.value);

  // const rulesNotEmpty = rules && rules.length > 0;

  // const earnedPointsBorderStyle = targetPointsReached
  //   ? classes.successBorder
  //   : classes.failureBorder;

  return (
    <div ref={ref} className={clsx("tdm-wizard-review-page", classes.Pdf)}>
      <h1 className="tdm-wizard-page-title">TDM Calculation Project Summary</h1>
      <section className={classes.categoryContainer}>
        <div className={clsx("space-between", classes.categoryHeaderContainer)}>
          <span className={classes.categoryHeader}>PROJECT NAME</span>
        </div>
      </section>
      <section className={classes.categoryContainer}>
        <div className={clsx("space-between", classes.categoryHeaderContainer)}>
          <span className={classes.categoryHeader}>PROJECT DETAILS</span>
        </div>
      </section>
      <section className={classes.categoryContainer}>
        <div className={clsx("space-between", classes.categoryHeaderContainer)}>
          <span className={classes.categoryHeader}>
            TDM STRATEGIES SELECTED
          </span>
          <span className={classes.earnedPoints}>EARNED POINTS</span>
        </div>
      </section>
      <section className={classes.categoryContainer}>
        <div className={clsx("space-between", classes.categoryHeaderContainer)}>
          <span className={classes.categoryHeader}>RESULTS</span>
        </div>
        <div className={clsx("space-between", classes.resultsContainer)}>
          {/* <Result
            rule={earnedPoints}
            borderStyle={earnedPointsBorderStyle}
            valueTestId={"summary-earned-points-value"}
          />
          <Result
            rule={targetPoints}
            borderStyle={classes.normalBorder}
            valueTestId={"summary-target-points-value"}
          /> */}
        </div>
        {/* <PointsEarnedMessage targetPointsReached={targetPointsReached} /> */}
      </section>
      <section>
        <PdfDate />
      </section>
    </div>
  );
});
Pdf.propTypes = {
  rules: PropTypes.array,
  account: PropTypes.object,
  projectId: PropTypes.number,
  loginId: PropTypes.number,
  dateModified: PropTypes.string || null
};
