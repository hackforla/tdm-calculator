import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleCalculationPanels from "../RuleCalculation/RuleCalculationPanels";
import Level0Page from "../WizardPages/Level0Page";
import ParkingProvidedRuleInput from "../RuleInput/ParkingProvidedRuleInput";

const useStyles = createUseStyles({
  projectBox: {
    backgroundColor: "#E5EAF0",
    "& h4": {
      backgroundColor: "#002E6D",
      color: "white",
      fontFamily: "Oswald, Calibri",
      fontSize: 22,
      padding: "12px 0",
      display: "flex",
      margin: 0,
      "&:first-of-type": {
        paddingTop: 30
      },
      "&:last-of-type": {
        paddingBottom: 30
      }
    },
    "& > div": {
      paddingBottom: 20,
      fontFamily: "Arial",
      fontWeight: "bold",
      fontSize: 22
    }
  },
  PLValue: {
    marginLeft: "1.5em",
    fontSize: 40,
    fontWeight: "bold",
    width: "2em",
    position: "relative",
    bottom: 6
  },
  PLLabel: {
    flex: 2,
    maxWidth: "55%",
    textAlign: "right"
  }
});

function ProjectTargetPoints(props) {
  const classes = useStyles();
  const { rules, onInputChange, isLevel0 } = props;
  const projectLevel = rules.find(e => e.code === "LEVEL");
  const targetValue = rules.find(e => e.code === "INPUT_TARGET_POINTS_PARK");

  const parkingProvidedRuleOnly = rules.find(r => r.code === "PARK_SPACES");
  const rulesInBox = rules.filter(
    r => r.code === "INPUT_PARK_REQUIREMENT" || r.code === "PARK_RATIO"
  );

  return (
    <>
      <Level0Page isLevel0={isLevel0} />

      {projectLevel && projectLevel.calcValue > 0 && (
        <div>
          <h1 className="tdm-wizard-page-title">Calculate TDM Target Points</h1>
          <h3 className="tdm-wizard-page-subtitle">
            Enter the amount of parking spaces you will provide to determine
            your TDM target number
          </h3>
          <ParkingProvidedRuleInput
            rule={parkingProvidedRuleOnly}
            onInputChange={onInputChange}
          />
          <div className={classes.projectBox}>
            <h4>
              <span className={classes.PLLabel}>Your project level </span>
              <span className={classes.PLValue}>
                {(projectLevel && projectLevel.calcValue) || ""}
              </span>
            </h4>
            <h4>
              <span className={classes.PLLabel}>Your target points </span>
              <span className={classes.PLValue}>
                {(targetValue && targetValue.calcValue) || ""}
              </span>
            </h4>
            <RuleCalculationPanels
              rules={rulesInBox}
              onInputChange={onInputChange}
              suppressHeader
            />
          </div>
        </div>
      )}
    </>
  );
}
ProjectTargetPoints.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  isLevel0: PropTypes.bool.isRequired
};

export default ProjectTargetPoints;
