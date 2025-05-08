import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import * as projectService from "../../services/project.service";
import { toDate, formatDate } from "../../helpers/util";
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
    width: "50vw",
    maxWidth: "80vw"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: { ...theme.typography.heading1, margin: "0" },
  subheading: {
    ...theme.typography.subHeading,
    marginTop: "0",
    marginBottom: "0",
    textAlign: "center"
  },
  para: theme.typography.paragraph1,
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
    width: "100%",
    maxWidth: "840px"
  },
  row: {
    display: "flex",
    flexDirection: "row"
  },
  rowHalf: {
    flex: "0 1 50%",
    display: "flex",
    flexDirection: "row"
  },
  formLabel: {
    flex: "0 1 50%",
    textAlign: "left",
    marginLeft: "1rem"
  },
  formInput: {
    flex: "0 1 50%",
    marginBottom: "0.5rem"
  },
  datepicker: {
    display: "block",
    width: "6rem",
    padding: "2px",
    marginBottom: "0.5rem",
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

const ActionManageSubmission = ({
  mounted,
  onClose,
  project,
  assigneeList
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const toast = useToast();

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
        toast.add("Comment delivered successfully");
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
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#duplicateName"
    >
      <div className={classes.container}>
        <h1 className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
          <MdCheck className={classes.icon} /> Manage Submission
        </h1>
        <p className={classes.para}>{project.name}</p>
        <p className={classes.para}>{project.address}</p>
        <p className={classes.para}>{project.author}</p>
        <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
          <div className={classes.row}>
            <div className={classes.rowHalf}>
              <label htmlFor="droId" className={classes.formLabel}>
                DRO
              </label>

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
          </div>
          <div className={classes.row}>
            <div className={classes.rowHalf}>
              <label htmlFor="loginIdAssigned" className={classes.formLabel}>
                Assignee
              </label>
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
            <div className={classes.rowHalf}>
              <label htmlFor="dateAssigned" className={classes.formLabel}>
                Date Assigned
              </label>
              <DatePicker
                name="dateAssigned"
                id="dateAssigned"
                selected={formik.values.dateAssigned}
                onChange={dt => {
                  handleDateChange(dt, "dateAssigned");
                }}
                dateFormat="yyyy-MM-dd"
                className={classes.datepicker}
              />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.rowHalf}>
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
            <div className={classes.rowHalf}>
              <label htmlFor="dateInvoicePaid" className={classes.formLabel}>
                Date Invoice Paid
              </label>
              <DatePicker
                name="dateInvoicePaid"
                id="dateInvoicePaid"
                selected={formik.values.dateInvoicePaid}
                onChange={dt => {
                  handleDateChange(dt, "dateInvoicePaid");
                }}
                dateFormat="yyyy-MM-dd"
                className={classes.datepicker}
              />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.rowHalf}>
              <label htmlFor="onHold" className={classes.formLabel}>
                On Hold
              </label>
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
          </div>

          <div className={classes.row}>
            <div className={classes.rowHalf}>
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
            <div className={classes.rowHalf}>
              <label htmlFor="dateCoO" className={classes.formLabel}>
                C of O Date
              </label>
              <DatePicker
                name="dateCoO"
                id="dateCoO"
                selected={formik.values.dateCoO}
                onChange={dt => {
                  handleDateChange(dt, "dateCoO");
                }}
                dateFormat="yyyy-MM-dd"
                className={classes.datepicker}
              />
            </div>
          </div>

          {/* <div>{JSON.stringify(formik.initialValues, null, 2)}</div> */}
          {/* <div>{JSON.stringify(formik.values, null, 2)}</div> */}
          {/* {formik.errors && <div>{JSON.stringify(formik.errors, null, 2)}</div>} */}

          <div className={classes.buttonFlexBox}>
            <Button variant="secondary" onClick={onClose}>
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
