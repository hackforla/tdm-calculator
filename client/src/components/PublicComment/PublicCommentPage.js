import React from "react";
import { postPublicComment } from "./postPublicComment";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import Sidebar from "../Sidebar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const useStyles = createUseStyles({
  //////////////////// TODO: Refactor all this out ///////////////////////////
  root: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  },
  tdmWizard: {
    display: "flex"
  },
  wizardContent: {
    flexBasis: "100%",
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center"
  },
  ////////////////////////// ^ Refactor all this out ^ ///////////////////
  publicCommentContainer: {
    backgroundColor: "pink",
    height: "max-content",
    width: "80%",
    maxWidth: "840px",
    margin: "4em 0"
  },
  formContainer: {
    display: "flex",
    flexDirection: "column"
  },
  formInput: {
    width: "70%",
    marginBotton: "1rem"
  },
  formLabel: {
    width: "25%",
    minWidth: "max-content",
    backgroundColor: "yellow"
  },
  formTextArea: {
    width: "70%",
    marginBotton: "1rem"
  },
  submitButton: {
    marginTop: "1rem"
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 12
  }
});

const PublicCommentForm = () => {
  const classes = useStyles();

  const initialValues = {
    name: "",
    email: "",
    comment: "",
    forwardToDevs: false
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Must be 2 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address"),
    comment: Yup.string().required("Required")
  });

  const handleSubmit = async (
    { name, email, comment, forwardToDevs },
    { setSubmitting }
  ) => {
    await new Promise(r => setTimeout(r, 500));

    postPublicComment({ name, email, comment, forwardToDevs });
    setSubmitting(false);
  };

  return (
    <div className={classes.publicCommentContainer}>
      <h2>Public Comment</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={classes.row}>
            <label htmlFor="name" className={classes.formLabel}>
              Name*
            </label>
            <Field name="name" type="text" className={classes.formInput} />
            <ErrorMessage name="name" />
          </div>

          <div className={classes.row}>
            <label htmlFor="email" className={classes.formLabel}>
              Email Address
            </label>
            <Field name="email" type="email" className={classes.formInput} />
            <ErrorMessage name="email" />
          </div>

          <div className={classes.row}>
            <label htmlFor="comment" className={classes.formLabel}>
              Comment*
            </label>
            <Field
              name="comment"
              as="textarea"
              className={classes.formTextArea}
            />
            <ErrorMessage name="comment" />
          </div>

          <div className={classes.row}>
            <label htmlFor="forwardToDevs">
              Would you like your comment to also be delivered to the website
              team? &nbsp;
              <Field type="checkbox" name="forwardToDevs" />
            </label>
          </div>

          <button type="submit" className={classes.submitButton}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

//TODO: Refactor Wizard Wrapper and styles to its own component
const PublicCommentPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={clsx("tdm-wizard", classes.tdmWizard)}>
        <Sidebar />
        <div className={classes.wizardContent}>
          <PublicCommentForm />
        </div>
      </div>
    </div>
  );
};

export default PublicCommentPage;
