import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight
} from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  paginationContainer: {
    marginRight: "10px"
  },
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
    fontFamily: "Calibri",
    fontWeight: "700",
    margin: "auto 0",
    fontSize: "18px",
    textDecoration: "none",
    "&:hover": {
      background: "silver"
    }
  }
});

const Pagination = props => {
  const { projectsPerPage, totalProjects, paginate } = props;
  const classes = useStyles();
  const pageNumbers = [];
  const firstPage = () => {
    return paginate(1);
  };
  const lastPage = () => {
    return paginate(Math.ceil(totalProjects / projectsPerPage));
  };

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.paginationContainer}>
      <ul className={classes.pagination}>
        <button
          className={clsx("hoverPointer", classes.button)}
          onClick={firstPage}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        <button
          className={clsx("hoverPointer", classes.button)}
          onClick={() => paginate("left")}
        >
          <FontAwesomeIcon icon={faAngleLeft} />{" "}
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
          <FontAwesomeIcon icon={faAngleRight} />{" "}
        </button>
        <button
          className={clsx("hoverPointer", classes.button)}
          onClick={lastPage}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
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
