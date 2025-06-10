import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentContainer from "../Layout/ContentContainer";
import ManageSubmissionForm from "./ManageSubmissionForm";
import * as projectService from "../../services/project.service";
import * as accountService from "../../services/account.service";

const EditSubmissionPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const projectId = params.projectId ? Number(params.projectId) : null;
  const [project, setProject] = useState(null);
  const [assigneeList, setAssigneeList] = useState(null);

  useEffect(() => {
    const fetchData = async projectId => {
      const response = await projectService.getSubmissionsAdminById(projectId);
      setProject(response.data);
    };
    if (projectId) fetchData(projectId);
  }, [projectId]);

  useEffect(() => {
    const fetchAssigneeList = async () => {
      const response = await accountService.getAllDROAccounts();
      setAssigneeList(response.data);
    };
    fetchAssigneeList();
  }, []);

  const onClose = () => {
    navigate("/managesubmissions");
  };

  return (
    <ContentContainer>
      {project && assigneeList ? (
        <ManageSubmissionForm
          onClose={onClose}
          project={project}
          assigneeList={assigneeList}
          key={project.id}
          adminNotesModal={true}
        />
      ) : (
        <div>Loading...</div>
      )}
    </ContentContainer>
  );
};

export default EditSubmissionPage;
