import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import * as accountService from "../../services/account.service";
import { useToast } from "../../contexts/Toast";
import SendEmailForm from "./SendEmailForm";
import ContentContainer from "../Layout/ContentContainer";

const ConfirmEmail = props => {
  const { history, match } = props;
  const token = match.params.token;
  const [submitted, setSubmitted] = useState(false);
  const [confirmResult, setConfirmResult] = useState(false);
  const toast = useToast();

  const handleSubmit = async ({ email }, { setFieldError }) => {
    const submitResponse = await accountService.resendConfirmationEmail(email);
    if (submitResponse) {
      setSubmitted(true);
    } else if (
      submitResponse.data.code === "RESEND_CONFIRMATION_EMAIL_ACCOUNT_NOT_FOUND"
    ) {
      setFieldError(
        "email",
        "That email address is not associated with any accounts"
      );
    }
  };

  useEffect(() => {
    const confirmEmail = async token => {
      const result = await accountService.confirmRegister(token);
      setConfirmResult(result);
      if (result.success) {
        toast.add("Your email has been confirmed. Please log in.");
        history.push(`/login/${encodeURIComponent(result.email)}`);
      }
    };
    if (token) {
      confirmEmail(token);
    }
  }, [token]);

  return confirmResult.success ? (
    <Redirect to={`/login/${confirmResult.email}`} />
  ) : (
    <ContentContainer componentToTrack="ConfirmEmail">
      <SendEmailForm
        label="Confirmation"
        handleSubmit={handleSubmit}
        submitted={submitted}
      />
    </ContentContainer>
  );
};

ConfirmEmail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default withRouter(ConfirmEmail);
