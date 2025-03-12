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
  authForm: {
    minWidth: "500px",
    maxWidth: "600px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column"
  },
  textInput: {
    boxSizing: "border-box",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    marginTop: "1rem"
  },
  textInputInvalid: {
    boxSizing: "border-box",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    border: theme.border.dashedWarning,
    marginTop: "1rem"
  },
  authText: {
    color: theme.colorLightGray
  },
  invalidFeedback: {
    color: theme.colorCritical
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center"
  }
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

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
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
  };
  return (
    <ContentContainer>
      {!submitted ? (
        <>
          <h1 style={theme.typography.heading1}>Create a New Account</h1>
          <div style={theme.typography.subHeading}>
            Save your project information.
          </div>
          <div className={classes.authForm}>
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={(values, actions) =>
                handleSubmit(values, actions, props)
              }
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      type="text"
                      innerRef={focusRef}
                      name="firstName"
                      placeholder="First Name"
                      className={
                        touched.firstName && errors.firstName
                          ? classes.textInputInvalid
                          : classes.textInput
                      }
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      style={{
                        marginTop: "0.5rem",
                        color: theme.colorCritical
                      }}
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className={
                        touched.lastName && errors.lastName
                          ? classes.textInputInvalid
                          : classes.textInput
                      }
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      style={{
                        marginTop: "0.5rem",
                        color: theme.colorCritical
                      }}
                    />
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={
                        touched.email && errors.email
                          ? classes.textInputInvalid
                          : classes.textInput
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{
                        marginTop: "0.5rem",
                        color: theme.colorCritical
                      }}
                    />
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      autocomplete="new-password"
                      className={
                        touched.password && errors.password
                          ? classes.textInputInvalid
                          : classes.textInput
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={{
                        marginTop: "0.5rem",
                        color: theme.colorCritical
                      }}
                    />
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="passwordConfirm"
                      placeholder="Retype Password"
                      autocomplete="new-password"
                      className={
                        touched.passwordConfirm && errors.passwordConfirm
                          ? classes.textInputInvalid
                          : classes.textInput
                      }
                    />
                    <ErrorMessage
                      name="passwordConfirm"
                      component="div"
                      style={{
                        marginTop: "0.5rem",
                        color: theme.colorCritical
                      }}
                    />
                  </div>
                  <div className={classes.buttonsContainer}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      style={{ margin: "auto" }}
                    >
                      {isSubmitting ? "Please wait..." : "Create Account"}
                    </Button>
                  </div>
                  <div className={classes.invalidFeedback}>
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
          <h1>
            Registration instructions have been sent to the email you provided.
          </h1>
          <h2>
            Please allow a few minutes for the email to arrive in your inbox.
          </h2>
        </>
      )}
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
