import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as accountService from "../services/account-service";
import { useToast } from "../contexts/Toast";

const Login = props => {
  const { setLoggedInAccount, match } = props;
  const initialValues = {
    email: match.params.email ? decodeURIComponent(match.params.email) : "",
    password: ""
  };

  const toast = useToast()

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .required("Password is required")
  });

  const handleSubmit = async (
    { email, password },
    { setSubmitting, resetForm, setErrors },
    { history }
  ) => {
    try {
      const loginResponse = await accountService.login(email, password);

      if (loginResponse.isSuccess) {
        setLoggedInAccount(loginResponse.user);
        history.push("/calculation");
      } else if (loginResponse.code === "AUTH_NOT_CONFIRMED") {
        try {
          await accountService.resendConfirmationEmail(email);
          toast.add(`Your email has not been confirmed.
            Please look through your email for a Registration
            Confirmation link and use it to confirm that you
            own this email address.`)
          setSubmitting(false);
        } catch (err) {
          toast.add(`An internal error occurred in sending an email to ${email}. `, err.message)
          setSubmitting(false);
        }
      } else if (loginResponse.code === "AUTH_NO_ACCOUNT") {
        toast.add(`The email ${email} does not correspond to an
          existing account. Please verify the email or register as a
          new account.`)
        setSubmitting(false);
      } else {
        // Presumably loginResponse.code === "AUTH_INVALID_PASSWORD"
        toast.add(`The password is incorrect, please check it
          and try again or use the Forgot Password feature.`)
        setSubmitting(false);
      }
    } catch (err) {
      toast.add(err.message)
    }
  };

  return (
    <div style={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }} >
      <div className="tdm-wizard" style={{ flex: "1 0 auto", display: "flex", flexDirection: "row" }}>
        <div className="tdm-wizard-sidebar">
        </div>
        <div className="tdm-wizard-content-container" style={{justifyContent: "center"}}>
        
        <h1 style={{fontWeight: 500}}>Welcome to Los Angeles' TDM Calculator</h1>
        <h3 style={{fontWeight: 100}}>Please sign into your account to save progress.</h3>
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
                  <Field name="keep-signed-in" component="input" type="checkbox" checked="true" /> Keep me signed in
                  <Link className="auth-link forgot"to={`/forgot-password`}>Forgot password?</Link>
                </div>

                <button
                  type="submit"
                  className="btn-login"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : "Login"}
                </button>
                <button 
                  className="btn-without-saving"
                >
                  <Link to="/calculation">Continue without saving</Link>
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <br/>
        <div className="auth-text">
          New user? <Link className="auth-link" to={`/register`}>Create an account</Link>
        </div>
      </div>       
    </div>
  </div>    
  );
};

export default withRouter(Login);
