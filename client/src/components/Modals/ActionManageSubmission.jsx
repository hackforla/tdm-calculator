import React from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/Modal";
import ManageSubmissionForm from "../Submissions/ManageSubmissionForm";

const ActionManageSubmission = ({
  mounted,
  onClose,
  project,
  assigneeList
}) => {
  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#duplicateName"
    >
      <ManageSubmissionForm
        onClose={onClose}
        project={project}
        assigneeList={assigneeList}
        adminNotesModal={false}
      />
    </ModalDialog>
  );
};

ActionManageSubmission.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any,
  assigneeList: PropTypes.array
};

export default ActionManageSubmission;
