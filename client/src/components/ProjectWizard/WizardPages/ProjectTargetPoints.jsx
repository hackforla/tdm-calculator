import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import RuleCalculationPanels from "../RuleCalculation/RuleCalculationPanels";
import ParkingProvidedRuleInput from "../RuleInput/ParkingProvidedRuleInput";

const useStyles = createUseStyles(theme => ({
  projectBox: {
    backgroundColor: "#E5EAF0",
    "& .top": {
      backgroundColor: "#002E6D",
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
    "& .bottom": {
      paddingBottom: "0.5rem",
      fontFamily: "Arial",
      fontWeight: "bold",
      fontSize: 22
    }
  },
  PLValue: {
    ...theme.typography.largeText,
    color: theme.colors.primary.white,
    marginLeft: "0.4em",
    fontSize: 40,
    fontWeight: "bold",
    width: "2em",
    position: "relative",
    bottom: 6,
    textAlign: "right"
  },
  PLLabel: {
    ...theme.typography.heading2,
    color: theme.colors.primary.white,
    flex: 2,
    maxWidth: "55%",
    textAlign: "right"
  }
}));

function ProjectTargetPoints(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { rules, onInputChange, onParkingProvidedChange, resetProject } = props;
  const projectLevel = rules.find(e => e.code === "LEVEL");
  const targetValue = rules.find(e => e.code === "INPUT_TARGET_POINTS_PARK");

  const parkingProvidedRuleOnly = rules.find(r => r.code === "PARK_SPACES");
  const rulesInBox = rules.filter(
    r => r.code === "INPUT_PARK_REQUIREMENT" || r.code === "PARK_RATIO"
  );

  return (
    <div>
      <h1 style={theme.typography.heading1}>
        <span>Calculate Project TDM Target Points</span>
      </h1>
      <h2 style={theme.typography.subHeading}>
        <span>
          Target Points (left panel) may be adjusted based on parking spaces
          entered below.
        </span>
      </h2>
      {parkingProvidedRuleOnly && (
        <ParkingProvidedRuleInput
          rule={parkingProvidedRuleOnly}
          onInputChange={onParkingProvidedChange}
          resetProject={resetProject}
        />
      )}
      <div className={classes.projectBox}>
        <div className="top">
          <span className={classes.PLLabel}>Your project level </span>
          <span className={classes.PLValue}>
            {(projectLevel && projectLevel.calcValue) || ""}
          </span>
        </div>
        <div className="top">
          <span className={classes.PLLabel}>Your target points </span>
          <span className={classes.PLValue}>
            {(targetValue && targetValue.calcValue) || ""}
          </span>
        </div>
        <div className="bottom">
          <RuleCalculationPanels
            rules={rulesInBox}
            onInputChange={onInputChange}
            suppressHeader
          />
        </div>
      </div>
    </div>
  );
}
ProjectTargetPoints.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onParkingProvidedChange: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired
};

export default ProjectTargetPoints;
