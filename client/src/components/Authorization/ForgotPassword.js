import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import * as accountService from "../../services/account.service";
import SendEmailForm from "./SendEmailForm";

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async ({ email }, { setFieldError }) => {
    const submitResponse = await accountService.resetPasswordRequest(email);
    if (submitResponse.data.isSuccess) {
      setSubmitted(true);
    } else if (
      submitResponse.data.code === "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND"
    ) {
      setFieldError(
        "email",
        "That email address is not associated with any accounts"
      );
    }
  };

  return (
    <SendEmailForm
      label="Password Recovery"
      handleSubmit={handleSubmit}
      submitted={submitted}
    />
  );
};

export default withRouter(ForgotPassword);
