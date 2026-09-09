import React, { useState, useRef, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import * as accountService from "../../services/account.service";
import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "../Button/Button";
import ContentContainer from "../Layout/ContentContainer";
import { useToast } from "../../contexts/Toast";

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
  heading1: { ...theme.typography.heading1, textAlign: "auto" }
}));

const UpdateAccount = props => {
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const focusRef = useRef(null);
  const theme = useTheme();
  const classes = useStyles(theme);
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const initialValues = {
    firstName: account?.firstName || "",
    lastName: account?.lastName || "",
    email: params.email || ""
  };

  const [errorMsg, setErrorMsg] = useState("");

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
    try {
      const response = await accountService.updateAccount(
        firstName,
        lastName,
        email
      );

      if (response.isSuccess) {
        userContext.updateAccount({});
        toast.add("Your account has been updated. Please log in.");
        navigate(`/login/${encodeURIComponent(email)}`);
        return;
      }

      switch (response.code) {
        case "ERR_INVALID_ADMIN_DOMAIN":
          setErrorMsg(response.message);
          break;

        case "ERR_DUPLICATE_EMAIL":
          setErrorMsg(
            `The email ${email} is already registered. Please login or use the Forgot Password feature.`
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
      <h1 className={classes.heading1}>Update Your Account</h1>
      <br />
      <div className="auth-form">
        <Formik
          initialValues={initialValues}
          validationSchema={updateAccountSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions, props)}
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
                    touched.firstName && errors.firstName ? "is-invalid" : ""
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
                {errorMsg}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <br />
    </ContentContainer>
  );
};

export default UpdateAccount;
