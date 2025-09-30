import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ProjectInfo from "./ProjectInfo";
import { getRule } from "../../helpers";
import ProjectInfoList from "./ProjectInfoList";
import { useParams } from "react-router-dom";
import { formatId } from "helpers/util";

const useStyles = createUseStyles({
  projectInfoContainer: {
    margin: "70px auto 0",
    width: "100%",
    minHeight: "100px"
  },
  textProjectInfoHeader: {
    color: "#000000",
    fontSize: "24px",
    fontFamily: "Calibri",
    fontWeight: 700,
    paddingLeft: "12px",
    paddingRight: ".8em"
  },
  textProjectInfoHeaderAddress: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: "24px",
    fontFamily: "Calibri",
    fontWeight: "700"
  },
  projectInfoDetailsContainer: {
    paddingTop: "6px",
    paddingLeft: "12px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "2rem",
    maxWidth: "100%",
    minHeight: "55px",
    rowGap: "1.1rem"
  },
  line: {
    margin: ".7em 0",
    border: "0",
    borderTop: "1px solid #E7EBF0"
  },
  projectIdRight: {
    gridColumn: "2"
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

  const params = useParams();
  const projectID = formatId(Number(params.projectId));

  return (
    <div className={classes.projectInfoContainer}>
      <hr className={classes.line} />
      <div className={classes.projectInfoDetailsContainer}>
        {projectAddress && (
          <ProjectInfo name={projectAddress.name} rule={projectAddress} />
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
        <div className={classes.projectIdRight}>
          {projectID && (
            <ProjectInfo name="Project ID #" rule={{ value: projectID }} />
          )}
        </div>
      </div>
    </div>
  );
};
ProjectInfoContainer.propTypes = {
  rules: PropTypes.array.isRequired
};

export default ProjectInfoContainer;
