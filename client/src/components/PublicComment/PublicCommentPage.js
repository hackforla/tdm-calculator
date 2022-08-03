import React, { useEffect, useRef } from "react";
import { postPublicComment } from "./postPublicComment";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import useToast from "../../contexts/Toast/useToast";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles({
  publicCommentContainer: {
    height: "max-content",
    width: "80%",
    maxWidth: "840px"
  },
  pageTitle: {
    marginBottom: "16px",
    textAlign: "center"
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
  }
});

const PublicCommentPage = () => {
  const focusRef = useRef(null);
  const classes = useStyles();
  const toast = useToast();

  useEffect(() => {
    focusRef.current.focus();
  });

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
      console.error(err);
      toast.add(
        "An error occurred in transmitting your comment to the server."
      );
      resetForm({});
    }
    setSubmitting(false);
  };

  return (
    <ContentContainer componentToTrack="PublicCommentPage">
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
                  innerRef={focusRef}
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
                  id="email"
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
                  id="comment"
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
                  Would you like your comment to also be delivered to the
                  website team?&nbsp;
                  <Field
                    id="forwardToWebTeam"
                    type="checkbox"
                    name="forwardToWebTeam"
                  />
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
    </ContentContainer>
  );
};

export default PublicCommentPage;
