import React, { useRef, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import * as feedbackService from "../../services/feedback.service";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import useToast from "../../contexts/Toast/useToast";
import ContentContainerWithTables from "../Layout/ContentContainerWithTables";
import useErrorHandler from "../../hooks/useErrorHandler";
import useProjects from "../../hooks/useGetProjects";
import ProjectList from "./ProjectList";

const useStyles = createUseStyles(theme => ({
  feedbackContainer: {
    height: "max-content",
    width: "90%"
  },
  pageTitle: {
    marginTop: 0,
    marginBottom: "16px",
    textAlign: "center"
  },
  formContainer: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    marginTop: "2em",
    width: "80%",
    maxWidth: "840px"
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
    border: "2px dotted red "
  },
  errorMessage: {
    color: theme.colorCritical,
    marginTop: "-0.5rem",
    marginBottom: "1rem"
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
}));

const GetUserProjects = email => {
  const navigate = useNavigate();
  const handleError = useErrorHandler(email, navigate);
  const [projects] = useProjects(handleError);
  return projects;
};

const FeedbackPage = ({ contentContainerRef }) => {
  const userContext = useContext(UserContext);
  const theme = useTheme();
  const classes = useStyles(theme);
  const focusRef = useRef(null);
  const toast = useToast();
  const account = userContext.account;
  const projects = !account
    ? null
    : account.email
      ? GetUserProjects(account.email)
      : [];
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
    // await new Promise(r => setTimeout(r, 500));
    try {
      const response = await feedbackService.post({
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
      toast.add(
        "An error occurred in transmitting your comment to the server."
      );
      resetForm({});
    }
    setSubmitting(false);
  };

  return (
    <ContentContainerWithTables contentContainerRef={contentContainerRef}>
      <div className={classes.feedbackContainer}>
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
              href="https://cityclerk.lacity.org/Feedback/?cfnumber=15-0719-S19"
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
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className={classes.formContainer}>
                <div className={classes.row}>
                  <label htmlFor="name" className={classes.formLabel}>
                    Project Name <span style={{ color: "red" }}>*</span>
                  </label>

                  <Field
                    id="name"
                    name="name"
                    innerRef={focusRef}
                    type="text"
                    placeholder="required"
                    className={clsx(
                      classes.formInput,
                      errors.name && touched.name && classes.formErrorBorder
                    )}
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={classes.errorMessage}
                  />
                </div>

                <div className={classes.row}>
                  <label htmlFor="email" className={classes.formLabel}>
                    Email Address &nbsp;
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
                  <ErrorMessage
                    name="email"
                    component="span"
                    className={classes.errorMessage}
                  />
                </div>

                <div className={classes.row}>
                  <label htmlFor="comment" className={classes.formLabel}>
                    Comment <span style={{ color: "red" }}>*</span>
                  </label>

                  <Field
                    id="comment"
                    name="comment"
                    placeholder="required"
                    as="textarea"
                    className={clsx(
                      classes.formTextArea,
                      errors.comment &&
                        touched.comment &&
                        classes.formErrorBorder
                    )}
                  />
                  <ErrorMessage
                    name="comment"
                    component="span"
                    className={classes.errorMessage}
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
              </div>

              {account && account.id && projects.length !== 0 ? (
                <ProjectList
                  key={JSON.stringify(projects, null, 2)}
                  projects={projects}
                  selectedProjects={selectedProjects}
                  setSelectedProjects={setSelectedProjects}
                />
              ) : null}

              <div className={classes.formContainer}>
                <Button
                  type="submit"
                  className={classes.submitButton}
                  color="colorPrimary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ContentContainerWithTables>
  );
};

FeedbackPage.propTypes = {
  contentContainerRef: PropTypes.object
};

export default FeedbackPage;
