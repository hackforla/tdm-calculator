import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { getRule } from "../ProjectWizard/helpers";
import ProjectDetail from "../ProjectWizard/WizardPages/ProjectSummary/ProjectDetail";
import PdfResult from "./PdfResult";
import PdfFooter from "./PdfFooter";

const useStyles = createUseStyles({
  Pdf: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    minWidth: "85vw",
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
  pdfResultsContainer: {
    display: "block",
    padding: "10px 0",
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
  const { rules, dateModified } = props;

  const level = getRule(rules, "PROJECT_LEVEL");
  const targetPoints = getRule(rules, "TARGET_POINTS_PARK");
  const earnedPoints = getRule(rules, "PTS_EARNED");

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
        <div className={classes.measuresContainer}>
          <ProjectDetail
            rule={level}
            value={level.value.toString()}
            valueTestId={"summary-project-level-value"}
          />
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
        <div className={clsx("space-between", classes.pdfResultsContainer)}>
          <PdfResult
            rule={targetPoints}
            valueTestId={"summary-pdf-target-points-value"}
          />
          <PdfResult
            rule={earnedPoints}
            valueTestId={"summary-pdf-earned-points-value"}
          />
        </div>
      </section>
      <PdfFooter dateModified={dateModified} />
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
