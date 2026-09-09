import React from "react";
import ContentContainer from "../Layout/ContentContainer";
import { useStyles } from "./SendEmailForm";

const AccountUpdateConfirmation = () => {
  const classes = useStyles();

  return (
    <ContentContainer>
      <h1 className={classes.pageTitle}>Account Updated Successfully</h1>
      <h3>Your account information has been updated.</h3>
    </ContentContainer>
  );
};

export default AccountUpdateConfirmation;
