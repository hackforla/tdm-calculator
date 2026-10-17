import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import TermsAndConditionsContent from "./TermsAndConditionsContent";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles({
  termsAndConditions: {
    maxWidth: "1000px"
  }
});

const TermsAndConditionsPage = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

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
