import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import ContentContainer from "../Layout/ContentContainer";
import Button from "../Button/Button";
import SubmitSnapshotModal from "./SubmitSnapshotModal.jsx";
import SubmitSnapshotTable from "./SubmitSnapshotTable";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProjects from "../../hooks/useGetProjects";
import useCheckedProjectsStatusData from "../../hooks/useCheckedProjectsStatusData.js";
import UserContext from "../../contexts/UserContext";
import * as projectService from "../../services/project.service.js";
import fetchEngineRules from "../Projects/fetchEngineRules.js";

const useStyles = createUseStyles({
  pageTitle: {
    marginBottom: "16px",
    textAlign: "center"
  },
  subtitle: {
    marginTop: "0px",
    textAlign: "center",
    padding: 0
  },
  submitButton: {
    marginTop: "1em",
    alignSelf: "flex-end"
  },
  heading3: {
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "140%"
  },
  tableHead: {
    textAlign: "left"
  },
  tableCell: {
    padding: "0em 1em 0em 0em"
  }
});

const SubmitSnapshotPage = props => {
  const { contentContainerRef } = props;
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const email = userContext.account ? userContext.account.email : "";
  const navigate = useNavigate();
  const handleError = useErrorHandler(email, navigate);
  const [projects, setProjects] = useProjects(handleError);
  const [selectedProject, setSelectedProject] = useState(null);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [checkedProjectIds, setCheckedProjectIds] = useState([]);
  const checkedProjectsStatusData = useCheckedProjectsStatusData(
    checkedProjectIds,
    projects
  );
  const [projectData, setProjectData] = useState();

  // fetching rules for PDF
  useEffect(() => {
    const fetchRules = async () => {
      let project;

      if (
        checkedProjectIds.length === 1 ||
        Object.keys(checkedProjectsStatusData).length > 0
      ) {
        project = checkedProjectsStatusData;
      }

      if (project && project.id && project.calculationId) {
        const rules = await fetchEngineRules(project);
        setProjectData({ points: rules });
      }
    };

    fetchRules().catch(console.error);
  }, [checkedProjectIds, checkedProjectsStatusData]);

  const updateProjects = async () => {
    const updated = await projectService.get();
    setProjects(updated.data);
  };

  const handleCheckboxChange = projectId => {
    setCheckedProjectIds(prevCheckedProjectIds => {
      if (prevCheckedProjectIds.includes(projectId)) {
        return prevCheckedProjectIds.filter(id => id !== projectId);
      } else {
        return [...prevCheckedProjectIds, projectId];
      }
    });

    // header checkbox status
    setSelectedProject(checkedProjectIds.length);
  };

  const handleSubmissionModalOpen = project => {
    setSelectedProject(project);
    setSubmissionModalOpen(true);
  };

  const handleSubmissionModalClose = async action => {
    if (action === "ok") {
      try {
        await projectService.submit({ id: selectedProject.id });
        await updateProjects();
      } catch (err) {
        handleError(err);
      }
    }
    setSubmissionModalOpen(false);
    setSelectedProject(null);
    setCheckedProjectIds([]);
  };

  return (
    <ContentContainer contentContainerRef={contentContainerRef}>
      <div>
        <h1 className={classes.pageTitle}>Snapshot Submittal Form</h1>
        <div className={classes.subtitle}>
          <p>
            This form is for submitting a snapshot to the LA City Planning
            Department for review.
          </p>
          <p>Snapshots must meet target points before they can be submitted</p>
        </div>
      </div>
      <div> Target Points</div>
      <h3 className={classes.heading3}>Snapshots Meeting Target Points:</h3>

      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className={classes.tableHead}>Name</th>
              <th className={classes.tableHead}>Address</th>
              <th className={classes.tableHead}>Date Submitted</th>
              <th className={classes.tableHead}>Date Modified</th>
            </tr>
          </thead>

          <tbody>
            {projects.map(project =>
              project.dateSnapshotted ? (
                <SubmitSnapshotTable
                  key={project.id}
                  project={project}
                  handleCheckboxChange={handleCheckboxChange}
                  handleSubmissionModalOpen={handleSubmissionModalOpen}
                  checkedProjectIds={checkedProjectIds}
                  projectData={projectData}
                />
              ) : null
            )}
          </tbody>
        </table>
      </div>

      <div>
        <Button
          type="submit"
          className={classes.submitButton}
          color="colorPrimary"
          onClick={handleSubmissionModalOpen}
        >
          Submit
        </Button>
        {checkedProjectIds.length === 1 ? (
          <SubmitSnapshotModal
            mounted={submissionModalOpen}
            onClose={handleSubmissionModalClose}
            project={selectedProject}
          />
        ) : null}
      </div>
    </ContentContainer>
  );
};

SubmitSnapshotPage.propTypes = {
  contentContainerRef: PropTypes.object
};

export default SubmitSnapshotPage;
