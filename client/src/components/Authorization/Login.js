import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account.service";
import Button from "../Button/Button";
import clsx from "clsx";
import {
  useAppInsightsContext,
  useTrackMetric,
  useTrackEvent
} from "@microsoft/applicationinsights-react-js";

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
  "@media (max-width:768px)": {
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

  const appInsights = useAppInsightsContext();

  // appInsights.trackMetric("TDMCalculationContainer Component");
  const trackLogin = useTrackEvent(appInsights, "Login");
  const trackLoginFail = useTrackEvent(appInsights, "Login Failed");
  const trackComponent = useTrackMetric(appInsights, "Login");

  const handleSubmit = async (
    { email, password },
    { setSubmitting },
    { history }
  ) => {
    try {
      const loginResponse = await accountService.login(email, password);

      if (loginResponse.isSuccess) {
        setLoggedInAccount(loginResponse.user);
        trackLogin({ user: loginResponse.user.id });
        window.dataLayer.push({
          event: "login",
          action: "success",
          value: loginResponse.user.id
        });
        history.push("/calculation/1");
      } else if (loginResponse.code === "AUTH_NOT_CONFIRMED") {
        try {
          trackLoginFail({ reason: loginResponse.code });
          window.dataLayer.push({
            event: "customEvent",
            action: "login failed",
            value: "email not confirmed"
          });
          await accountService.resendConfirmationEmail(email);
          setErrorMsg(`Your email has not been confirmed.
          Please look through your email for a Registration
          Confirmation link and use it to confirm that you
          own this email address.`);
          setSubmitting(false);
        } catch (err) {
          window.dataLayer.push({
            event: "customEvent",
            action: "login failed",
            value: "failed to re-send confirmation email"
          });
          setErrorMsg(
            `An internal error occurred in sending an email to ${email}. `,
            err.message
          );
          setSubmitting(false);
        }
      } else if (loginResponse.code === "AUTH_NO_ACCOUNT") {
        trackLoginFail({ user: email, reason: loginResponse.code });
        window.dataLayer.push({
          event: "customEvent",
          action: "login failed",
          value: "account not found"
        });
        setErrorMsg(`The email ${email} does not correspond to an
        existing account. Please verify the email or register as a
        new account.`);
        setSubmitting(false);
      } else {
        trackLoginFail({ user: email, reason: loginResponse.code });
        window.dataLayer.push({
          event: "customEvent",
          action: "login failed",
          value: "invalid password"
        });
        // Presumably loginResponse.code === "AUTH_INVALID_PASSWORD"
        setErrorMsg(`The password is incorrect, please check it
        and try again or use the Forgot Password feature.`);
        setSubmitting(false);
      }
    } catch (err) {
      trackLoginFail({ user: email, reason: "unexpected error" });
      setErrorMsg(err.message);
    }
  };

  return (
    <div className={classes.root}>
      <div className={clsx("tdm-wizard", classes.tdmWizard)}>
        <div className="tdm-wizard-sidebar" />
        <div className="tdm-wizard-content-container" onClick={trackComponent}>
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
                      id="cy-login-email"
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
                      id="cy-login-password"
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
                    <Link
                      id="cy-login-nav-to-forgotpassword"
                      className="auth-link forgot"
                      to={"/forgotpassword"}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    id="cy-login-submit"
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Login"}
                  </Button>
                  {/* <button className="btn-without-saving"> */}
                  <Link to="/calculation/1">
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
            <Link
              id="cy-login-nav-to-register"
              className="auth-link"
              to={"/register"}
            >
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
