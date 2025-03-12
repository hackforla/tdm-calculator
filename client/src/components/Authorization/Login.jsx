import React, { useState, useRef, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account.service";
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
  warningText: {
    color: theme.colorCritical
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "16px auto"
  }
}));

// const useStyles = createUseStyles(theme => ({
//   warningText: {
//     ...theme.typography.paragraph1,
//     color: theme.colors.warning,
//     textAlign: "left"
//   },

//   warning: {
//     color: "red",
//     textAlign: "center",
//     marginBottom: "2em"
//   }
// }));

const Login = () => {
  const focusRef = useRef(null);
  const theme = useTheme();
  const classes = useStyles(theme);
  const params = useParams();
  const userContext = useContext(UserContext);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const projectId = searchParams.get("projectId");
  const redirectUrl = searchParams.get("url");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [withoutSavingWarningIsVisible, setWithoutSavingWarningIsVisible] =
    useState(false);

  const initialValues = {
    email: params.email ? decodeURIComponent(params.email) : "",
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

  const handleSubmit = async ({ email, password }, { setSubmitting }) => {
    try {
      const loginResponse = await accountService.login(email, password);

      if (loginResponse.isSuccess) {
        userContext.updateAccount(loginResponse.user);
        if (projectId) {
          navigate(`/calculation/5/${projectId}`);
        } else if (redirectUrl) {
          navigate(`/${redirectUrl}`);
        } else {
          navigate("/calculation/1/0");
        }
      } else if (loginResponse.code === "USER_ARCHIVED") {
        setErrorMsg(`Login Failed - This account has been archived.`);
        setSubmitting(false);
      } else if (loginResponse.code === "AUTH_NOT_CONFIRMED") {
        try {
          const resendResponse =
            await accountService.resendConfirmationEmail(email);
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
    <ContentContainer>
      <h1 style={theme.typography.heading1}>
        Welcome to Los Angeles&rsquo; TDM Calculator
      </h1>
      <div style={theme.typography.subHeading}>
        Please sign into your account to save progress
      </div>
      <div className={classes.authForm}>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
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
                <div>
                  <Field
                    id="cy-login-email"
                    innerRef={focusRef}
                    type="email"
                    autofill="username"
                    name="email"
                    value={values.email}
                    placeholder="Email Address"
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
                    id="cy-login-password"
                    type="password"
                    autofill="current-password"
                    value={values.password}
                    name="password"
                    placeholder="Password"
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
                      variant="secondary"
                      onClick={() => {
                        navigate("/calculation/1/0");
                      }}
                    >
                      Continue without saving
                    </Button>
                  </div>
                  <Button
                    id="cy-login-submit"
                    type="submit"
                    disabled={isDisabled}
                    variant="primary"
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
            navigate("/register");
          }}
        >
          Create an account
        </a>
      </div>
    </ContentContainer>
  );
};

export default Login;
