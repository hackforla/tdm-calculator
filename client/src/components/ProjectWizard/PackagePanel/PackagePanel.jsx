import React from "react";
import PropTypes from "prop-types";
import RulePackage from "./RulePackage";
import PanelHeader from "./PanelHeader";
import Loader from "react-loader";
import { createUseStyles, useTheme } from "react-jss";
import { TooltipResidential, TooltipSchool } from "./PackageTooltips";

const useStyles = createUseStyles({
  panelContainer: {
    margin: "0.75em"
  },

  strategyName: {
    flexGrow: "1",
    flexShrink: "1",
    margin: "0"
  },
  points: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1"
  },
  loaderContainer: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center"
  },
  packageListContainer: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center"
  },
  packageList: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "100%",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: "transparent"
  },
  // calculationArea: {
  //   flexGrow: "0",
  //   flexShrink: "0",
  //   flexBasis: "20%",

  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-stretch"
  // },
  calculationArea: {
    position: "absolute",
    right: "0.75em",
    top: "0.4em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  calculationAreaColumn: {
    flexBasis: "50%",
    marginLeft: "0.5em",
    marginRight: "0.5em",
    minWidth: "65px",
    padding: "0",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1"
  }
});

const PackagePanel = props => {
  const {
    rules,
    onPkgSelect,
    residentialChecked,
    schoolChecked,
    allowResidentialPackage,
    allowSchoolPackage
  } = props;
  const bonusRule = rules.find(r => r.code === "PKG_BONUS");
  const theme = useTheme();
  const classes = useStyles({ theme });
  const ttResidential = TooltipResidential();
  const ttSchool = TooltipSchool();
  const { calcMinValue, calcMaxValue, calcUnits, calcValue } = bonusRule;
  const calculationUnits = calcUnits ? calcUnits : "";

  return (
    <div className={classes.panelContainer}>
      {rules && rules.length > 0 ? (
        <>
          <PanelHeader>
            <h4 className={classes.strategyName}>{rules[0].panelName}</h4>
            <div className={classes.points}>Possible</div>
            <div className={classes.points}>Earned</div>
          </PanelHeader>

          <div className={classes.packageList}>
            {allowResidentialPackage && (
              <RulePackage
                checked={residentialChecked}
                onPkgSelect={isChecked => onPkgSelect("Residential", isChecked)}
                packageTooltip={ttResidential}
                name={"Residential or Employment Package"}
              />
            )}

            {allowSchoolPackage && (
              <RulePackage
                checked={schoolChecked}
                onPkgSelect={isChecked => onPkgSelect("School", isChecked)}
                packageTooltip={ttSchool}
                name={"School Package"}
              />
            )}
            <div
              className={classes.calculationArea}
              style={
                allowSchoolPackage && allowResidentialPackage
                  ? { top: "0.9em" }
                  : null
              }
            >
              <div className={classes.calculationAreaColumn}>
                {calcMinValue === calcMaxValue
                  ? `${Math.round(calcMinValue).toString()} ${calculationUnits}`
                  : calcMinValue < calcMaxValue
                    ? `${Math.round(calcMinValue).toString()}-${Math.round(
                        calcMaxValue
                      ).toString()} ${calculationUnits}`
                    : null}
              </div>
              <div className={classes.calculationAreaColumn}>
                {`${
                  calcValue
                    ? Math.round(calcValue * 100) / 100 +
                        " " +
                        calculationUnits || ""
                    : ""
                } `}
              </div>
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

PackagePanel.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      calculationPanelId: PropTypes.number.isRequired,
      panelName: PropTypes.string.isRequired
    })
  ).isRequired,
  residentialChecked: PropTypes.bool,
  schoolChecked: PropTypes.bool,
  onPkgSelect: PropTypes.func.isRequired,
  allowResidentialPackage: PropTypes.bool,
  allowSchoolPackage: PropTypes.bool
};

export default PackagePanel;
