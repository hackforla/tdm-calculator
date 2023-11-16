import React from "react";
import { createUseStyles } from "react-jss";
import ChecklistContent from "./ChecklistContent";
import ContentContainer from "../Layout/ContentContainer";

const useStyles = createUseStyles({
  checklist: {
    maxWidth: "1000px"
  }
});

const ChecklistPage = () => {
  const classes = useStyles();
  return (
    <ContentContainer>
      <div className={classes.checklist}>
        <ChecklistContent />
      </div>
    </ContentContainer>
  );
};

export default ChecklistPage;
