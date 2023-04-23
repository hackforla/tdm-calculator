import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ProjectInfo from "./ProjectInfo";
import { getRule } from "../../helpers";
import ProjectInfoList from "./ProjectInfoList";

const useStyles = createUseStyles({
  projectInfoContainer: {
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
    minHeight: "55px",
    rowGap: "1.1rem"
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

  const projectAddress = getRule(rules, "PROJECT_ADDRESS");

  const buildingPermit = getRule(rules, "BUILDING_PERMIT");
  const caseNumberLADOT = getRule(rules, "CASE_NO_LADOT");
  const caseNumberPlanning = getRule(rules, "CASE_NO_PLANNING");
  const parcelNumbers = getRule(rules, "APN");
  const versionNumber = getRule(rules, "VERSION_NO");

  return (
    <div className={classes.projectInfoContainer}>
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
