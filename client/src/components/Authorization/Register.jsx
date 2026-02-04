import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import * as accountService from "../../services/account.service";
import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles(theme => ({
  submitButton: {
    float: "right"
  },
  authText: {
    color: theme.colors.secondary.darkNavy
  },
  heading1: {
    ...theme.typography.heading1,
    textAlign: "auto"
  },

  formGroup: {
    marginBottom: 16
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  inputField: {
    flex: 1,
    minWidth: 0
  },
  fieldIcon: {
    fontSize: 18,
    flexShrink: 0
  },
  validIcon: {
    color: "green"
  },
  invalidIcon: {
    color: theme.colors.secondary.darkRed
  },
  invalidFeedback: {
    color: theme.colors.secondary.darkRed
  }
}));

const ValidationIcon = ({ touched, error, classes }) => {
  if (!touched) return null;

  return error ? (
    <FaTimesCircle className={`${classes.fieldIcon} ${classes.invalidIcon}`} />
  ) : (
    <FaCheckCircle className={`${classes.fieldIcon} ${classes.validIcon}`} />
  );
};

ValidationIcon.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  classes: PropTypes.shape({
    fieldIcon: PropTypes.string.isRequired,
    validIcon: PropTypes.string.isRequired,
    invalidIcon: PropTypes.string.isRequired
  }).isRequired
};

const Register = () => {
  const focusRef = useRef(null);
  const theme = useTheme();
  const classes = useStyles(theme);
  const params = useParams();

  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: params.email || "",
    password: "",
    passwordConfirm: ""
  };

  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^[a-zA-Z' .-]*$/,
        "Your first name can only contain letters and basic punctuation"
      )
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(
        /^[a-zA-Z' .-]*$/,
        "Your last name can only contain letters and basic punctuation"
      )
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(12, "Password must be at least 12 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?])/,
        "Password must include upper case, number, and special character"
      )
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm your password")
  });

  const handleSubmit = async (
    { firstName, lastName, email, password },
    { setSubmitting }
  ) => {
    try {
      const response = await accountService.register(
        firstName,
        lastName,
        email,
        password
      );

      if (response.isSuccess) {
        setSubmitted(true);
      } else if (response.code === "REG_DUPLICATE_EMAIL") {
        setErrorMsg(
          `The email ${email} is already registered. Please log in or reset your password.`
        );
      } else {
        setErrorMsg(
          `An error occurred sending the confirmation email to ${email}.`
        );
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContentContainer>
      {!submitted ? (
        <>
          <h1 className={classes.heading1}>Create a New Account</h1>
          <h3>Save your project information.</h3>
          <br />

          <div className="auth-form">
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={handleSubmit}
              validateOnChange={false}
              validateOnBlur={true}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  {/* First Name */}
                  <div className={`form-group ${classes.formGroup}`}>
                    <div className={classes.inputRow}>
                      <Field
                        type="text"
                        innerRef={focusRef}
                        name="firstName"
                        placeholder="First Name"
                        className="form-control"
                      />
                      <ValidationIcon
                        touched={touched.firstName}
                        error={errors.firstName}
                        classes={classes}
                      />
                    </div>
                    <ErrorMessage name="firstName" component="div" />
                  </div>

                  {/* Last Name */}
                  <div className={`form-group ${classes.formGroup}`}>
                    <div className={classes.inputRow}>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="form-control"
                      />
                      <ValidationIcon
                        touched={touched.lastName}
                        error={errors.lastName}
                        classes={classes}
                      />
                    </div>
                    <ErrorMessage name="lastName" component="div" />
                  </div>

                  {/* Email */}
                  <div className={`form-group ${classes.formGroup}`}>
                    <div className={classes.inputRow}>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                      />
                      <ValidationIcon
                        touched={touched.email}
                        error={errors.email}
                        classes={classes}
                      />
                    </div>
                    <ErrorMessage name="email" component="div" />
                  </div>

                  {/* Password */}
                  <div className={`form-group ${classes.formGroup}`}>
                    <div className={classes.inputRow}>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        className="form-control"
                      />
                      <ValidationIcon
                        touched={touched.password}
                        error={errors.password}
                        classes={classes}
                      />
                    </div>
                    <ErrorMessage name="password" component="div" />
                  </div>

                  {/* Confirm Password */}
                  <div className={`form-group ${classes.formGroup}`}>
                    <div className={classes.inputRow}>
                      <Field
                        type="password"
                        name="passwordConfirm"
                        placeholder="Retype Password"
                        autoComplete="new-password"
                        className="form-control"
                      />
                      <ValidationIcon
                        touched={touched.passwordConfirm}
                        error={errors.passwordConfirm}
                        classes={classes}
                      />
                    </div>
                    <ErrorMessage name="passwordConfirm" component="div" />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    color="colorPrimary"
                    className={classes.submitButton}
                  >
                    {isSubmitting ? "Please wait..." : "Create Account"}
                  </Button>

                  {errorMsg && (
                    <div className="warning">
                      <br />
                      {errorMsg}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </>
      ) : (
        <>
          <h1 className={classes.heading1}>
            Registration instructions have been sent to your email.
          </h1>
          <h2>Please allow a few minutes for delivery.</h2>
        </>
      )}

      {!submitted && (
        <div className={classes.authText}>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      )}
    </ContentContainer>
  );
};

export default Register;
