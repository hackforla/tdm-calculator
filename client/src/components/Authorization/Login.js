import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account-service";
import SideBar from "../Sidebar";
import clsx from "clsx";

const useStyles = createUseStyles({
  root: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  },
  tdmWizard: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "row"
  },
  "@media (max-width:720px)": {
    tdmWizard: {
      flexDirection: "column"
    }
  }
});

const Login = props => {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState("");

  const { setLoggedInAccount, match } = props;
  const initialValues = {
    email: match.params.email ? decodeURIComponent(match.params.email) : "",
    password: ""
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .required("Password is required")
  });

  const handleSubmit = async (
    { email, password },
    { setSubmitting },
    { history }
  ) => {
    try {
      const loginResponse = await accountService.login(email, password);

      if (loginResponse.isSuccess) {
        setLoggedInAccount(loginResponse.user);
        history.push("/calculation");
      } else if (loginResponse.code === "AUTH_NOT_CONFIRMED") {
        try {
          await accountService.resendConfirmationEmail(email);
          setErrorMsg(`Your email has not been confirmed.
          Please look through your email for a Registration
          Confirmation link and use it to confirm that you
          own this email address.`);
          setSubmitting(false);
        } catch (err) {
          setErrorMsg(
            `An internal error occurred in sending an email to ${email}. `,
            err.message
          );
          setSubmitting(false);
        }
      } else if (loginResponse.code === "AUTH_NO_ACCOUNT") {
        setErrorMsg(`The email ${email} does not correspond to an
        existing account. Please verify the email or register as a
        new account.`);
        setSubmitting(false);
      } else {
        // Presumably loginResponse.code === "AUTH_INVALID_PASSWORD"
        setErrorMsg(`The password is incorrect, please check it
        and try again or use the Forgot Password feature.`);
        setSubmitting(false);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className={classes.root}>
      <div className={clsx("tdm-wizard", classes.tdmWizard)}>
        <div className="tdm-wizard-sidebar" />
        <SideBar />
        <div className="tdm-wizard-content-container">
          <h1>Welcome to Los Angeles&rsquo; TDM Calculator</h1>
          <h3>Please sign into your account to save progress.</h3>
          <br />
          <div className="auth-form">
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={(values, actions) =>
                handleSubmit(values, actions, props)
              }
            >
              {({ touched, errors, isSubmitting, values }) => (
                <Form>
                  <div className="form-group">
                    <Field
                      type="email"
                      name="email"
                      value={values.email}
                      placeholder="Email Address"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="password"
                      value={values.password}
                      name="password"
                      placeholder="Password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group auth-text">
                    <Link className="auth-link forgot" to={"/forgotpassword"}>
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Login"}
                  </button>

                  {/* <button className="btn-without-saving"> */}
                  <Link to="/calculation">
                    <button className="btn-without-saving">
                      Continue without saving
                    </button>
                  </Link>
                  {/* </button> */}
                  <div className="warning">
                    <p className="without-saving">
                      Your work will not be saved! We recommend logging in.
                    </p>
                    <p>{errorMsg}</p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <br />
          <div className="auth-text">
            New user? &nbsp;
            <Link className="auth-link" to={"/register"}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string
    })
  }),
  setLoggedInAccount: PropTypes.func.isRequired
};

export default withRouter(Login);
