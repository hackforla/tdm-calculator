import React from 'react';
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as accountService from "../services/account-service";
import {createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backLink: {
    position: 'absolute',
    color: '#979797',
    fontSize: '20px',
    top: '20px',
    left: '20px',
  },
  content: {
    display: 'flex',
    position: 'relative',
    top: '150px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > h1': {
      fontWeight: 'bold',
      fontSize: '25px',
      lineHeight: '30px',
    },
    '& > h3': {
      marginTop: '15px',
      fontSize: '20px',
      lineHeight: '24px'
    }

  },
  form: {
    marginTop: '48px',
    '& > button': {
      height: '60px',
      width: '426px',
      backgroundColor: '#D8D8D8',
      border: 'none',
      fontWeight: 'bold',
    }
  },
  fieldGroup: {
    width: '100%',
    height: '100px',
  },
  inputField: {
    width: '403px',
    height: '30px',
    border: '1px solid #979797',
  },
  error: {
    borderColor: '#dc3545',
  },
  errorMessage: {
    marginTop: '10px',
    width: '100%',
    height: '30px',
    color: 'red',
  }
})

export function ResetPasswordRequest(props) {
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
  });

  const handleSubmit = async (
    { email }, { setSumitting, setFieldError }
  ) => {
    const submitResponse = await accountService.resetPasswordRequest(email)
    if (!submitResponse.data.isSuccess) {
      setFieldError('email',submitResponse.data.message)
      console.log('response', submitResponse)
    }
    const { history } = props.match
  }

  return(
    <div className={classes.root}>
      <Link className={classes.backLink} to={`/login`}>
        {`< Return to Login`}
      </Link>
      <div className={classes.content}>
        <h1>
          Please enter the email registered with your account.
        </h1>
        <h3>
          An email will be sent with further recovery instructions.
        </h3>
        <Formik
          initialValues={{email: ''}}
          validationSchema={validationSchema}
          onSubmit={( values, actions) => {
            handleSubmit(values, actions)
          }}>
            {({ touched, errors, isSubmitting, values}) => (
              <Form className={classes.form}>
                <div className={classes.fieldGroup}>
                  <Field
                    type='email'
                    value={values.email}
                    name='email'
                    placeholder='Registered Email Address'
                    className={
                      clsx(classes.inputField, touched.email && errors.email ? classes.error : null)
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={classes.errorMessage}
                  />
                </div>
                <button
                  type='submit'
                >
                  Send Recovery Email
                </button>
              </Form>
            )}
          </Formik>
      </div>
    </div>
  )
}

export default withRouter(ResetPasswordRequest);