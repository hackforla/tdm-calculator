import React, { useEffect } from "react";
import PropTypes from "prop-types";
import RuleStrategyPanels from "../RuleStrategy/RuleStrategyPanels";
import InfoBox from "../InfoBox";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
import useLocalStorage from "../../useLocalStorage";
import { createUseStyles } from "react-jss";
import ResetButtons from "./ResetButtons";

const useStyles = createUseStyles({
  pkgSelectContainer: {
    display: "grid",
    gridTemplateColumns: "[h-start] auto [h-end] 35%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  alignLeft: {
    gridColumn: "h-start",
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: "2em"
  },
  alignRight: {
    gridColumn: "h-end",
    justifyContent: "flex-end"
  }
});
function ProjectMeasure(props) {
  const {
    projectLevel,
    rules,
    onInputChange,
    onCommentChange,
    onPkgSelect,
    uncheckAll,
    resetProject,
    initializeStrategies,
    allowResidentialPackage,
    allowSchoolPackage,
    residentialPackageSelected,
    schoolPackageSelected
  } = props;

  const classes = useStyles();

  useEffect(() => {
    initializeStrategies();
  });

  const [displayInfoBox, setDisplayInfoBox] = useLocalStorage(
    "displayBox",
    true
  );

  return (
    <div>
      <h1 className="tdm-wizard-page-title">
        Transportation Demand Strategies
      </h1>
      <h3 className="tdm-wizard-page-subtitle">
        Select strategies to earn TDM points
        <button
          onClick={() => setDisplayInfoBox(true)}
          style={{
            visibility: displayInfoBox ? "hidden" : "visible",
            height: 10,
            padding: 0,
            marginTop: 0,
            marginBottom: 0,
            marginRight: "auto",
            marginLeft: "1em",
            backgroundColor: "transparent",
            borderStyle: "none",
            cursor: "pointer"
          }}
        >
          <ToolTipIcon size="medium" />
        </button>
      </h3>
      <InfoBox
        displayStatus={displayInfoBox}
        handleClick={() => setDisplayInfoBox(false)}
      >
        <ToolTipIcon size="medium" /> For detailed information, hover the mouse
        cursor over the terminology.
      </InfoBox>
      <div className={classes.pkgSelectContainer}>
        <div className={classes.alignLeft}>
          {allowResidentialPackage ? (
            <div style={{ marginRight: "1em" }}>
              <label
                style={{
                  fontWeight: "600",
                  paddingRight: "1em"
                }}
                htmlFor="packageResidential"
              >
                Residential or Employment Package
                <input
                  type="checkbox"
                  style={{
                    verticalAlign: "bottom",
                    position: "relative",
                    top: "0",
                    marginLeft: "0.5em"
                  }}
                  value={true}
                  checked={residentialPackageSelected()}
                  onChange={e => onPkgSelect("Residential", e.target.checked)}
                  name="packageResidential"
                  id="packageResidential"
                />
              </label>
            </div>
          ) : null}
          {allowSchoolPackage ? (
            <div>
              <label
                style={{
                  fontWeight: "600",
                  paddingRight: "1em"
                }}
              >
                School Package
                <input
                  type="checkbox"
                  value={true}
                  style={{
                    verticalAlign: "bottom",
                    position: "relative",
                    top: "0",
                    marginLeft: "0.5em"
                  }}
                  checked={schoolPackageSelected()}
                  onChange={e => onPkgSelect("School", e.target.checked)}
                  name="packageSchool"
                  id="packageSchool"
                />
              </label>
            </div>
          ) : null}
        </div>

        <ResetButtons
          className={classes.alignRight}
          uncheckAll={uncheckAll}
          resetProject={resetProject}
        />
      </div>
      <RuleStrategyPanels
        projectLevel={projectLevel}
        rules={rules}
        onInputChange={onInputChange}
        onCommentChange={onCommentChange}
      />
    </div>
  );
}
ProjectMeasure.propTypes = {
  projectLevel: PropTypes.number,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      calculationPanelId: PropTypes.number.isRequired,
      panelName: PropTypes.string.isRequired,
      calcUnits: PropTypes.string
    })
  ).isRequired,
  landUseRules: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onPkgSelect: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  initializeStrategies: PropTypes.func.isRequired,
  allowResidentialPackage: PropTypes.bool.isRequired,
  allowSchoolPackage: PropTypes.bool.isRequired,
  residentialPackageSelected: PropTypes.func,
  schoolPackageSelected: PropTypes.func
};

export default ProjectMeasure;
