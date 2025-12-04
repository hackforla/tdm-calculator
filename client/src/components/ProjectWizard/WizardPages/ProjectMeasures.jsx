import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import PackagePanel from "../PackagePanel/PackagePanel";
import RuleStrategyPanels from "../RuleStrategy/RuleStrategyPanels";
import { createUseStyles, useTheme } from "react-jss";
import ResetButtons from "./ResetButtons";
import { MdCheckCircle } from "react-icons/md";

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
  },
  packageBanner: {
    margin: "0.5em auto",
    padding: "1em 0em",
    width: "34em",
    background: "#FFFFFF",
    boxSizing: "border-box",
    boxShadow: "2px 2px 4px 2px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  packageBannerIcon: {
    fontSize: "24px",
    margin: "0 0.25em",
    color: ({ theme }) => theme.colorPrimary
  },
  packageBannerText: {
    fontSize: "20px",
    margin: ".25em"
  }
});
function ProjectMeasure(props) {
  const {
    projectLevel,
    rules,
    onInputChange,
    onCommentChange,
    uncheckAll,
    resetProject,
    initializeStrategies
  } = props;

  const theme = useTheme();
  const classes = useStyles({ theme });

  useEffect(() => {
    initializeStrategies();
  });

  const allowPackages = () => {
    return rules.some(r => r.calculationPanelId == 27 && !!r.display);
  };

  return (
    <div>
      <h1 style={theme.typography.heading1}>
        <span>Select TDM Strategies</span>
      </h1>
      <div style={theme.typography.subHeading}>
        Select TDM strategies to earn points to reach the Target (left panel).
      </div>
      {allowPackages() && (
        <>
          <div className={classes.packageBanner}>
            <MdCheckCircle className={classes.packageBannerIcon} />
            <div
              className={classes.packageBannerText}
              style={theme.typography.subHeading}
            >
              You qualify for a bonus package to earn 1 extra point!
            </div>
          </div>
        </>
      )}
      <div style={{ marginTop: "1em", marginBottom: "1em" }}>
        <ResetButtons
          uncheckAll={uncheckAll}
          resetProject={resetProject}
          rightAlignStyle={{ marginRight: "0.4em" }}
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
  onInputChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  uncheckAll: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  initializeStrategies: PropTypes.func.isRequired
};

export default ProjectMeasure;
