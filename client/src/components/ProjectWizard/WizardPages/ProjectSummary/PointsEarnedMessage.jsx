import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import { MdCheckCircle, MdWarning } from "react-icons/md";

const useStyles = createUseStyles({
  success: {
    color: ({ theme }) => theme.colorPrimary
  },
  failure: {
    color: ({ theme }) => theme.colors.notice
  },
  targetPointsReachedContainer: {
    display: "flex"
  },
  targetPointsReached: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  messageBox: {
    display: "flex",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    padding: ".5em",
    boxShadow: "2px 2px 4px 2px rgba(0,0,0,.1)"
  },
  textBox: {
    display: "inline-block",
    textAlign: "left",
    paddingLeft: ".5em"
  }
});

const PointsEarnedMessage = props => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const { targetPointsReached } = props;

  return (
    <div className={classes.targetPointsReachedContainer}>
      {targetPointsReached ? (
        <span className={clsx(classes.targetPointsReached, classes.success)}>
          <div
            className={classes.messageBox}
            style={theme.typography.subHeading}
          >
            <MdCheckCircle className={classes.success} />
            <div className={classes.textBox}>
              You have successfully earned the target points.
            </div>
          </div>
        </span>
      ) : (
        <span className={clsx(classes.targetPointsReached, classes.failure)}>
          <div
            className={classes.messageBox}
            style={theme.typography.subHeading}
          >
            <MdWarning className={classes.failure} />
            <div className={classes.textBox}>
              You have not reached the target points. Please, go back and review
              your strategies.
            </div>
          </div>
        </span>
      )}
    </div>
  );
};
PointsEarnedMessage.propTypes = {
  targetPointsReached: PropTypes.bool.isRequired
};

export default PointsEarnedMessage;
