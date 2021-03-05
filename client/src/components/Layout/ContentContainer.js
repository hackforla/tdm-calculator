import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  contentContainerRoot: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    minHeight: "calc(100vh - 103px - 48px)"
  },
  "@media (max-width:768px)": {
    contentContainerRoot: {
      flexDirection: "column"
    }
  },
  contentContainer: {
    justifyContent: "space-between",
    boxSizing: "border-box",
    overflow: "auto"
  },
  wizardContentContainer: {
    flexBasis: "auto",
    flexGrow: "1",
    flexShrink: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "4em 2em 2em 2em"
  }
});

const ContentContainer = ({
  customSidebar: Sidebar,
  tdmWizardContentContainerRef,
  children
}) => {
  const classes = useStyles();

  return (
    <div className={classes.contentContainerRoot}>
      {Sidebar && <Sidebar />}
      <div
        className={clsx(
          classes.contentContainer,
          classes.wizardContentContainer
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
