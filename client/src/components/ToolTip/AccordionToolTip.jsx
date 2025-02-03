import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import { Interweave } from "interweave";
import { MdLaunch, MdClose } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  accordionTooltipLabel: {
    ...theme.typography.paragraph1,
    color: theme.colorText,
    textAlign: "left",
    border: "1px solid " + theme.colorBlack,
    padding: "1em",
    borderRadius: "5px",
    width: "min-content",
    minWidth: "97%",
    boxShadow:
      "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)",
    marginBottom: "10px"
  },
  closeButton: {
    color: theme.colors.secondary.gray,
    float: "right",
    padding: "0.5rem",
    fontSize: "20px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  triangle: {
    position: "relative",
    top: "0px",
    left: "20px",
    width: "0",
    height: "0",
    borderBottom: "6px solid " + theme.colors.secondary.gray,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent"
  },
  triangleInner: {
    position: "relative",
    top: "1px",
    left: "-6px",
    width: "0",
    height: "0",
    borderBottom: "6px solid white",
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent"
  },
  disabledDescription: {
    color: "rgba(15, 41, 64, 0.6)"
  }
}));

const AccordionToolTip = ({
  description,
  setShowDescription,
  disabledStyle
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <>
      <div className={clsx(classes.triangle)}>
        <div className={clsx(classes.triangleInner)}></div>
      </div>
      <div
        className={clsx(classes.closeButton)}
        onClick={() => setShowDescription(prev => !prev)}
      >
        <MdClose />
      </div>
      {disabledStyle ? (
        <div
          className={clsx(
            classes.accordionTooltipLabel,
            classes.disabledDescription
          )}
        >
          <Interweave transform={TransformExternalLink} content={description} />
        </div>
      ) : (
        <div className={clsx(classes.accordionTooltipLabel)}>
          <Interweave transform={TransformExternalLink} content={description} />
        </div>
      )}
    </>
  );
};

function TransformExternalLink(node, children) {
  const classes = useStyles();
  if (node.tagName == "A" && !node.getAttribute("href").startsWith("/")) {
    return (
      <span>
        <a href={node.getAttribute("href")} target="external">
          {children}
          <MdLaunch className={classes.externalLinkIcon} />
        </a>
      </span>
    );
  }
}

AccordionToolTip.propTypes = {
  description: PropTypes.string,
  setShowDescription: PropTypes.func,
  disabledStyle: PropTypes.any
};

export default AccordionToolTip;
