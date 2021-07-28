import React, { useEffect } from "react";
import PropTypes from "prop-types";
import RuleStrategyPanels from "../RuleStrategy/RuleStrategyPanels";
import InfoBox from "../InfoBox";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
import useLocalStorage from "../../useLocalStorage";
import { createUseStyles } from "react-jss";

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
  unSelectButton: {
    marginLeft: "auto",
    marginRight: "1em",
    gridColumn: "h-end",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  },
  resetProjectButton: {
    marginLeft: "auto",
    marginRight: "1em",
    gridColumn: "h-end",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
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
    allowEmploymentPackage,
    residentialPackageSelected,
    employmentPackageSelected
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
            <div>
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

        <button className={classes.resetProjectButton} onClick={resetProject}>
          Reset Project
        </button>
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
  onPkgSelect: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  initializeStrategies: PropTypes.func.isRequired,
  allowResidentialPackage: PropTypes.bool.isRequired,
  allowEmploymentPackage: PropTypes.bool.isRequired,
  residentialPackageSelected: PropTypes.func,
  employmentPackageSelected: PropTypes.func
};

export default ProjectMeasure;
