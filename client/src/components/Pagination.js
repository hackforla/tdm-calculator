import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  pagination: {
    display: "flex"
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
    margin: "0 8px"
  },
  pageLink: {
    fontFamily: "Calibri Bold",
    margin: "auto 0",
    fontSize: "18px"
    // cursor: "pointer"
  }
});

const Pagination = props => {
  const { projectsPerPage, totalProjects, paginate } = props;
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={classes.pagination}>
        <button
          className={clsx("hoverPointer", classes.button)}
          onClick={() => paginate("left")}
        >
          <FontAwesomeIcon icon={faChevronLeft} />{" "}
        </button>
        {pageNumbers.map(number => (
          <li className={classes.pageLinkContainer} key={number}>
            <Link
              className={classes.pageLink}
              to="#"
              onClick={() => paginate(number)}
            >
              {number}
            </Link>
          </li>
        ))}
        <button
          className={clsx("hoverPointer", classes.button)}
          onClick={() => paginate("right")}
        >
          <FontAwesomeIcon icon={faChevronRight} />{" "}
        </button>
      </ul>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  projectsPerPage: PropTypes.number.isRequired,
  totalProjects: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};
