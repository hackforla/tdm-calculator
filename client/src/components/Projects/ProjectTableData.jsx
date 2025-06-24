import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from "react-icons/md";

const useStyles = createUseStyles({
  td: {
    padding: "0.2em",
    textAlign: "left",
    width: "5%"
  },
  tdCenterAlign: {
    textAlign: "center"
  },
  contentWrapper: {
    display: "inline-block",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  contentWrapperExpanded: {
    display: "inline-block",
    whiteSpace: "normal",
    overflow: "visible",
    textOverflow: "unset",
    verticalAlign: "middle"
  },
  contentContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "0.5em",
    maxWidth: "100%"
  },
  expandButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    margin: 0,
    lineHeight: 0
  },
  expandButtonIcon: {
    fontSize: "24px",
    transform: "translateY(-4px)"
  }
});

const Td = ({ children, align }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const cellClass =
    align === "center" ? `${classes.td} ${classes.tdCenterAlign}` : classes.td;

  return <td className={cellClass}>{children}</td>;
};

const TdExpandable = ({ children }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [isTruncated, setIsTruncated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const wrapperClass = isExpanded
    ? classes.contentWrapperExpanded
    : classes.contentWrapper;

  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.offsetWidth);
    }
  }, []);

  return (
    <td className={classes.td}>
      <div className={classes.contentContainer}>
        <span ref={contentRef} className={wrapperClass}>
          {children}
        </span>
        {isTruncated && (
          <button
            className={classes.expandButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <MdOutlineKeyboardArrowUp className={classes.expandButtonIcon} />
            ) : (
              <MdOutlineKeyboardArrowDown
                className={classes.expandButtonIcon}
              />
            )}
          </button>
        )}
      </div>
    </td>
  );
};

export { Td, TdExpandable };

Td.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.string.isRequired
};

TdExpandable.propTypes = {
  children: PropTypes.node.isRequired
};
