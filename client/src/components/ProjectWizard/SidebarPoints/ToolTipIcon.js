import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  textStyle: (styles) => ({
    color: "white",
    fontFamily: "Calibri",
    ...styles.textStyle,
  }),
  circleStyle: (styles) => ({
    color: "#A7C539",
    ...styles.circleStyle,
  }),
  containerStyle: (styles) => ({
    fontSize: 25,
    verticalAlign: "-.25em",
    ...styles.containerStyle,
  }),
});

const ToolTipIcon = ({
  containerStyle,
  circleStyle,
  textStyle,
  handleClick,
}) => {
  const classes = useStyles({ containerStyle, circleStyle, textStyle });
  return (
    <span
      onClick={handleClick}
      className={clsx("fa-layers", "fa-fw", classes.containerStyle)}
    >
      <FontAwesomeIcon icon={faCircle} className={clsx(classes.circleStyle)} />
      <span className={clsx("fa-layers-text", "fa-inverse", classes.textStyle)}>
        ?
      </span>
    </span>
  );
};

ToolTipIcon.propTypes = {
  circleStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  handleClick: PropTypes.func,
};

export default ToolTipIcon;
