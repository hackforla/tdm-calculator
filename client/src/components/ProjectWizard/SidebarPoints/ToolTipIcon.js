import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  textStyle: {
    color: "white",
    fontFamily: "Calibri",
  },
  circleStyle: {
    color: "#A7C539",
  },
  containerStyle: {
    fontSize: 25,
    verticalAlign: "-.25em",
  },
});

const ToolTipIcon = ({ circleStyle, containerStyle, textStyle }) => {
  const classes = useStyles();
  return (
    <span
      className={clsx(
        "fa-layers",
        "fa-fw",
        classes.containerStyle,
        containerStyle
      )}
    >
      <FontAwesomeIcon
        icon={faCircle}
        className={clsx(classes.circleStyle, circleStyle)}
      />
      <span
        className={clsx(
          "fa-layers-text",
          "fa-inverse",
          classes.textStyle,
          textStyle
        )}
      >
        ?
      </span>
    </span>
  );
};

ToolTipIcon.propTypes = {
  circleStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

export default ToolTipIcon;
