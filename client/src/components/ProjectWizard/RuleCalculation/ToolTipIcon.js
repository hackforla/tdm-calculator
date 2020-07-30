import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  questionStyle: styles => ({
    ...styles.questionStyle
  }),
  circleStyle: styles => ({
    ...styles.circleStyle
  }),
  containerStyle: styles => ({
    fontSize: 25,
    verticalAlign: "-.25em",
    ...styles.containerStyle
  })
});

const ToolTipIcon = ({ containerStyle, circleStyle, questionStyle }) => {
  const classes = useStyles({ containerStyle, circleStyle, questionStyle });
  return (
    <span className={clsx("fa-layers", "fa-fw", classes.containerStyle)}>
      <FontAwesomeIcon
        icon={faCircle}
        color="#a7c539"
        className={classes.circleStyle}
      />
      <FontAwesomeIcon
        icon={faQuestion}
        color="white"
        className={classes.questionStyle}
        transform="shrink-5"
      />
    </span>
  );
};

ToolTipIcon.propTypes = {
  circleStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  questionStyle: PropTypes.object
};

export default ToolTipIcon;
