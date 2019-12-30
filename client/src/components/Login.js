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
        toast.add('Login successful.')
        history.push("/admin");
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
    //   .then(res => {
    //     console.log("handleLogin response:", res);
    //     setLoggedInAccount(res.data.account);
    //   })
    //   .then(history.push("/admin"))
    //   .catch(err => console.log(err));
    // setSubmitting(false);
    // // alert("Form is validated! Submitting the form...");
    // resetForm(initialValues);
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="auth-form">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions, props)}
        >
          {({ touched, errors, isSubmitting, values }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="email"
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
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  value={values.password}
                  name="password"
                  placeholder="password"
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

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        New to the site? <Link to={`/register`}>Register here.</Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
