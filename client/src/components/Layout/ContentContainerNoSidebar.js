import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import {
  useAppInsightsContext,
  useTrackMetric
} from "@microsoft/applicationinsights-react-js";

const useStyles = createUseStyles({
  contentContainerRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "calc(100vh - 103px - 48px)",
    margin: "auto",
    width: "85%"
  }
});

const ContentContainerNoSidebar = ({ children, componentToTrack }) => {
  const classes = useStyles();
  const appInsights = useAppInsightsContext();

  // e.g. appInsights.trackMetric("ProjectsPage Component");
  const trackComponent = useTrackMetric(appInsights, componentToTrack);

  return (
    <div
      className={classes.contentContainerRoot}
      onLoad={trackComponent}
      onClick={trackComponent}
    >
      {children}
    </div>
  );
};
ContentContainerNoSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  componentToTrack: PropTypes.string.isRequired
};

export default ContentContainerNoSidebar;
