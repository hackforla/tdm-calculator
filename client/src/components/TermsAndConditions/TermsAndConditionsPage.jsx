import React from "react";
import { createUseStyles } from "react-jss";
import TermsAndConditionsContent from "./TermsAndConditionsContent";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles({
  termsAndConditions: {
    maxWidth: "1000px"
  }
});

const TermsAndConditionsPage = () => {
  const classes = useStyles();
  return (
    <ContentContainer>
      <div className={classes.termsAndConditions}>
        <TermsAndConditionsContent />
      </div>
    </ContentContainer>
  );
};

export default TermsAndConditionsPage;
