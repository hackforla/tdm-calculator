import React from "react";
import * as accountService from "../services/account-service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, withRouter } from "react-router-dom";
import * as Yup from "yup";

const Register = props => {
  const { match } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    email: match.params.email || "",
    password: "",
    passwordConfirm: ""
  };

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match")
  });

  const handleSubmit = async (
    { firstName, lastName, email, password },
    { setSubmitting, resetForm, setErrors },
    { history }
  ) => {
    try {
      const response = await accountService.register(
        firstName,
        lastName,
        email,
        password
      );
      if (response.isSuccess) {
        // TODO - replace console.log with Toast telling user to check their email for
        // a confirmation message.
        console.log("handleRegister response: ", response);
        history.push("/login/" + email);
      } else if (response.code === "REG_DUPLICATE_EMAIL") {
        // TODO: replace console.log with Toast
        console.log(`The email ${email} is already registered. 
        Please login or use the Forgot Password feature if you have 
        forgotten your password.`);
        // props.setToast({
        //   message: `The email ${email} is already registered.
        //   Please login or use the Forgot Password feature if you have
        //   forgotten your password.`
        // });
        setSubmitting(false);
      } else {
        // TODO: replace console.log with Toast
        console.log(`An error occurred in sending the 
        confirmation message to ${email}. 
        Try to log in, and follow the instructions for re-sending the 
        confirmation email.`);
        // props.setToast({
        //   message: `An error occurred in sending the
        //   confirmation message to ${email}.
        //   Try to log in, and follow the instructions for re-sending the
        //   confirmation email.`
        // });
        setSubmitting(false);
      }
    } catch (err) {
      // TODO: replace console.log with Toast
      console.log(err);
      setSubmitting(false);
    }
    // TODO: figure out if there is a scanrio where you actually
    // want to reset the form, and move/copy the next line accordingly
    //resetForm(initialValues);
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
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={`form-control ${
                    touched.firstName && errors.firstName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
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
              <div className="form-group">
                <label htmlFor="passwordConfirm">Password</label>
                <Field
                  type="password"
                  name="passwordConfirm"
                  placeholder="Retype Password"
                  className={`form-control ${
                    touched.passwordConfirm && errors.passwordConfirm
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="passwordConfirm"
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
