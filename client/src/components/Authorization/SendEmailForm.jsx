import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clsx from "clsx";

export const useStyles = createUseStyles(theme => ({
  pageTitle: {
    marginTop: 0,
    marginBottom: "16px"
  },
  subTitle: {
    marginBottom: "32px",
    textAlign: "center"
  },
  fieldGroup: {
    width: "100%",
    marginBottom: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputField: {
    width: "403px",
    height: "30px",
    border: "1px solid" + theme.colors.secondary.gray,
    marginTop: "8px"
  },
  error: {
    borderColor: theme.colorCritical
  },
  errorMessage: {
    margin: "8px 0 0 0 ",
    width: "100%",
    color: theme.colorCritical
  },
  authText: {
    color: theme.colors.secondary.gray,
    marginTop: "20px"
  }
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required")
});

const SendEmailForm = ({ label, submitted, handleSubmit }) => {
  const focusRef = useRef(null);
  const theme = useTheme();
  const classes = useStyles(theme);

  return !submitted ? (
    <>
      <h1 className={classes.pageTitle}>Send {label} Email</h1>
      <div className={classes.subTitle}>
        <h3>
          Please enter the email registered with your account, or if you have
          recently updated your email, provide the new one below.
        </h3>
        <h3>An email containing further instructions will be sent to you.</h3>
      </div>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {formikProps => {
          const { touched, errors, values } = formikProps;
          return (
            <Form>
              <div className={classes.fieldGroup}>
                <Field
                  type="email"
                  innerRef={focusRef}
                  value={values.email}
                  name="email"
                  placeholder="Registered/Updated Email"
                  className={clsx(
                    classes.inputField,
                    touched.email && errors.email ? classes.error : null
                  )}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={classes.errorMessage}
                />
                <Button type="submit" color="colorPrimary">
                  Send Email
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className={classes.authText}>
        New user? &nbsp;
        <Link to={"/register"}>Create an account</Link>
      </div>
    </>
  ) : (
    <>
      <h1>
        Account {label.toLowerCase()} instructions have been sent to the email
        you provided.
      </h1>
      <h2>Please allow a few minutes for the email to arrive in your inbox.</h2>
    </>
  );
};

SendEmailForm.propTypes = {
  label: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired
};

export default SendEmailForm;
