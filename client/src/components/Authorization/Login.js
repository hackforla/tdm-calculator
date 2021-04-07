import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter, useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account.service";
import Button from "../Button/Button";
import {
  useAppInsightsContext,
  useTrackEvent
} from "@microsoft/applicationinsights-react-js";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles({
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "16px auto"
  },
  warning: {
    color: "red",
    textAlign: "center",
    marginBottom: "2em"
  },
  withoutSavingWarning: {
    visibility: ({ withoutSavingWarningIsVisible }) =>
      withoutSavingWarningIsVisible ? "visible" : "hidden"
  }
});

const Login = props => {
  const { setLoggedInAccount, match } = props;
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [
    withoutSavingWarningIsVisible,
    setWithoutSavingWarningIsVisible
  ] = useState(false);
  const classes = useStyles({ withoutSavingWarningIsVisible });

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

          const resendResponse = await accountService.resendConfirmationEmail(
            email
          );
          if (resendResponse.code === "REG_SUCCESS") {
            setErrorMsg(`A new confirmation email has been sent.
            Please look through your email for a "Verify Your Account" subject line.
            Click the provided link to verify that you own this email address.`);
          } else {
            setErrorMsg(
              `We found your email address but there was an error trying to resend your confirmation email.`
            );
          }
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
    <ContentContainer componentToTrack="Login">
      <h1 className="tdm-wizard-page-title">
        Welcome to Los Angeles&rsquo; TDM Calculator
      </h1>
      <h3 className="tdm-wizard-page-subtitle">
        Please sign into your account to save progress
      </h3>
      <br />
      <div className="auth-form">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions, props)}
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
              <Link
                id="cy-login-nav-to-forgotpassword"
                to={"/forgotpassword"}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                Forgot password?
              </Link>
              <div className={classes.buttonsContainer}>
                <div
                  onMouseOver={() => setWithoutSavingWarningIsVisible(true)}
                  onMouseOut={() => setWithoutSavingWarningIsVisible(false)}
                >
                  <Button
                    color="colorDefault"
                    variant="text"
                    onClick={() => {
                      history.push("/calculation/1");
                    }}
                  >
                    Continue without saving
                  </Button>
                </div>
                <Button
                  id="cy-login-submit"
                  type="submit"
                  disabled={isSubmitting}
                  color="colorPrimary"
                >
                  {isSubmitting ? "Please wait..." : "Login"}
                </Button>
              </div>
              <div className={classes.warning}>
                <p className={classes.withoutSavingWarning}>
                  Your work will not be saved! We recommend logging in.
                </p>
                <p>{errorMsg}</p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <br />
      <div>
        New user? &nbsp;
        <Link id="cy-login-nav-to-register" to={"/register"}>
          Create an account
        </Link>
      </div>
    </ContentContainer>
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
