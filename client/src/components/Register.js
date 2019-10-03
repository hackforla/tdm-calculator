import React from "react";
import { handleRegister } from "../services/account-service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, withRouter } from "react-router-dom";
import * as Yup from "yup";

const Register = props => {
  const initialValues = { email: "", password: "" };

  const registerSchema = Yup.object().shape({
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
    handleRegister(email, password)
      .then(res => console.log("handleRegister response: ", res))
      .then({ email: "", password: "" })
      .then(history.push("/login"))
      .catch(err => console.log(err));
    setSubmitting(false);
    resetForm(initialValues);
  };
  return (
    <div>
      <h1>Register</h1>
      <div className="auth-form">
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
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
        Already have an account? <Link to="/login">Login here.</Link>
      </div>
    </div>
  );
};

export default withRouter(Register);
