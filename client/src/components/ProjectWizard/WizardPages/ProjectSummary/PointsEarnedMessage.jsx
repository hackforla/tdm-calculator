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
    display: "flex",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    color: "#0F2940",
    fontFamily: "Calibri",
    fontSize: "24px",
    lineHeight: "29px",
    textShadow: "0px 4px 4px rgba(0,0,0,.25)"
  },
  messageBox: {
    display: "flex",
    width: "521px",
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
  const classes = useStyles();
  const { targetPointsReached } = props;

  return (
    <div className={classes.targetPointsReachedContainer}>
      {targetPointsReached ? (
        <span className={clsx(classes.targetPointsReached, classes.success)}>
          <div className={classes.messageBox}>
            <FontAwesomeIcon icon={faCheckCircle} className={classes.success} />{" "}
            <div className={classes.textBox}>
              You have successfully earned the target points.
            </div>
          </div>
        </span>
      ) : (
        <span className={clsx(classes.targetPointsReached, classes.failure)}>
          <div className={classes.messageBox}>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className={classes.failure}
            />
            <div className={classes.textBox}>
              You have not reached the target points. <br />
              Please, go back and review your strategies
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
