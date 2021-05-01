import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Loader from "react-loader";

const useStyles = createUseStyles({
  panelContainer: {
    margin: "0.5em"
  },
  strategyContainer: {
    minWidth: "60vw",
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f2940",
    color: "white",
    padding: ".4em"
  },
  strategyName: {
    flexGrow: "1",
    flexShrink: "1",
    margin: "0"
  },
  points: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1"
  },
  loaderContainer: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center"
  }
});

const Panels = ({ rules, suppressHeader, children }) => {
  const classes = useStyles();
  const hasLoaded = rules && rules.length > 0;

  return (
    <React.Fragment>
      {hasLoaded ? (
        <div
          key={rules[0].calculationPanelId}
          className={classes.panelContainer}
        >
          {!suppressHeader ? (
            <div className={classes.strategyContainer}>
              <h4 className={classes.strategyName}>{rules[0].panelName}</h4>
            </div>
          ) : null}
          {children}
        </div>
      ) : (
        <div className={classes.loaderContainer}>
          <Loader loaded={false} className="spinner" left="auto" />
        </div>
      )}
    </React.Fragment>
  );
};

Panels.propTypes = {
  rules: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  suppressHeader: PropTypes.bool
};

export default Panels;
