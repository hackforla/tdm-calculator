import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import * as accountService from "../services/account-service";
import { useToast } from "../contexts/Toast";

const ConfirmEmail = props => {
  const { history } = props;
  const [confirmResult, setConfirmResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const token = props.match.params.token;
  const toast = useToast();

  const confirmEmail = async token => {
    const result = await accountService.confirmRegister(token);
    setConfirmResult(result);
    if (result.success) {
      toast.add(`Your email has been confirmed. Please log in.`)
      history.push(`/login/${encodeURIComponent(result.email)}`);
    }
  };

  const resendConfirmationEmail = async evt => {
    evt.preventDefault();
    await accountService.resendConfirmationEmail(email);
    setEmailSent(true);
  };

  useEffect(() => {
    if (token) {
      confirmEmail(token);
    }
  }, [token]);

  return (
    <React.Fragment>
      <div>Confirm Email</div>
      {!confirmResult ? (
        <div>"Confirming Email..."</div>
      ) : confirmResult.success ? (
        <Redirect to={`/login/${email}`} />
      ) : emailSent ? (
        // TODO: CHECK ON THIS CODE - How do we test this to see this?? -- Claire
        <p>
          {`A confirmation email has been sent to ${email}. Please find this
            email and click on the link provided to complete your email confirmation.`}
        </p>
      ) : (
        <div>
          <div>
            <p>
              The confirmation request was not found, or has expired. Please
              press the button to re-send the registration confirmation email.
            </p>
            <form onSubmit={resendConfirmationEmail}>
              <input
                required
                name="email"
                placeholder="Enter the email for your account"
                type="email"
                value={email}
                onChange={evt => {
                  setEmail(evt.target.value);
                }}
              />

              <button type="submit">Re-send confirmation email</button>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(ConfirmEmail);
