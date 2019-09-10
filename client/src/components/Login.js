import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { handleLogin } from "../services/account-service";
import { Formik, Form, Field, ErrorMessage } from "formik";
const API = "/api/account/login";

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null
//     };
//   }

//   componentDidMount() {
//     let user = {
//       email: "vivian1@tdm.com",
//       password: "tdmpassword"
//     };

// axios.post(API, user).then(LoginResponse => {
//   console.log(LoginResponse);
//   localStorage.setItem("token", LoginResponse.data.token);
//   console.log(
//     "localStorage.getItem('token')",
//     localStorage.getItem("token")
//   );
// });
//   }

//   render() {
//     return <div></div>;
//   }
// }

// export default Login;

const initialValues = { email: "", password: "" };

const handleSubmit = (
  { email, password },
  { setSubmitting, resetForm, setErrors }
) => {
  handleLogin(email, password)
    .then(res => console.log("handleLogin response:", res))
    .then({ email: "", password: "" })
    .catch(err => console.log(err));
  setSubmitting(false);
  resetForm(initialValues);
};

const Login = () => (
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

export default Login;
