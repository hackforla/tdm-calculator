import React, { useState, useRef, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import PropTypes from "prop-types";
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account.service";
import Button from "../Button/Button";
import {
  useAppInsightsContext,
  useTrackEvent
} from "@microsoft/applicationinsights-react-js";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles(theme => ({
  warningText: {
    ...theme.typography.paragraph1,
    color: theme.colors.warning,
    textAlign: "left"
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "16px auto"
  },
  warning: {
    color: "red",
    textAlign: "center",
    marginBottom: "2em"
  }
}));

const Login = props => {
  const focusRef = useRef(null);
  const userContext = useContext(UserContext);
  const { match } = props;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const projectId = searchParams.get("projectId");
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [withoutSavingWarningIsVisible, setWithoutSavingWarningIsVisible] =
    useState(false);
  const classes = useStyles();
  const theme = useTheme();
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
        userContext.updateAccount(loginResponse.user);
        trackLogin({ user: loginResponse.user.id });
        window.dataLayer.push({
          event: "login",
          action: "success",
          value: loginResponse.user.id
        });
        if (projectId) {
          history.push(`/calculation/5/${projectId}`);
        } else {
          history.push("/calculation/1");
        }
      } else if (loginResponse.code === "USER_ARCHIVED") {
        setErrorMsg(`Login Failed - This account has been archived.`);
        setSubmitting(false);
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
      <div style={theme.typography.heading1}>
        <span>Welcome to Los Angeles&rsquo; TDM Calculator</span>
      </div>
      <div style={theme.typography.subHeading}>
        <span>Please sign into your account to save progress</span>
      </div>
      <br />
      <div className="auth-form">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions, props)}
        >
          {({ touched, errors, isSubmitting, values }) => {
            const isDisabled = !!(
              isSubmitting ||
              errors.email ||
              errors.password ||
              !values.email ||
              !values.password
            );

            return (
              <Form>
                <div className="form-group">
                  <Field
                    id="cy-login-email"
                    innerRef={focusRef}
                    type="email"
                    autofill="username"
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
                    className={classes.warningText}
                  />
                </div>
                <div className="form-group">
                  <Field
                    id="cy-login-password"
                    type="password"
                    autofill="current-password"
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
                    className={classes.warningText}
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
                    disabled={isDisabled}
                    color="colorPrimary"
                  >
                    {isSubmitting ? "Please wait..." : "Login"}
                  </Button>
                </div>
                <div className={classes.warningText}>
                  <span hidden={!withoutSavingWarningIsVisible}>
                    Your work will not be saved! We recommend logging in.
                  </span>
                  <p>{errorMsg}</p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <br />
      <div>
        New user? &nbsp;
        <a
          id="cy-login-nav-to-register"
          onClick={() => {
            history.push("/register");
          }}
        >
          Create an account
        </a>
      </div>
    </ContentContainer>
  );
};
Login.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string
    })
  })
};

export default withRouter(Login);
