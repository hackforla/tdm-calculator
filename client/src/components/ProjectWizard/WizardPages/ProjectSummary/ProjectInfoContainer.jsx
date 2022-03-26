import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ProjectInfo from "./ProjectInfo";
import { getRule } from "../../helpers";
import ProjectInfoList from "./ProjectInfoList";

const useStyles = createUseStyles({
  projectInfoContainer: {
    paddingBottom: "20px",
    margin: "70px auto 0",
    width: "100%",
    minHeight: "100px"
  },
  textProjectInfoHeader: {
    color: "#0F2940",
    fontSize: "24px",
    fontFamily: "Calibri Bold",
    paddingLeft: "12px",
    paddingRight: ".8em"
  },
  textProjectInfoHeaderAddress: {
    color: "rgba(15, 41, 64, .5)",
    fontSize: "24px",
    fontFamily: "Calibri Bold"
  },
  projectInfoDetailsContainer: {
    paddingTop: "6px",
    paddingLeft: "12px",
    height: "55px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%"
  },
  line: {
    margin: ".7em 0",
    border: "0",
    borderTop: "1px solid #E7EBF0"
  }
});

const ProjectInfoContainer = props => {
  const classes = useStyles();
  const { rules } = props;

  const projectName = getRule(rules, "PROJECT_NAME");
  const projectAddress = getRule(rules, "PROJECT_ADDRESS");

  const buildingPermit = getRule(rules, "BUILDING_PERMIT");
  const caseNumberLADOT = getRule(rules, "CASE_NO_LADOT");
  const caseNumberPlanning = getRule(rules, "CASE_NO_PLANNING");
  const parcelNumbers = getRule(rules, "APN");
  const versionNumber = getRule(rules, "VERSION_NO");

  return (
    <div className={classes.projectInfoContainer}>
      <div className={classes.projectInfoHeaderLine}>
        <span className={classes.textProjectInfoHeader}>PROJECT NAME:</span>
        {projectName && projectName.value ? (
          <span className={classes.textProjectInfoHeaderAddress}>
            {projectName.value}
          </span>
        ) : null}
      </div>
      <hr className={classes.line} />
      <div className={classes.projectInfoDetailsContainer}>
        {projectAddress && (
          <ProjectInfo name={"ADDRESS:"} rule={projectAddress} />
        )}
        <ProjectInfoList name={"PARCEL # (AIN)"} rule={parcelNumbers} />
        {buildingPermit && (
          <ProjectInfo name={buildingPermit.name} rule={buildingPermit} />
        )}
        {versionNumber && (
          <ProjectInfo name={versionNumber.name} rule={versionNumber} />
        )}
        {caseNumberPlanning && (
          <ProjectInfo
            name={caseNumberPlanning.name}
            rule={caseNumberPlanning}
          />
        )}
        {caseNumberLADOT && (
          <ProjectInfo name={caseNumberLADOT.name} rule={caseNumberLADOT} />
        )}
      </div>
    </div>
  );
};
ProjectInfoContainer.propTypes = {
  rules: PropTypes.array.isRequired
};

export default ProjectInfoContainer;
