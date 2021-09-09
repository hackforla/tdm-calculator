import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  success: {
    color: "#A7C539"
  },
  failure: {
    color: "#E46247"
  },
  targetPointsReachedContainer: {
    display: "flex"
  },
  targetPointsReached: {
    width: "100%",
    textAlign: "center",
    fontSize: "24px"
  }
});

const PointsEarnedMessage = props => {
  const classes = useStyles();
  const { targetPointsReached } = props;

  return (
    <div className={classes.targetPointsReachedContainer}>
      {targetPointsReached ? (
        <span className={clsx(classes.targetPointsReached, classes.success)}>
          <FontAwesomeIcon icon={faCheckCircle} className={classes.success} />{" "}
          &nbsp;You have successfully earned the target points.
        </span>
      ) : (
        <span className={clsx(classes.targetPointsReached, classes.failure)}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className={classes.failure}
          />
          &nbsp;
          <span>
            You have not reached the target points. <br />
            Please, go back and review your strategies
          </span>
        </span>
      )}
    </div>
  );
};
PointsEarnedMessage.propTypes = {
  targetPointsReached: PropTypes.bool.isRequired
};

export default PointsEarnedMessage;
