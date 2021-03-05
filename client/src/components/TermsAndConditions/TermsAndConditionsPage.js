import React from "react";
import { createUseStyles } from "react-jss";
import TermsAndConditionsContent from "./TermsAndConditionsContent";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles({
  termsAndConditionsRoot: {
    maxWidth: "1000px"
  }
});

const TermsAndConditionsPage = () => {
  const classes = useStyles();
  return (
    <ContentContainer componentToTrack="TermsAndConditionsPage">
      <div className={classes.termsAndConditionsRoot}>
        <TermsAndConditionsContent />
      </div>
    </ContentContainer>
  );
};

export default TermsAndConditionsPage;
