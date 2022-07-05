import React from "react";
import { createUseStyles } from "react-jss";
import TermsAndConditionsContent from "./TermsAndConditionsContent";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles({
  termsAndConditions: {
    maxWidth: "1000px",
    zIndex: 110
  }
});

const TermsAndConditionsPage = () => {
  const classes = useStyles();
  return (
    <ContentContainer componentToTrack="TermsAndConditionsPage">
      <div className={classes.termsAndConditions}>
        <TermsAndConditionsContent />
      </div>
    </ContentContainer>
  );
};

export default TermsAndConditionsPage;
