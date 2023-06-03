import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import {
  numberWithCommas,
  getRule,
  roundToTwo
} from "../ProjectWizard/helpers";
import ProjectDetail from "../ProjectWizard/WizardPages/ProjectSummary/ProjectDetail";
import MeasureSelected from "../ProjectWizard/WizardPages/ProjectSummary/MeasureSelected";
import LandUses from "../ProjectWizard/WizardPages/ProjectSummary/LandUses";
import ProjectInfo from "../ProjectWizard/WizardPages/ProjectSummary/ProjectInfo";
import ProjectInfoList from "../ProjectWizard/WizardPages/ProjectSummary/ProjectInfoList";
import PdfResult from "./PdfResult";
import PdfFooter from "./PdfFooter";
import logo from "../../images/ladot.png";

const useStyles = createUseStyles({
  Pdf: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    minWidth: "85vw",
    margin: "50px auto"
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
  },
  logo: {
    height: "1.5em",
    marginBottom: "-.25em",
    padding: 0,
    backgroundColor: "#FFFFFF"
  },
  projectInfoDetailsContainer: {
    paddingTop: "20px",
    paddingLeft: "12px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
    minHeight: "55px",
    rowGap: "1.1rem"
  },
  textProjectInfoHeaderAddress: {
    color: "rgba(15, 41, 64, .5)",
    fontSize: "16px",
    fontFamily: "Calibri Bold"
  },
  "@media (max-width: 768px)": {
    logoContainer: {
      justifySelf: "start"
    }
  }
});

// eslint-disable-next-line react/display-name
export const PdfPrint = forwardRef((props, ref) => {
  const classes = useStyles();
  const { rules, dateModified } = props;

  const level = getRule(rules, "PROJECT_LEVEL");
  const targetPoints = getRule(rules, "TARGET_POINTS_PARK");
  const earnedPoints = getRule(rules, "PTS_EARNED");
  const userDefinedStrategy = getRule(rules, "STRATEGY_APPLICANT");
  const parkingProvided = getRule(rules, "PARK_SPACES");
  const projectDescription = getRule(rules, "PROJECT_DESCRIPTION");
  const parkingRatio = getRule(rules, "CALC_PARK_RATIO");
  const parkingRequired = getRule(rules, "PARK_REQUIREMENT");
  const projectName = getRule(rules, "PROJECT_NAME");
  const projectAddress = getRule(rules, "PROJECT_ADDRESS");
  const buildingPermit = getRule(rules, "BUILDING_PERMIT");
  const caseNumberLADOT = getRule(rules, "CASE_NO_LADOT");
  const caseNumberPlanning = getRule(rules, "CASE_NO_PLANNING");
  const parcelNumbers = getRule(rules, "APN");
  const versionNumber = getRule(rules, "VERSION_NO");

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

  const rulesNotEmpty = rules && rules.length > 0;

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

  return (
    <div ref={ref} className={clsx("tdm-wizard-review-page", classes.Pdf)}>
      <h1>
        <img
          className={classes.logo}
          src={logo}
          alt="LA Department of Transportation Logo"
        />
        {""} | TDM Calculation Project Summary
      </h1>
      <section className={classes.categoryContainer}>
        <div className={clsx("space-between", classes.categoryHeaderContainer)}>
          <span className={classes.categoryHeader}>PROJECT NAME</span>
          {projectName && projectName.value ? (
            <span className={classes.textProjectInfoHeaderAddress}>
              {projectName.value}
            </span>
          ) : null}
        </div>
        <div className={classes.projectInfoDetailsContainer}>
          {projectAddress && (
            <ProjectInfo name={"ADDRESS:"} rule={projectAddress} />
          )}
          {parcelNumbers.value ? (
            <ProjectInfoList name={"PARCEL # (AIN)"} rule={parcelNumbers} />
          ) : null}
          {buildingPermit && (
            <ProjectInfo name={buildingPermit.name} rule={buildingPermit} />
          )}
          {versionNumber && (
            <ProjectInfo name={versionNumber.name} rule={versionNumber} />
          )}
          {caseNumberPlanning && (
            <ProjectInfo
              name={caseNumberPlanning.name}
              rule={caseNumberPlanning}
            />
          )}
          {caseNumberLADOT && (
            <ProjectInfo name={caseNumberLADOT.name} rule={caseNumberLADOT} />
          )}
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
        <LandUses rules={rules} />
        {rulesNotEmpty
          ? specificationRules.map(rule => {
              return (
                <ProjectDetail rule={rule} valueTestId={""} key={rule.id} />
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
              <div className={classes.ruleName}>{projectDescription.name}:</div>
            </div>
            <div className={clsx("border-gray", classes.summaryContainer)}>
              {projectDescription.value}
            </div>
          </div>
        ) : null}
      </section>
      <section className={classes.categoryContainer}>
        <div className={clsx("space-between", classes.categoryHeaderContainer)}>
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
              <div className={clsx("border-gray", classes.summaryContainer)}>
                {userDefinedStrategy.comment}
              </div>
            </div>
          ) : null}
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
PdfPrint.propTypes = {
  rules: PropTypes.array,
  account: PropTypes.object,
  projectId: PropTypes.number,
  loginId: PropTypes.number,
  dateModified: PropTypes.string || null
};
