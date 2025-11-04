import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import * as accountService from "../../services/account.service";
import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Button from "../Button/Button";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles(theme => ({
  submitButton: {
    float: "right"
  },
  authText: {
    color: theme.colors.secondary.darkNavy
  },
  invalidFeedback: {
    color: "#ff0418"
  },
  heading1: { ...theme.typography.heading1, textAlign: "auto" }
}));

const Register = props => {
  const focusRef = useRef(null);
  const theme = useTheme();
  const classes = useStyles(theme);
  const params = useParams();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: params.email || "",
    password: "",
    passwordConfirm: ""
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // useEffect(() => {
  //   if (focusRef.current) {
  //     focusRef.current.focus();
  //   }
  // });

  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^[a-zA-Z' .-]*$/,
        "Your first name can only contain the alphabet, apostrophes, hyphens, periods, and spaces"
      )
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(
        /^[a-zA-Z' .-]*$/,
        "Your last name can only contain the alphabet, apostrophes, hyphens, periods, and spaces"
      )
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(
        12,
        "Your password must have at least 12 characters, at least one number, one capitalization, and one special character (e.g., !@#$%&*?)"
      )
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?])[A-Za-z\d@$!%*#?&]{12,}$/,
        "Your password must have at least 12 characters, at least one number, one capitalization, and one special character (e.g., !@#$%&*?)"
      )
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match")
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
    // TODO: figure out if there is a scanrio where you actually
    // want to reset the form, and move/copy the next line accordingly
    //resetForm(initialValues);
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
              onSubmit={(values, actions) =>
                handleSubmit(values, actions, props)
              }
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <Field
                      type="text"
                      innerRef={focusRef}
                      name="firstName"
                      placeholder="First Name"
                      className={`form-control ${
                        touched.firstName && errors.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className={classes.invalidFeedback}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className={`form-control ${
                        touched.lastName && errors.lastName ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className={classes.invalidFeedback}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={classes.invalidFeedback}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      autocomplete="new-password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={classes.invalidFeedback}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="password"
                      name="passwordConfirm"
                      placeholder="Retype Password"
                      autocomplete="new-password"
                      className={`form-control ${
                        touched.passwordConfirm && errors.passwordConfirm
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="passwordConfirm"
                      component="div"
                      className={classes.invalidFeedback}
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
                  <div className="warning">
                    <br />
                    {errorMsg}
                  </div>
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
      <br />
      <br />
      {submitted ? null : (
        <div className={classes.authText}>
          Already have an account? &nbsp;{" "}
          <Link to={{ pathname: "/login" }}>Log In</Link>
        </div>
      )}
    </ContentContainer>
  );
};

export default Register;
