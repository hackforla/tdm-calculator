import React from "react";
import SideBar from "../Sidebar";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

const useStyles = createUseStyles({
  root: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  },
  tdmWizard: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "row"
  },
  contentContainer: {
    maxWidth: "1000px"
  }
});

const TermsAndConditionsPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={clsx("tdm-wizard", classes.tdmWizard)}>
        <SideBar />
        <div className="tdm-wizard-content-container">
          <div className={classes.contentContainer}>
            <TermsAndConditionsContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
