import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import * as accountService from "../../services/account.service";
import { useToast } from "../../contexts/Toast";
import Button from "../Button/Button";

const ConfirmEmail = props => {
  const { history } = props;
  const [confirmResult, setConfirmResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const token = props.match.params.token;
  const toast = useToast();

  const resendConfirmationEmail = async evt => {
    evt.preventDefault();
    await accountService.resendConfirmationEmail(email);
    setEmailSent(true);
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
  }, [token, history, toast]);

  return (
    <React.Fragment>
      <div>Confirm Email</div>
      {!confirmResult ? (
        <div>Confirming Email...</div>
      ) : confirmResult.success ? (
        <Redirect to={`/login/${email}`} />
      ) : emailSent ? (
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

              <Button type="submit">Re-send confirmation email</Button>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
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
