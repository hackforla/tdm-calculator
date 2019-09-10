import React from "react";
import { Link } from "react-router-dom";
import { handleRegister } from "../services/account-service";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = { email: "", password: "" };

const handleSubmit = (
  { email, password },
  { setSubmitting, resetForm, setErrors }
) => {
  handleRegister(email, password)
    .then(res => console.log(res))
    .then({ email: "", password: "" })
    .catch(err => console.log(err));
  setSubmitting(false);
  resetForm(initialValues);
};

const Register = () => (
  <div>
    <h1>Register</h1>
    <Formik
      initialValues={initialValues}
      validate={({ email, password, confirmed }) => {
        let errors = {};
        if (!email) {
          errors.email = "Email Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          Email:
          <Field type="email" name="email" placeholder="email" />
          <ErrorMessage name="email" component="div" />
          Password:
          <Field type="password" name="password" placeholder="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Register;
