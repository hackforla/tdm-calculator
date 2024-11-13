import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as accountService from "../../services/account.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import clsx from "clsx";
import { useToast } from "../../contexts/Toast";
import { useStyles } from "./SendEmailForm";
import ContentContainer from "../Layout/ContentContainer";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(
      12,
      "Your password must have at least 12 characters, at least one number, one capitalization, and one special character (e.g., !@#$%&*?)"
    )
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?])[A-Za-z\d@$!%*#?&]{12,}$/,
      "Your password must have at least 12 characters, at least one number, one capitalization, and one special character (e.g., !@#$%&*?)"
    )
    .required("Password is Required"),
  passwordConfirm: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match")
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const focusRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const params = useParams();
  const token = params.token;
  const classes = useStyles();
  const toast = useToast();

  useEffect(() => {
    focusRef.current.focus();
  });

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
    <ContentContainer>
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
                      innerRef={focusRef}
                      value={values.password}
                      name="password"
                      placeholder="Password"
                      className={clsx(
                        classes.inputField,
                        touched.password && errors.password ? classes.error : ""
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
              navigate(`/login/${success}`);
            }, 2000)}
          </div>
        </>
      )}
    </ContentContainer>
  );
};

export default ResetPassword;
