import React from "react";
import { postPublicComment } from "./postPublicComment";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import Sidebar from "../Sidebar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import useToast from "../../contexts/Toast/useToast";

const useStyles = createUseStyles({
  publicCommentContainer: {
    height: "max-content",
    width: "80%",
    maxWidth: "840px"
  },
  pageTitle: {
    marginBottom: "16px"
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2em"
  },
  row: {
    display: "flex",
    flexWrap: "wrap"
  },
  formLabel: {
    minWidth: "236px"
  },
  formInput: {
    marginBottom: "1em",
    width: "100%"
  },
  formTextArea: {
    display: "block",
    marginBottom: "1em",
    width: "100%",
    height: "100px"
  },
  formErrorBorder: {
    border: "dotted red 2px"
  },
  errorMessage: {
    color: "red"
  },
  forwardToWebTeam: {
    marginTop: "32px",
    marginBottom: "40px"
  },
  submitButton: {
    marginTop: "1em",
    alignSelf: "flex-end"
  },
  disclaimer: {
    color: "#A9A9A9",
    marginTop: "40px",
    textAlign: "center"
  },
  //////////// TODO: Refactor root out with tdm-wizard related code///////////////
  root: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  }
});

//TODO: Refactor root, tdm-wizard, and tdm-wizard-content-container to its own component
const PublicCommentPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="tdm-wizard">
        <Sidebar />
        <div className="tdm-wizard-content-container">
          <PublicCommentForm />
        </div>
      </div>
    </div>
  );
};

const PublicCommentForm = () => {
  const classes = useStyles();
  const toast = useToast();

  const initialValues = {
    name: "",
    email: "",
    comment: "",
    forwardToWebTeam: false
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Must be 2 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address"),
    comment: Yup.string().required("Required")
  });

  const handleSubmit = async (
    { name, email, comment, forwardToWebTeam },
    { setSubmitting, resetForm }
  ) => {
    await new Promise(r => setTimeout(r, 500));

    try {
      const response = await postPublicComment({
        name,
        email,
        comment,
        forwardToWebTeam
      });

      if (response.status === 201) {
        toast.add("Comment delivered successfully");
        resetForm({});
      }
    } catch (err) {
      toast.add("Something went wrong");
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div className={classes.publicCommentContainer}>
      <h1 className={classes.pageTitle}>Public Comment Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={classes.formContainer}>
            <div className={classes.row}>
              <label htmlFor="name" className={classes.formLabel}>
                Name <span style={{ color: "red" }}>*</span>
                <ErrorMessage
                  name="name"
                  component="span"
                  className={classes.errorMessage}
                />
              </label>

              <Field
                name="name"
                type="text"
                className={clsx(
                  classes.formInput,
                  errors.name && touched.name && classes.formErrorBorder
                )}
              />
            </div>

            <div className={classes.row}>
              <label htmlFor="email" className={classes.formLabel}>
                Email Address &nbsp;
                <ErrorMessage
                  name="email"
                  component="span"
                  className={classes.errorMessage}
                />
              </label>

              <Field
                name="email"
                type="email"
                className={clsx(
                  classes.formInput,
                  errors.email && touched.email && classes.formErrorBorder
                )}
              />
            </div>

            <div className={classes.row}>
              <label htmlFor="comment" className={classes.formLabel}>
                Comment <span style={{ color: "red" }}>*</span>
                <ErrorMessage
                  name="comment"
                  component="span"
                  className={classes.errorMessage}
                />
              </label>

              <Field
                name="comment"
                as="textarea"
                className={clsx(
                  classes.formTextArea,
                  errors.comment && touched.comment && classes.formErrorBorder
                )}
              />
            </div>

            <div className={clsx(classes.row)}>
              <label
                htmlFor="forwardToWebTeam"
                className={classes.forwardToWebTeam}
              >
                Would you like your comment to also be delivered to the website
                team?&nbsp;
                <Field type="checkbox" name="forwardToWebTeam" />
              </label>
            </div>

            <Button
              type="submit"
              className={classes.submitButton}
              color="colorPrimary"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <p className={classes.disclaimer}>
        Disclaimer: Comments submitted will be part of the public record
      </p>
    </div>
  );
};

export default PublicCommentPage;
