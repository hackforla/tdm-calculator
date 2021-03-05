import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  root: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row"
  },
  "@media (max-width:768px)": {
    root: {
      flexDirection: "column"
    }
  },
  contentContainer: {
    justifyContent: "space-between",
    boxSizing: "border-box",
    overflow: "auto"
  }
});

const ContentContainer = ({
  customSidebar: Sidebar,
  tdmWizardContentContainerRef,
  children
}) => {
  const classes = useStyles();
  console.log("REF", tdmWizardContentContainerRef);

  return (
    <div className={clsx("tdm-wizard", classes.root)}>
      {Sidebar && <Sidebar />}
      <div
        className={clsx(
          "tdm-wizard-content-container",
          classes.contentContainer
        )}
        ref={tdmWizardContentContainerRef}
      >
        {children}
      </div>
    </div>
  );
};

ContentContainer.propTypes = {
  customSidebar: PropTypes.elementType,
  tdmWizardContentContainerRef: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default ContentContainer;
