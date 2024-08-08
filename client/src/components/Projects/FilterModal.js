import React, { useState, useRef, useEffect } from "react";
import { createUseStyles, useTheme } from "react-jss";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ModalDialog from "../UI/AriaModal/ModalDialog";

const useStyles = createUseStyles(theme => ({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  buttonColor: {
    backgroundColor: "#eaeff2"
  }
}));

const FilterModal = ({ mounted, onClose }) => {
  const classes = useStyles();

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      initialFocus="#duplicateName"
    ></ModalDialog>
  );
};

export default FilterModal;
