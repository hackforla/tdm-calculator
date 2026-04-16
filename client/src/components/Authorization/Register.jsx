import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import * as accountService from "../../services/account.service";
import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle
} from "react-icons/fa";
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
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  inputField: {
    flex: 1,
    minWidth: 0
  },
  inputInvalid: {
    outline: `1px solid ${theme.colorCritical}`,
    "&:focus": {
      outline: `1px solid ${theme.colorCritical}`
    }
  },
  fieldIcon: {
    fontSize: 18,
    flexShrink: 0,
    width: 18
  },
  validIcon: {
    color: theme.colorPrimary
  },
  invalidIcon: {
    color: theme.colorCritical
  },
  multiRowFeedback: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 4,
    marginBottom: 6
  }
}));

const ValidationIcon = ({ touched, error, classes }) => {
  if (!touched) return <span className={classes.fieldIcon} />;

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

const EmailRules = ({ value, touched, classes }) => {
  const rules = [
    {
      label:
        "Your email must have at least one character before and after the @ symbol",
      valid: /^[^@]+@[^@]+$/.test(value)
    },
    {
      label: "Your email must begin and end with either a letter or a number",
      valid: /^[a-zA-Z0-9].*[a-zA-Z0-9]$/.test(value)
    },
    {
      label:
        "You can use letters, numbers, apostrophe, hyphen, period and a plus sign only",
      valid: /^[a-zA-Z0-9@.'+-]+$/.test(value)
    },
    {
      label:
        "Your email must end with a valid top-level domain such as .com, .org, .net, etc. (at least 2 letters after the last period)",
      valid: /^[a-zA-Z0-9@.'+-]*\.[a-zA-Z0-9.'+-]{2,}$/.test(value)
    }
  ];

  return (
    <div>
      {rules.map((rule, index) => (
        <div key={index} className={classes.multiRowFeedback}>
          {/* Only show the icon if the user has entered something */}
          {value &&
            value.trim() !== "" &&
            touched &&
            (rule.valid ? (
              <FaCheckCircle
                className={`${classes.fieldIcon} ${classes.validIcon}`}
              />
            ) : (
              <FaTimesCircle
                className={`${classes.fieldIcon} ${classes.invalidIcon}`}
              />
            ))}
          <span>{rule.label}</span>
        </div>
      ))}
    </div>
  );
};

EmailRules.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  value: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    fieldIcon: PropTypes.string.isRequired,
    validIcon: PropTypes.string.isRequired,
    invalidIcon: PropTypes.string.isRequired,
    multiRowFeedback: PropTypes.string.isRequired
  }).isRequired
};

const PasswordRules = ({ value, touched, classes }) => {
  const rules = [
    {
      label: "Password must contain at least 12 characters",
      valid: value.length >= 12
    },
    {
      label: "Password must contain at least one number",
      valid: /[0-9]/.test(value)
    },
    {
      label: "Password must contain at least one capital letter",
      valid: /[A-Z]/.test(value)
    },
    {
      label:
        "Password must contain at least one special character from the following list: !@#$%&*?",
      valid: /[!@#$%&*?]/.test(value)
    },
    {
      label: "Password must not contain any other special characters",
      valid: value.length > 0 && /^[A-Za-z0-9!@#$%&*?]*$/.test(value)
    }
  ];

  return (
    <div>
      {rules.map((rule, index) => (
        <div key={index} className={classes.multiRowFeedback}>
          {/* Only show the icon if user has entered something */}
          {value &&
            value.trim() !== "" &&
            touched &&
            (rule.valid ? (
              <FaCheckCircle
                className={`${classes.fieldIcon} ${classes.validIcon}`}
              />
            ) : (
              <FaTimesCircle
                className={`${classes.fieldIcon} ${classes.invalidIcon}`}
              />
            ))}
          <span>{rule.label}</span>
        </div>
      ))}
    </div>
  );
};

PasswordRules.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  value: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    fieldIcon: PropTypes.string.isRequired,
    validIcon: PropTypes.string.isRequired,
    invalidIcon: PropTypes.string.isRequired,
    multiRowFeedback: PropTypes.string.isRequired
  }).isRequired
};

const ConfirmPasswordRule = ({
  password,
  confirmPassword,
  touched,
  classes
}) => {
  if (!touched) return null;

  const hasValue = confirmPassword.length > 0;

  return (
    <div className={classes.multiRowFeedback}>
      {hasValue && password === confirmPassword ? (
        <FaCheckCircle
          className={`${classes.fieldIcon} ${classes.validIcon}`}
        />
      ) : (
        <FaExclamationCircle
          className={`${classes.fieldIcon} ${classes.invalidIcon}`}
        />
      )}

      <span>
        {!hasValue
          ? "Confirm your password"
          : password === confirmPassword
            ? "Passwords match"
            : "Passwords do not match"}
      </span>
    </div>
  );
};

ConfirmPasswordRule.propTypes = {
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  touched: PropTypes.bool,
  length: PropTypes.number,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  value: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    fieldIcon: PropTypes.string.isRequired,
    validIcon: PropTypes.string.isRequired,
    invalidIcon: PropTypes.string.isRequired,
    multiRowFeedback: PropTypes.string.isRequired
  }).isRequired
};

const Register = props => {
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
        "You can use letters, apostrophe, hyphen, period and space only"
      )
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(
        /^[a-zA-Z' .-]*$/,
        "You can use letters, apostrophe, hyphen, period and space only"
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
      } else if (response.code === "REG_EMAIL_FAILED") {
        setErrorMsg(
          `Sending the confirmation email failed. Please contact techincal support.  The error message is:  "${response.message}"`
        );
      } else if (response.code === "REG_DUPLICATE_EMAIL") {
        setErrorMsg(`The email ${email} is already registered. Please
          login or use the Forgot Password feature if you have
          forgotten your password.`);
      } else {
        setErrorMsg(`An error occurred in sending the confirmation
          message to ${email}. Try to log in, and follow the
          instructions for re-sending the confirmation email.`);
      }
    } catch (err) {
      setErrorMsg(err.message);
      setSubmitting(false);
    }
  };

  return (
    <ContentContainer>
      {!submitted ? (
        <>
          <h1 className={classes.heading1}>Create a New Account</h1>
          <div className="auth-form">
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={(values, actions) =>
                handleSubmit(values, actions, props)
              }
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ touched, errors, values, isSubmitting }) => (
                <Form>
                  {/* First Name */}
                  <div className={`form-group ${classes.formGroup}`}>
                    <div className={classes.inputRow}>
                      <Field
                        type="text"
                        innerRef={focusRef}
                        name="firstName"
                        placeholder="First Name"
                        aria-label="First Name"
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
                  <div className={"form-group"}>
                    <div className={classes.inputRow}>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        aria-label="Last Name"
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
                        aria-label="Email"
                        className="form-control"
                      />
                      <ValidationIcon
                        touched={touched.email}
                        error={errors.email}
                        classes={classes}
                      />
                    </div>
                    {touched.email && (
                      <EmailRules
                        value={values.email}
                        touched={touched.email}
                        classes={classes}
                      />
                    )}
                  </div>

                  {/* Password */}
                  <div className={`form-group ${classes.formGroup}`}>
                    <div className={classes.inputRow}>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        aria-label="Password"
                        className={`form-control ${
                          touched.password && values.password && errors.password
                            ? classes.inputInvalid
                            : ""
                        }`}
                      />
                      <ValidationIcon
                        touched={touched.password}
                        error={errors.password}
                        classes={classes}
                      />
                    </div>
                    {touched.password && (
                      <PasswordRules
                        value={values.password}
                        touched={touched.password}
                        classes={classes}
                      />
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className={`form-group ${classes.formGroup}`}>
                    <div className={classes.inputRow}>
                      <Field
                        type="password"
                        name="passwordConfirm"
                        placeholder="Retype Password"
                        autoComplete="new-password"
                        aria-label="Confirm Password"
                        className={`form-control ${
                          touched.passwordConfirm &&
                          values.passwordConfirm &&
                          errors.passwordConfirm
                            ? classes.inputInvalid
                            : ""
                        }`}
                      />
                      <ValidationIcon
                        touched={touched.passwordConfirm}
                        error={errors.passwordConfirm}
                        classes={classes}
                      />
                    </div>
                    <ConfirmPasswordRule
                      password={values.password}
                      confirmPassword={values.passwordConfirm}
                      touched={touched.passwordConfirm}
                      classes={classes}
                    />
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
            Registration instructions have been sent to the email you provided.
          </h1>
          <h2>
            Please allow a few minutes for the email to arrive in your inbox.
          </h2>
        </>
      )}

      {!submitted && (
        <div className={classes.authText}>
          Already have an account? &nbsp;{" "}
          <Link to={{ pathname: "/login" }}>Log In</Link>
        </div>
      )}
    </ContentContainer>
  );
};

export default Register;
