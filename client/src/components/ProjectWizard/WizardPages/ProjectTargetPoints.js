import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import RuleInputPanels from "../RuleInput/RuleInputPanels";

const useStyles = createUseStyles({
  page4: {
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
      marginBottom: 74,
      marginTop: 40,
      left: "auto",
      display: "block",
      fontFamily: "Calibri",
      "& input": {
        fontSize: 16,
        height: 45,
        width: 426
      }
    }
  }
});

function ProjectTargetPoints(props) {
  const classes = useStyles();
  const { rules, onInputChange } = props;
  return (
    <div className={classes.page4}>
      <h1 className="tdm-wizard-page-title">Calculate TDM Target Points</h1>
      <h3 className="tdm-wizard-page-subtitle">
        Enter the # of parking spaces you intend to build to complete the Target
        Point calculation
      </h3>
      <RuleInputPanels
        rules={rules}
        onInputChange={onInputChange}
        suppressHeader
      />
    </div>
  );
}
ProjectTargetPoints.propTypes = {
  rules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default ProjectTargetPoints;
