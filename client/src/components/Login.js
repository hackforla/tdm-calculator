import React from "react";
import { Link, withRouter } from "react-router-dom";
import { handleLogin } from "../services/account-service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = props => {
  const { logInAccount } = props;
  const initialValues = { email: "", password: "" };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .required("Password is required")
  });

  const handleSubmit = (
    { email, password },
    { setSubmitting, resetForm, setErrors },
    { history }
  ) => {
    handleLogin(email, password)
      .then(async res => {
        console.log("handleLogin response:", res);
        logInAccount(res.data.account);
      })
      .then(history.push("/admin"))
      .catch(err => console.log(err));
    setSubmitting(false);
    // alert("Form is validated! Submitting the form...");
    resetForm(initialValues);
  };
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions, props)}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
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

            <button type="submit" className="" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>

      <div>
        New to the site? <Link to="/register">Register here.</Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
