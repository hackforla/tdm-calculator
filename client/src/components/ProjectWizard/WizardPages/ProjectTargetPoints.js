import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleCalculationPanels from "../RuleCalculation/RuleCalculationPanels";

const useStyles = createUseStyles({
  page4: {
    /*
    "& > div > div > div": {
      minWidth: 0,
      width: 460,
      margin: "0 auto 10px",
      left: "-100px",
      position: "relative",
      fontSize: 22,
      fontFamily: "Calibri Bold",
      "& label": {
        textAlign: "right",
        flexBasis: "80%"
      },
      "& div:last-child": {
        flexBasis: "20%"
      }
    },
    "& > div > div > div:first-child": {
      
      textAlign: "center",
      width: "auto",
      marginBottom: 20,
      marginTop: 20,
      display: "block",
      fontFamily: "Calibri",
      "& input": {
        fontSize: 16,
        height: 45,
        width: 426
      }
    
    }
  */
  },
  projectBox: {
    border: "2px solid #002E6D",
    "& h4": {
      backgroundColor: "#002E6D",
      color: "white",
      fontFamily: "Oswald, Calibri",
      fontSize: 22,
      textAlign: "center",
      padding: "22px 0"
    }
  }
});

function ProjectTargetPoints(props) {
  const classes = useStyles();
  const { rules, onInputChange } = props;
  const projectLevel = rules.find(e => e.id === 16);
  // removing the parking input rule to display it above the box
  const parkingInputIndex = rules.findIndex(e => e.id === 7);
  const parkingRule = rules.splice(parkingInputIndex, 1);
  console.log(parkingRule);
  return (
    <div className={classes.page4}>
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
          Your project level: {(projectLevel && projectLevel.calcValue) || ""}
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
