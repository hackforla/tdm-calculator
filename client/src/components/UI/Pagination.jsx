import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  paginationContainer: {
    marginRight: "10px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  pagination: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  button: {
    border: "none",
    background: "none",
    outline: "none",
    width: "30px",
    padding: "0",
    margin: "0 5px"
  },
  pageLinkContainer: {
    height: "25px",
    width: "25px",
    display: "flex",
    justifyContent: "center",
    margin: "0 4px"
  },
  pageLink: {
    fontFamily: "Calibri",
    fontWeight: "700",
    margin: "auto  0",
    fontSize: "16px",
    textDecoration: "none",
    padding: "0 0.25rem",
    border: "none",
    "&:hover": {
      background: theme.colorDeselect
    }
  },
  currentPageLink: {
    color: "white",
    backgroundColor: "blue"
  },
  dots: {
    fontWeight: "400",
    "&:hover": {
      background: "none"
    }
  }
}));

// ... rest of the component code remains the same

export default Pagination;
