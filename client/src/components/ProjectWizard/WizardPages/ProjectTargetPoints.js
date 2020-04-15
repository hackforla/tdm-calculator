import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleCalculationPanels from "../RuleCalculation/RuleCalculationPanels";

const useStyles = createUseStyles({
  projectBox: {
    border: "2px solid #002E6D",
    "& h4": {
      backgroundColor: "#002E6D",
      color: "white",
      fontFamily: "Oswald, Calibri",
      fontSize: 22,
      textAlign: "center",
      padding: "22px 0"
    },
    "& > div": {
      marginTop: 30,
      marginBottom: 30,
      fontWeight: "bold",
      fontSize: 22
    }
  },
  PLValue: {
    marginLeft: "2em",
    fontSize: 50,
    fontWeight: "bold"
  },
  PLLabel: {
    position: "relative",
    bottom: 6
  }
});

function ProjectTargetPoints(props) {
  const classes = useStyles();
  const { rules, onInputChange } = props;
  const projectLevel = rules.find(e => e.id === 16);
  // removing the parking input rule to display it above the box
  const parkingInputIndex = rules.findIndex(e => e.id === 7);
  const parkingRule = rules.splice(parkingInputIndex, 1);
  return (
    <div>
      <h1 className="tdm-wizard-page-title">Calculate TDM Target Points</h1>
      <h3 className="tdm-wizard-page-subtitle">
        Enter the amount of parking spaces you will provide to determine your
        TDM target number
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
        <RuleCalculationPanels
          rules={rules}
          onInputChange={onInputChange}
          suppressHeader
        />
      </div>
    </div>
  );
}
ProjectTargetPoints.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default ProjectTargetPoints;
