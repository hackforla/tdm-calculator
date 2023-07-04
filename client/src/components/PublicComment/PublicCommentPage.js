import React, { useRef, useEffect, useState } from "react";
import { postPublicComment } from "./postPublicComment";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import PropTypes from "prop-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import useToast from "../../contexts/Toast/useToast";
import ContentContainer from "../Layout/ContentContainer";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProjects from "../../hooks/useGetProjects";
import { withRouter } from "react-router-dom";
import ProjectList from "./ProjectList";

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
  subtitle: {
    marginTop: "0px",
    textAlign: "center",
    padding: 0
  }
});

const PublicCommentPage = ({ account, history }) => {
  const focusRef = useRef(null);
  const classes = useStyles();
  const toast = useToast();
  const historyPush = history.push;
  const email = account.email;
  const handleError = useErrorHandler(email, historyPush);
  const projects = useProjects(handleError);
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const initialValues = {
    name: "",
    email: "",
    comment: "",
    forwardToWebTeam: false,
    selectedProjects: []
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
        forwardToWebTeam,
        selectedProjects
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
        <h1 className={classes.pageTitle}>TDM Calculator Feedback Form</h1>
        <div className={classes.subtitle}>
          <p>
            This form is for comments and suggestions regarding the TDM
            Calculator website. <br />
            To submit a public comment on the proposed TDM Program (
            <a
              target="external"
              href=" https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=15-0719-S19"
            >
              Council File 15-0719-S19
            </a>
            ), use the{" "}
            <a
              target="external"
              href="https://cityclerk.lacity.org/publiccomment/?cfnumber=15-0719-S19"
            >
              City Clerk&apos;s comment form
            </a>
            .
          </p>
        </div>
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
              <ProjectList
                key={JSON.stringify(projects, null, 2)}
                projects={projects}
                selectedProjects={selectedProjects}
                setSelectedProjects={setSelectedProjects}
              />
              {/* <div>{JSON.stringify(projects, null, 2)}</div> */}
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
      </div>
    </ContentContainer>
  );
};

PublicCommentPage.propTypes = {
  account: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default withRouter(PublicCommentPage);
