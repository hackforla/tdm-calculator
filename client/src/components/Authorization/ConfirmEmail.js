import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import * as accountService from "../../services/account.service";
import { useToast } from "../../contexts/Toast";
import SendEmailForm from "./SendEmailForm";
import ContentContainer from "../Layout/ContentContainer";

const ConfirmEmail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const token = params.token;
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
        navigate(`/login/${encodeURIComponent(result.email)}`);
      }
    };
    if (token) {
      confirmEmail(token);
    }
  }, [token, toast, navigate]);

  return confirmResult.success ? (
    <Navigate to={`/login/${confirmResult.email}`} />
  ) : (
    <ContentContainer>
      <SendEmailForm
        label="Confirmation"
        handleSubmit={handleSubmit}
        submitted={submitted}
      />
    </ContentContainer>
  );
};

export default ConfirmEmail;
