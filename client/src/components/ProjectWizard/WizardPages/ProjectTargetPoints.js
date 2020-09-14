import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleCalculationPanels from "../RuleCalculation/RuleCalculationPanels";
import Level0Page from "../WizardPages/Level0Page";

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
    marginLeft: ".5em",
    fontSize: 40,
    fontWeight: "bold",
    width: "2em",
    textAlign: "right",
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
  const projectLevel = rules.find(e => e.id === 16);
  const targetValue = rules.find(e => e.id === 237);

  // removing the parking input rule to display it above the box
  const parkingInputIndex = rules.findIndex(e => e.id === 7);
  const parkingRule = rules.splice(parkingInputIndex, 1);

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
          <RuleCalculationPanels
            rules={parkingRule}
            onInputChange={onInputChange}
            suppressHeader
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
              rules={rules}
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
  classes: PropTypes.object.isRequired,
  isLevel0: PropTypes.bool.isRequired
};

export default ProjectTargetPoints;
