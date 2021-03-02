import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import * as accountService from "../../services/account.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import clsx from "clsx";
import { useToast } from "../../contexts/Toast";
import { useStyles } from "./SendEmailForm";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Password is Required"),
  passwordConfirm: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match")
});

const ResetPassword = props => {
  const [success, setSuccess] = useState(false);
  const { token } = props.match.params;
  const classes = useStyles();
  const toast = useToast();

  const handleSubmit = async ({ token, password }, { setFieldError }) => {
    const submitResponse = await accountService.resetPassword({
      token,
      password
    });
    if (submitResponse.data.isSuccess) {
      setSuccess(submitResponse.data.email);
      toast.add("Your password has been reset. Please log in.");
    } else {
      setFieldError("passwordConfirm", submitResponse.data.message);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.formContent}>
        {!success ? (
          <>
            <h1 className={classes.pageTitle}>Reset Your Password</h1>
            <Formik
              initialValues={{
                token,
                password: "",
                passwordConfirm: ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values, action) => {
                handleSubmit(values, action);
              }}
            >
              {formikProps => {
                const { touched, errors, values } = formikProps;
                return (
                  <Form>
                    <div className={classes.fieldGroup}>
                      <Field
                        type="password"
                        value={values.password}
                        name="password"
                        placeholder="Password"
                        className={clsx(
                          classes.inputField,
                          touched.password && errors.password
                            ? classes.error
                            : ""
                        )}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className={classes.errorMessage}
                      />
                      <Field
                        type="password"
                        value={values.passwordConfirm}
                        name="passwordConfirm"
                        placeholder="Confirm Password"
                        className={clsx(
                          classes.inputField,
                          touched.passwordConfirm && errors.passwordConfirm
                            ? classes.error
                            : ""
                        )}
                      />
                      <ErrorMessage
                        name="passwordConfirm"
                        component="div"
                        className={classes.errorMessage}
                      />
                      <Button type="submit" color="colorPrimary">
                        Submit
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </>
        ) : (
          <>
            <h1 className={classes.pageTitle}>Password Reset Successful!</h1>
            <h3>Redirecting to login</h3>
            <div className="hide">
              {setTimeout(() => {
                props.history.push(`/login/${success}`);
              }, 2000)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default withRouter(ResetPassword);
