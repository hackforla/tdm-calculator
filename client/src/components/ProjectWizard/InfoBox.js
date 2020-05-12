import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F7F9FA",
    marginBottom: "1em",
    marginRight: "auto",
    marginLeft: "auto",
    width: "50vw",
    minWidth: 550,
    maxWidth: 700,
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: "#F7F9FA",
    color: "#B2C0D3",
    borderStyle: "none",
    display: "flex",
    justifyContent: "center",
    margin: 0,
    padding: 0,
    width: "2em",
    "&:hover": {
      cursor: "pointer",
      color: "#8E99A8",
    },
  },
  bigX: {
    fontSize: "25px",
  },
  content: {
    margin: "0 1em",
    paddingBottom: "2em",
    alignSelf: "center",
  },
  open: {
    display: "flex",
  },
  closed: {
    display: "none",
  },
});

const InfoBox = ({ children, displayStatus, handleClick }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.container,
        displayStatus ? classes.open : classes.closed
      )}
    >
      <button onClick={handleClick} className={classes.closeButton}>
        <span className={classes.bigX}>{"\u00d7"}</span>
      </button>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

InfoBox.propTypes = {
  children: PropTypes.any,
  displayStatus: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default InfoBox;
