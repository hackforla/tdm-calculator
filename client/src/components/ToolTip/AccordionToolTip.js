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
  closeButton: {
    float: "right",
    padding: "4px 7px",
    fontSize: "20px",
    "&:hover": {
      cursor: "pointer"
    }
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

const AccordionToolTip = ({ description, setShowDescription }) => {
  const classes = useStyles();
  return (
    <>
      <div className={clsx(classes.triangle)}>
        <div className={clsx(classes.triangleInner)}></div>
      </div>
      <div
        className={clsx(classes.closeButton)}
        onClick={() => setShowDescription(prev => !prev)}
      >
        x
      </div>
      <div
        className={clsx(classes.accordionTooltipLabel)}
        dangerouslySetInnerHTML={{ __html: `${description}` }}
      ></div>
    </>
  );
};

AccordionToolTip.propTypes = {
  description: PropTypes.string,
  setShowDescription: PropTypes.func
};

export default AccordionToolTip;
