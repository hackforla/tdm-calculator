import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import ModalDialog from "../UI/Modal";

const ActionManageSubmission = ({ mounted, onClose, project }) => {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: ""
    },
    onSubmit: values => {
      console.error(values);
    }
  });
  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#duplicateName"
    >
      <h1>{project.name}</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <button type="submit">Submit</button>
      </form>
    </ModalDialog>
  );
};

ActionManageSubmission.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};

export default ActionManageSubmission;
