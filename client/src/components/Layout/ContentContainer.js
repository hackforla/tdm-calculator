import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import {
  useAppInsightsContext,
  useTrackMetric
} from "@microsoft/applicationinsights-react-js";

const useStyles = createUseStyles({
  contentContainerRoot: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    minHeight: "calc(100vh - 103px - 48px)"
  },
  content: {
    boxSizing: "border-box",
    overflow: "auto",
    flexBasis: "auto",
    flexGrow: "1",
    flexShrink: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4em 2em 2em 2em"
  },
  "@media (max-width:768px)": {
    contentContainerRoot: {
      flexDirection: "column"
    }
  }
});

const ContentContainer = ({
  customSidebar: CustomSidebar,
  tdmWizardContentContainerRef,
  children,
  componentToTrack
}) => {
  const classes = useStyles();
  const appInsights = useAppInsightsContext();

  // e.g. appInsights.trackMetric("PublicCommentPage Component");
  const trackComponent = useTrackMetric(appInsights, componentToTrack);

  return (
    <div
      className={classes.contentContainerRoot}
      onLoad={trackComponent}
      onClick={trackComponent}
    >
      {CustomSidebar && <CustomSidebar />}
      <div className={classes.content} ref={tdmWizardContentContainerRef}>
        {children}
      </div>
    </div>
  );
};

ContentContainer.propTypes = {
  customSidebar: PropTypes.elementType,
  tdmWizardContentContainerRef: PropTypes.object,
  children: PropTypes.node.isRequired,
  componentToTrack: PropTypes.string.isRequired
};

export default ContentContainer;
