import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { useFormik } from "formik";
// import * as Yup from "yup";
import * as projectService from "../../services/project.service";
import * as accountService from "../../services/account.service";
import useToast from "../../contexts/Toast/useToast";

import Button from "../Button/Button";
import UniversalSelect from "../UI/UniversalSelect";
import { MdCheck } from "react-icons/md";
import ModalDialog from "../UI/Modal";
import {
  approvalStatuses,
  invoiceStatuses,
  dros
} from "../../helpers/Constants";

// import clsx from "clsx";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 2rem",
    maxWidth: "80vw"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  subheading: {
    ...theme.typography.subHeading,
    marginTop: "1rem",
    marginBottom: "1rem",
    textAlign: "center"
  },
  icon: {
    height: "40px",
    width: "40px",
    color: theme.colorBlack,
    marginBottom: "0",
    verticalAlign: "middle"
  },
  formContainer: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    marginTop: "2em",
    width: "80%",
    maxWidth: "840px"
  },
  row: {
    display: "flex",
    flexWrap: "wrap"
  },
  formLabel: {
    minWidth: "236px"
  },
  formInput: {
    marginBottom: "1em",
    width: "100%"
  },
  formTextArea: {
    display: "block",
    marginBottom: "1em",
    width: "100%",
    height: "100px"
  },
  formErrorBorder: {
    border: "2px dotted red "
  },
  errorMessage: {
    color: theme.colorCritical,
    marginTop: "-0.5rem",
    marginBottom: "1rem"
  }
}));

const ActionManageSubmission = ({ mounted, onClose, project }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const toast = useToast();
  const [assigneeList, setAssigneeList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await accountService.search();
      const assignees = [{ value: 0, label: "(unassigned)" }].concat(
        response.data.map(d => {
          return {
            value: d.loginId,
            label: `${d.lastName}, ${d.firstName}`
          };
        })
      );
      setAssigneeList(assignees);
    }
    fetchData();
  }, [setAssigneeList]);

  // const validationSchema = Yup.object({
  //   name: Yup.string()
  //     .min(2, "Must be 2 characters or more")
  //     .required("Required"),
  //   email: Yup.string().email("Invalid email address"),
  //   comment: Yup.string().required("Required")
  // });

  const submit = async ({
    id,
    droId,
    adminNotes,
    dateModifiedAdmin,
    loginIdAssigned,
    dateAssigned,
    invoiceStatusId,
    dateInvoicePaid,
    onHold,
    approvalStatusId,
    dateCoO
  }) => {
    try {
      const response = await projectService.putSubmission({
        id,
        droId: Number(droId),
        adminNotes,
        dateModifiedAdmin,
        loginIdAssigned,
        dateAssigned,
        invoiceStatusId,
        dateInvoicePaid,
        onHold,
        approvalStatusId,
        dateCoO
      });

      if (response.status === 201) {
        toast.add("Comment delivered successfully");
        // resetForm({});
      }
    } catch (err) {
      toast.add("An error occurred in updating the submission.");
      // resetForm({});
    }
    // setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: { ...project },
    // validationSchema: validationSchema,
    onSubmit: values => {
      submit(values);
    }
  });

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#duplicateName"
    >
      <div className={classes.container}>
        <h1 className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
          <MdCheck className={classes.icon} /> Manage Submission
        </h1>
        <h2 className={classes.subheading}>
          Update the Status Information for Submission
          {project.name}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className={classes.formContainer}>
            <div className={classes.row}>
              <label htmlFor="assigneeLoginId" className={classes.formLabel}>
                Assignee
              </label>

              <UniversalSelect
                id="assigneeLoginId"
                name="assigneeLoginId"
                value={
                  formik.values.assigneeLoginId
                    ? formik.values.assigneeLoginId.toString()
                    : ""
                }
                onChange={formik.handleChange}
                options={assigneeList}
                className={classes.formInput}
                // className={clsx(
                //   classes.formInput,
                //   errors.name && touched.name && classes.formErrorBorder
                // )}
              />
            </div>
            <div className={classes.row}>
              <label htmlFor="droId" className={classes.formLabel}>
                DRO
              </label>

              <UniversalSelect
                id="droId"
                name="droId"
                value={
                  formik.values.droId ? formik.values.droId.toString() : ""
                }
                onChange={formik.handleChange}
                options={dros}
                className={classes.formInput}
                // className={clsx(
                //   classes.formInput,
                //   errors.name && touched.name && classes.formErrorBorder
                // )}
              />
            </div>
            <div className={classes.row}>
              <label htmlFor="approvalStatusId" className={classes.formLabel}>
                Approval Status
              </label>

              <UniversalSelect
                id="approvalStatusId"
                name="approvalStatusId"
                value={formik.values.approvalStatusId}
                onChange={formik.handleChange}
                options={approvalStatuses}
                className={classes.formInput}
                // className={clsx(
                //   classes.formInput,
                //   errors.name && touched.name && classes.formErrorBorder
                // )}
              />
            </div>
            <div className={classes.row}>
              <label htmlFor="invoceStatusId" className={classes.formLabel}>
                Invoice Status
              </label>

              <UniversalSelect
                id="invoiceStatusId"
                name="invoiceStatusId"
                value={formik.values.invoiceStatusId}
                onChange={formik.handleChange}
                options={invoiceStatuses}
                className={classes.formInput}
                // className={clsx(
                //   classes.formInput,
                //   errors.name && touched.name && classes.formErrorBorder
                // )}
              />
            </div>
            <div className={classes.row}>
              <label htmlFor="adminNotes" className={classes.formLabel}>
                Admin Notes
              </label>

              <input
                id="adminNotes"
                name="adminNotes"
                value={formik.values.adminNotes}
                onChange={formik.handleChange}
                // innerRef={focusRef}
                type="textarea"
                placeholder="required"
                className={classes.formTextArea}
                // className={clsx(
                //   classes.formInput,
                //   errors.name && touched.name && classes.formErrorBorder
                // )}
              />
            </div>
          </div>
          <div>{JSON.stringify(formik.initialValues, null, 2)}</div>
          <div>{JSON.stringify(formik.values, null, 2)}</div>

          <div className={classes.buttonFlexBox}>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              // disabled={isSubmitting}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </ModalDialog>
  );
};

ActionManageSubmission.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};

export default ActionManageSubmission;
