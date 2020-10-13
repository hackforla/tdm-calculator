import React, { useEffect } from "react";
import PropTypes from "prop-types";
import RuleStrategyPanels from "../RuleStrategy/RuleStrategyPanels";
import InfoBox from "../InfoBox";
import ToolTipIcon from "../SidebarPoints/ToolTipIcon";
import useLocalStorage from "../../useLocalStorage";

function ProjectMeasure(props) {
  const {
    projectLevel,
    rules,
    onInputChange,
    onCommentChange,
    classes,
    onPkgSelect,
    uncheckAll,
    initializeStrategies,
    allowResidentialPackage,
    allowEmploymentPackage,
    residentialPackageSelected,
    employmentPackageSelected
  } = props;

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
          <ToolTipIcon
            circleStyle={{
              filter: "drop-shadow(0px 4px 2px rgba(0, 46, 109, 0.3))"
            }}
          />
        </button>
      </h3>
      <InfoBox
        displayStatus={displayInfoBox}
        handleClick={() => setDisplayInfoBox(false)}
      >
        <ToolTipIcon /> For detailed information, hover the mouse cursor over
        the terminology.
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
              >
                Residential Package
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
          {allowEmploymentPackage ? (
            <div className={classes.booleanInputContainer}>
              <label
                style={{
                  fontWeight: "600",
                  paddingRight: "1em"
                }}
              >
                Employment Package
                <input
                  type="checkbox"
                  value={true}
                  style={{
                    verticalAlign: "bottom",
                    position: "relative",
                    top: "0",
                    marginLeft: "0.5em"
                  }}
                  checked={employmentPackageSelected()}
                  onChange={e => onPkgSelect("Employment", e.target.checked)}
                  name="packageEmployment"
                  id="packageEmployment"
                />
              </label>
            </div>
          ) : null}
        </div>

        <button className={classes.unSelectButton} onClick={uncheckAll}>
          Reset All Strategies
        </button>
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
  classes: PropTypes.object.isRequired,
  onPkgSelect: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired,
  initializeStrategies: PropTypes.func.isRequired,
  allowResidentialPackage: PropTypes.bool.isRequired,
  allowEmploymentPackage: PropTypes.bool.isRequired,
  residentialPackageSelected: PropTypes.func,
  employmentPackageSelected: PropTypes.func
};

export default ProjectMeasure;
