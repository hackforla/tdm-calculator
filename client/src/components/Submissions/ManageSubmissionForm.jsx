import React from "react";
import PropTypes from "prop-types";
import { formatId } from "../../helpers/util";
import { createUseStyles, useTheme } from "react-jss";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import * as projectService from "../../services/project.service";
import { toDate, formatDate } from "../../helpers/util";
import useToast from "../../contexts/Toast/useToast";

import Button from "../Button/Button";
import UniversalSelect from "../UI/UniversalSelect";
import {
  approvalStatuses,
  invoiceStatuses,
  dros
} from "../../helpers/Constants";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 2rem",
    width: "80vw"
  },
  columnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  column1: {
    flexBasis: "28rem"
  },
  column2: {
    marginLeft: "1rem",
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  rowFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "baseline",
    marginTop: "1rem",
    marginBottom: "0"
  },
  rowLabel: { ...theme.typography.paragraph1 },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "1rem 0 0.5rem 0"
  },
  heading1: { ...theme.typography.heading1, margin: "0" },
  para: { ...theme.typography.paragraph1, marginBottom: "0.5rem" },
  formContainer: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    marginTop: ".5em",
    width: "100%"
  },
  formInput: {
    flex: "0 1 13rem",
    marginBottom: "0.5rem"
  },
  datepicker: {
    width: "6rem",
    padding: "2px",
    borderRadius: "3px",
    marginBottom: "0.5rem",
    marginRight: "0",
    border: "1px solid darkgray"
  },
  formCheckbox: {
    flex: "0 1 1rem",
    marginBottom: "0.5rem"
  },
  formTextArea: {
    flex: "0 1 50%",
    marginBottom: "0.5em",
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

const ManageSubmissionForm = ({ onClose, project, assigneeList }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const toast = useToast();

  const handleClose = () => {
    onClose();
  };

  const validationSchema = Yup.object({
    droId: Yup.number().min(1, "DRO must be assigned")
  });

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

      if (response.status === 204) {
        toast.add("Status updated");
        onClose(formik.values);
      }
    } catch (err) {
      toast.add("An error occurred in updating the submission.");
    }
  };

  const formik = useFormik({
    initialValues: {
      ...project,
      dateAssigned: toDate(project.dateAssigned),
      dateInvoicePaid: toDate(project.dateInvoicePaid),
      dateCoO: toDate(project.dateCoO)
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      submit(values);
    }
  });

  const handleDateChange = (date, name) => {
    const fakeEventTarget = { value: date, name: name };
    const fakeEvent = { target: fakeEventTarget };
    formik.handleChange(fakeEvent);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.heading1}>Edit Submission Status</h1>
      <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
        <div className={classes.columnContainer}>
          <div className={classes.column1}>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Project ID</span>
              <span>{formatId(project.id)}</span>
            </div>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Project Name</span>
              <span>{project.name}</span>
            </div>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Created By</span>
              <span>{project.author}</span>
            </div>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Email</span>
              <span>{project.authorEmail}</span>
            </div>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Level</span>
              <span>{project.projectLevel}</span>
            </div>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>DRO</span>
              <UniversalSelect
                id="droId"
                name="droId"
                value={formik.values.droId ? formik.values.droId.toString() : 0}
                onChange={formik.handleChange}
                options={dros}
                className={classes.formInput}
                // className={clsx(
                //   classes.formInput,
                //   errors.name && touched.name && classes.formErrorBorder
                // )}
              />
            </div>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Staff Assigned</span>
              <UniversalSelect
                id="loginIdAssigned"
                name="loginIdAssigned"
                value={
                  formik.values.loginIdAssigned
                    ? formik.values.loginIdAssigned
                    : 0
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
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Assigned On</span>
              <div>
                <DatePicker
                  name="dateAssigned"
                  id="dateAssigned"
                  selected={formik.values.dateAssigned}
                  onChange={dt => {
                    handleDateChange(dt, "dateAssigned");
                  }}
                  dateFormat="yyyy-MM-dd"
                  className={classes.datepicker}
                  popperPlacement="top-end"
                />
              </div>
            </div>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Invoice Status</span>
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
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Invoice Paid Date</span>
              <div>
                <DatePicker
                  name="dateInvoicePaid"
                  id="dateInvoicePaid"
                  selected={formik.values.dateInvoicePaid}
                  onChange={dt => {
                    handleDateChange(dt, "dateInvoicePaid");
                  }}
                  dateFormat="yyyy-MM-dd"
                  className={classes.datepicker}
                  popperPlacement="top-end"
                />
              </div>
            </div>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>On Hold</span>
              <input
                name="onHold"
                id="onHold"
                value={formik.values.onHold}
                type="checkbox"
                selected={formik.values.onHold}
                onChange={formik.handleChange}
                className={classes.formCheckbox}
              />
            </div>
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>Approval Status</span>
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
            <div className={classes.rowFlexBox}>
              <span className={classes.rowLabel}>
                Certificate of Occupancy Date
              </span>
              <div>
                <DatePicker
                  name="dateCoO"
                  id="dateCoO"
                  selected={formik.values.dateCoO}
                  onChange={dt => {
                    handleDateChange(dt, "dateCoO");
                  }}
                  dateFormat="yyyy-MM-dd"
                  className={classes.datepicker}
                  popperPlacement="top-end"
                />
              </div>
            </div>
          </div>

          <div className={classes.column2}>
            <div
              className={classes.label}
              style={{ marginTop: "1.2rem", marginBottom: "0.85rem" }}
            >
              Admin Notes
            </div>
            <textarea
              name="adminNotes"
              rows="26.5"
              id="adminNotes"
              value={formik.values.adminNotes}
              onChange={formik.handleChange}
              style={{ resize: "none", padding: "0.2rem" }}
            />
          </div>
        </div>

        {/* <div>{JSON.stringify(formik.initialValues, null, 2)}</div> */}
        {/* <div>{JSON.stringify(formik.values, null, 2)}</div> */}
        {/* {formik.errors && <div>{JSON.stringify(formik.errors, null, 2)}</div>} */}

        <div className={classes.buttonFlexBox}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={Object.getOwnPropertyNames(formik.errors).length > 0}
          >
            Save Changes
          </Button>
        </div>
        <p className={classes.para}>
          {" "}
          Status Updated On {formatDate(project.dateStatus)} by{" "}
          {project.statuser}
        </p>
      </form>
    </div>
  );
};

ManageSubmissionForm.propTypes = {
  onClose: PropTypes.func,
  project: PropTypes.any,
  assigneeList: PropTypes.array
};

export default ManageSubmissionForm;
