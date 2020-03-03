import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as accountService from "../../services/account-service";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import Sidebar from "../Sidebar";

export const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "calc(100vh - 103px)"
  },
  content: {
    position: "relative",
    height: "calc(100vh - 103px)",
    width: "calc(100vw - 387px)"
  },
  backLink: {
    position: "absolute",
    color: "#979797",
    fontSize: "20px",
    top: "20px",
    left: "20px",
    zIndex: "10"
  },
  formContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > h1": {
      fontFamily: "Calibri, sans serif",
      fontWeight: "bold",
      fontSize: "25px",
      lineHeight: "30px"
    },
    "& > h2": {
      marginTop: "15px",
      fontSize: "20px",
      lineHeight: "24px"
    }
  },
  form: {
    marginTop: "48px",
    "& > button": {
      height: "60px",
      width: "426px",
      backgroundColor: "#D8D8D8",
      border: "none",
      fontWeight: "bold"
    }
  },
  fieldGroup: {
    width: "100%",
    height: "90px"
  },
  inputField: {
    width: "403px",
    height: "30px",
    border: "1px solid #979797"
  },
  error: {
    borderColor: "#dc3545"
  },
  errorMessage: {
    marginTop: "10px",
    width: "100%",
    height: "30px",
    color: "red"
  },
  authText: {
    color: "#979797",
    marginTop: "20px"
  },
  authLink: {
    color: "#979797"
  }
});

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required")
});

export function ResetPasswordRequest() {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async ({ email }, { setFieldError }) => {
    const submitResponse = await accountService.resetPasswordRequest(email);
    if (submitResponse.data.isSuccess) {
      setSubmitted(true);
    } else if (
      submitResponse.data.code === "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND"
    ) {
      setFieldError(
        "email",
        "That email address is not associated with any accounts"
      );
    }
  };

  return (
    <div className={classes.root}>
      <Sidebar />
      <div className={classes.content}>
        <Link className={classes.backLink} to={"/login"}>
          {"< Return to Login"}
        </Link>
        <div className={classes.formContent}>
          {!submitted ? (
            <>
              <h1>Please enter the email registered with your account.</h1>
              <h3>An email will be sent with further recovery instructions.</h3>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  handleSubmit(values, actions);
                }}
              >
                {({ touched, errors, values }) => (
                  <Form className={classes.form}>
                    <div className={classes.fieldGroup}>
                      <Field
                        type="email"
                        value={values.email}
                        name="email"
                        placeholder="Registered Email Address"
                        className={clsx(
                          classes.inputField,
                          touched.email && errors.email ? classes.error : null
                        )}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={classes.errorMessage}
                      />
                    </div>
                    <button type="submit">Send Recovery Email</button>
                  </Form>
                )}
              </Formik>
              <div className={classes.authText}>
                New user? &nbsp;
                <Link className={classes.authLink} to={"/register"}>
                  Create an account
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1>
                Account recovery instructions have been sent to the email you
                provided.
              </h1>
              <h2>
                Please allow a few minutes for the email to arrive in your
                inbox.
              </h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(ResetPasswordRequest);
