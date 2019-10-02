import React, { useState, useEffect } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { handleLogin } from "../services/account-service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const initialValues = { email: "", password: "" };

const Login = props => {
  const { loginAccount } = props;

  const handleSubmit = (
    { email, password },
    { setSubmitting, resetForm, setErrors },
    { history }
  ) => {
    handleLogin(email, password)
      .then(async res => {
        console.log("handleLogin response:", res);
        console.log("account", res.data.account);
        loginAccount(res.data.account);
      })
      .then(history.push("/admin")) // doesn't work: .then(res => <Redirect to="/admin" />)
      .catch(err => console.log(err));
    setSubmitting(false);
    resetForm(initialValues);
  };
  return (
    <div>
      <h1>Login</h1>
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
        onSubmit={(values, actions) => handleSubmit(values, actions, props)}
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
};

export default withRouter(Login);
