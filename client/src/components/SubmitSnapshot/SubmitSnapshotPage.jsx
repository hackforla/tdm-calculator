import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import ContentContainer from "../Layout/ContentContainer";
import Button from "../Button/Button";
import WarningSnapshotSubmit from "../Modals/WarningSnapshotSubmit";
import SubmitSnapshotTable from "./SubmitSnapshotTable";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProjects from "../../hooks/useGetProjects";
import UserContext from "../../contexts/UserContext";
import * as projectService from "../../services/project.service.js";
import * as projectResultService from "../../services/projectResult.service";

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
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);

  const eligibleProjects = projects.filter(
    p =>
      p.earnedPoints >= p.targetPoints && p.dateSnapshotted && !p.dateSubmitted
  );
  const ineligibleProjects = projects.filter(
    p =>
      p.earnedPoints < p.targetPoints && p.dateSnapshotted && !p.dateSubmitted
  );
  const submittedProjects = projects.filter(p => p.dateSubmitted);

  const updateProjects = async () => {
    let response = await projectService.get();
    let projects = response.data.filter(
      p => p.loginId === userContext.account.loginId && p.dateSnapshotted
    );
    const projectsNeedingCalculation = projects.filter(p => !p.targetPoints);
    // The following code determines if the targetPoints, earnedPoints or projectLevel
    // columns in the project table have not been calculated. If this is the case, they
    // are calculated, saved to the db, and the projects are re-fetched. This should
    // only apply to legacy projects. New projects should have these fields saved
    // when the project is saved.
    if (projectsNeedingCalculation.length > 0) {
      for (let i = 0; i < projectsNeedingCalculation.length; i++) {
        await projectResultService.populateTargetPoints(
          projectsNeedingCalculation[i]
        );
      }
      response = await projectService.get();
      projects = response.data.filter(
        p => p.loginId === userContext.account.loginId && p.dateSnapshotted
      );
    }

    setProjects(projects);
  };

  const handleSelectProject = projectId => {
    setSelectedProjectId(projectId);
    setSelectedProject(projects.find(p => p.id === projectId));
  };

  const handleSubmissionModalOpen = () => {
    if (!selectedProject) return;
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
    setSelectedProjectId(null);
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

      <h3 className={classes.heading3}>Snapshots Meeting Target Points</h3>

      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className={classes.tableHead}>Name</th>
              <th className={classes.tableHead}>Address</th>
              <th className={classes.tableHead}>Date Submitted</th>
              <th className={classes.tableHead}>Date Saved</th>
            </tr>
          </thead>

          <tbody>
            {eligibleProjects.map(project =>
              project.dateSnapshotted ? (
                <SubmitSnapshotTable
                  key={project.id}
                  project={project}
                  handleSelectProject={handleSelectProject}
                  handleSubmissionModalOpen={handleSubmissionModalOpen}
                  selectedProjectId={selectedProjectId}
                  includeRadioButton={true}
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
          disabled={!selectedProject}
        >
          Submit
        </Button>
      </div>

      <h3 className={classes.heading3}>Snapshots Not Meeting Target Points</h3>

      <div>
        <table>
          <thead>
            <tr>
              <th className={classes.tableHead}>Name</th>
              <th className={classes.tableHead}>Address</th>
              <th className={classes.tableHead}>Date Submitted</th>
              <th className={classes.tableHead}>Date Saved</th>
            </tr>
          </thead>

          <tbody>
            {ineligibleProjects.map(project =>
              project.dateSnapshotted ? (
                <SubmitSnapshotTable
                  key={project.id}
                  project={project}
                  includeRadioButton={false}
                />
              ) : null
            )}
          </tbody>
        </table>
      </div>

      <h3 className={classes.heading3}>Submitted Snapshots</h3>

      <div>
        <table>
          <thead>
            <tr>
              <th className={classes.tableHead}>Name</th>
              <th className={classes.tableHead}>Address</th>
              <th className={classes.tableHead}>Date Submitted</th>
              <th className={classes.tableHead}>Date Saved</th>
            </tr>
          </thead>

          <tbody>
            {submittedProjects.map(project =>
              project.dateSnapshotted ? (
                <SubmitSnapshotTable
                  key={project.id}
                  project={project}
                  includeRadioButton={false}
                />
              ) : null
            )}
          </tbody>
        </table>
      </div>

      <WarningSnapshotSubmit
        mounted={submissionModalOpen}
        onClose={handleSubmissionModalClose}
        project={selectedProject}
      />
    </ContentContainer>
  );
};

SubmitSnapshotPage.propTypes = {
  contentContainerRef: PropTypes.object
};

export default SubmitSnapshotPage;
