import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ProjectInfo from "./ProjectInfo";
import { getRule } from "../../helpers";

const useStyles = createUseStyles({
  projectInfoContainer: {
    margin: "70px auto 0",
    width: "100%",
    minHeight: "100px"
  },
  textProjectInfoHeader: {
    color: "#0F2940",
    fontSize: "24px",
    fontFamily: "Calibri Bold"
  },
  textProjectInfoHeaderAddress: {
    color: "#515151",
    fontSize: "24px",
    fontFamily: "Calibri"
  },
  projectInfoDetailsContainer: {
    marginTop: "13px",
    paddingTop: "13px",
    height: "55px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%"
  }
});

const ProjectInfoContainer = props => {
  const classes = useStyles();
  const { rules } = props;

  const projectName = getRule(rules, "PROJECT_NAME");
  const projectAddress = getRule(rules, "PROJECT_ADDRESS");

  const buildingPermit = getRule(rules, "BUILDING_PERMIT");
  const caseNumber = getRule(rules, "CASE_NO_LADOT");
  const parcelNumber = getRule(rules, "APN");
  const versionNumber = getRule(rules, "VERSION_NO");

  return (
    <div className={classes.projectInfoContainer}>
      {projectName && projectName.value ? (
        <span className={classes.textProjectInfoHeader}>
          {projectName.value}
        </span>
      ) : null}
      {projectAddress && projectAddress.value ? (
        <span className={classes.textProjectInfoHeaderAddress}>
          {" "}
          {projectAddress.value}
        </span>
      ) : null}
      <div className={classes.projectInfoDetailsContainer}>
        {buildingPermit && (
          <ProjectInfo name={buildingPermit.name} rule={buildingPermit} />
        )}
        <ProjectInfo name={"PARCEL # (AIN)"} rule={parcelNumber} />
        <ProjectInfo name={"CASE #"} rule={caseNumber} />
        <ProjectInfo name={"VERSION #"} rule={versionNumber} />
      </div>
    </div>
  );
};
ProjectInfoContainer.propTypes = {
  rules: PropTypes.array.isRequired
};

export default ProjectInfoContainer;
