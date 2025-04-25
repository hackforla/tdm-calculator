import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ContentContainer from "../Layout/ContentContainer";

import * as projectService from "../../services/project.service.js";

const useStyles = createUseStyles({
  pageTitle: {
    marginBottom: "16px",
    textAlign: "center"
  }
});

const SubmissionsPage = props => {
  const { contentContainerRef } = props;
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await projectService.getSubmissions();
      setProjects(response.data);
    }
    fetchData();
  }, [setProjects]);

  return (
    <ContentContainer contentContainerRef={contentContainerRef}>
      <h1 className={classes.pageTitle}>Submissions</h1>
      <div>{JSON.stringify(projects, null, 2)}</div>
    </ContentContainer>
  );
};

SubmissionsPage.propTypes = {
  contentContainerRef: PropTypes.object
};

export default SubmissionsPage;
