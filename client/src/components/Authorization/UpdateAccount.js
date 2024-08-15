import React, { useState, useRef, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import * as accountService from "../../services/account.service";
import { createUseStyles } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import Button from "../Button/Button";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles({
  submitButton: {
    float: "right"
  },
  authText: {
    color: "#979797"
  }
});

const UpdateAccount = props => {
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const focusRef = useRef(null);
  const classes = useStyles();
  const params = useParams();
  const initialValues = {
    firstName: account.firstName || "",
    lastName: account.lastName || "",
    email: params.email || ""
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
        setSubmitted(true);
        userContext.updateAccount({});
      } else if (response.code === "REG_DUPLICATE_EMAIL") {
        setErrorMsg(`The email ${email} is already registered. Please
          login or use the Forgot Password feature if you have
          forgotten your password.`);
      } else {
        setErrorMsg(`An error occurred in updating the account
          for ${email}.`);
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
          <h1>Update Your Account</h1>
          <br />
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
                      className="invalid-feedback"
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
                      className="invalid-feedback"
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
                      className="invalid-feedback"
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
        </>
      ) : (
        <>
          <h1>
            Instructions have been sent to the email you provided in order to
            confirm account updates.
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
