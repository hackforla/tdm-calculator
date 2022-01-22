import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  accordionTooltipLabel: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "50%",
    border: "2px solid black",
    padding: "1em",
    borderRadius: "5px",
    maxWidth: "fit-content",
    minWidth: "-webkit-fill-available",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)"
  },
  tooltip: {
    color: "rgb(30, 36, 63) !important",
    padding: "15px",
    minWidth: "200px",
    maxWidth: "400px",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: "bold",
    borderRadius: 2,
    "&.show": {
      visibility: "visible !important",
      opacity: "1 !important"
    }
  },
  requiredInputLabel: {
    "&:after": {
      content: '" *"',
      color: "red"
    }
  },
  disabledInputLabel: {
    opacity: "0.5"
  },
  closeButton: {
    float: "right",
    display: "inlineBlock",
    padding: "2px 5px"
  },
  triangle: {
    position: "relative",
    top: "2px",
    left: "20px",
    width: "0",
    height: "0",
    borderBottom: "7px solid black",
    borderLeft: "7px solid transparent",
    borderRight: "7px solid transparent"
  },
  triangleInner: {
    position: "relative",
    top: "2px",
    left: "-4.85px",
    width: "0",
    height: "0",
    borderBottom: "5px solid white",
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent"
  }
});

const AccordionToolTip = ({ description }) => {
  const classes = useStyles();
  return (
    <>
      <div className={clsx(classes.triangle)}>
        <div className={clsx(classes.triangleInner)}></div>
      </div>
      <div
        className={clsx(classes.accordionTooltipLabel)}
        dangerouslySetInnerHTML={{ __html: `${description}` }}
      ></div>
    </>
  );
};

AccordionToolTip.propTypes = {
  description: PropTypes.string
};

export default AccordionToolTip;
