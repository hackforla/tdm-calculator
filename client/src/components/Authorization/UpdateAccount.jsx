import React, { useState, useRef, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import * as accountService from "../../services/account.service";
import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "../Button/Button";
import ContentContainer from "../Layout/ContentContainer";
import Link from "components/Link/Link";

const useStyles = createUseStyles(theme => ({
  submitButton: {
    float: "right"
  },
  authText: {
    color: theme.colorCritical
  },
  warningText: {
    ...theme.typography.paragraph1,
    color: theme.colorCritical,
    textAlign: "left"
  },
  heading1: { ...theme.typography.heading1, textAlign: "auto" },
  pendingBanner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem"
  },
  pendingText: {
    margin: 0,
    ...theme.typography.paragraph1
  },
  cancelButton: {
    marginLeft: ".5rem"
  }
}));

const UpdateAccount = props => {
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const focusRef = useRef(null);
  const theme = useTheme();
  const classes = useStyles(theme);
  const params = useParams();
  const initialValues = {
    firstName: account?.firstName || "",
    lastName: account?.lastName || "",
    email: params.email || ""
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pendingEmail, setPendingEmail] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const fetchPendingEmail = async () => {
      try {
        const response = await accountService.getPendingEmail();
        if (response && response.requestedEmail) {
          setPendingEmail(response.requestedEmail);
        }
      } catch (err) {
        console.error("Failed to load pending email change:", err);
      }
    };

    fetchPendingEmail();
  }, []);

  const handleDeletePending = async () => {
    try {
      setIsCancelling(true);
      await accountService.deletePendingEmail();
      setPendingEmail(null);
    } catch (err) {
      console.error("Failed to cancel pending email:", err);
    } finally {
      setIsCancelling(false);
    }
  };

  const updateAccountSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required")
  });

  const handleSubmit = async (
    { firstName, lastName, email },
    { setSubmitting }
  ) => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await accountService.updateAccount(
        firstName,
        lastName,
        email
      );

      if (response.code === "ACCOUNT_EMAIL_UPDATE_SUCCESS") {
        userContext.updateAccount(response.user);
        setSubmitted(true);
        return;
      }

      switch (response.code) {
        case "ACCOUNT_UPDATE_SUCCESS":
          setSuccessMsg(response.message);
          userContext.updateAccount(response.user);
          break;

        case "ERR_INVALID_ADMIN_DOMAIN":
          setErrorMsg(response.message);
          break;

        case "EMAIL_UNAVAILABLE":
          setErrorMsg(
            `The email ${email} is unavailable. Please try another email.`
          );
          break;

        case "ERR_VERIFICATION_EMAIL_FAILED":
          setErrorMsg(
            `Sending the verification email to your email address failed. Please contact technical support.`
          );
          break;

        default:
          setErrorMsg(
            `An error occurred in updating the account for ${email}: ${response.message}`
          );
          break;
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
          <h1 className={classes.heading1}>Update Your Account</h1>
          <br />

          {pendingEmail && (
            <div className={classes.pendingBanner}>
              <p className={classes.pendingText}>
                <strong>Pending Email Update:</strong> Email verification link
                sent to <strong>{pendingEmail}</strong>.
              </p>
              <Link
                onClick={handleDeletePending}
                disabled={isCancelling}
                color="colorSecondary"
                className={classes.cancelButton}
              >
                {isCancelling ? "Cancelling..." : "Cancel Request"}
              </Link>
            </div>
          )}

          <div className="auth-form">
            <Formik
              initialValues={initialValues}
              validationSchema={updateAccountSchema}
              onSubmit={(values, actions) =>
                handleSubmit(values, actions, props)
              }
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="firstName" className="sr-only">
                      First Name
                    </label>
                    <Field
                      type="text"
                      innerRef={focusRef}
                      id="firstName"
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
                      className={classes.warningText}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="sr-only">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      className={`form-control ${
                        touched.lastName && errors.lastName ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className={classes.warningText}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    color="colorPrimary"
                    className={classes.submitButton}
                  >
                    {isSubmitting ? "Please wait..." : "Update Account"}
                  </Button>
                  <div className="warning">
                    <br />
                    {successMsg || errorMsg}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      ) : (
        <>
          <h1 className={classes.heading1}>
            Instructions have been sent to the email you provided in order to
            confirm email account updates.
          </h1>
          <h2>
            Please allow a few minutes for the email to arrive in your inbox.
          </h2>
        </>
      )}
      <br />
    </ContentContainer>
  );
};

export default UpdateAccount;
