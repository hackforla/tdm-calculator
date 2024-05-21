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

const useStyles = createUseStyles(theme => ({
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
    margin: "auto  0",
    fontSize: "18px",
    textDecoration: "none",
    padding: "0 0.5rem",
    border: "none",
    "&:hover": {
      background: theme.colorDeselect
    }
  },
  currentPageLink: {
    color: "white",
    backgroundColor: "blue"
  }
}));

const Pagination = props => {
  const { projectsPerPage, totalProjects, paginate, currentPage } = props;
  const classes = useStyles();
  const pageNumbers = [];
  let visiblePageLinks = [];

  const firstPage = () => {
    return paginate(1);
  };
  const lastPage = () => {
    return paginate(Math.ceil(totalProjects / projectsPerPage));
  };

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  //TODO: Make displayProjectPageLinks function accept props for maximum number of pages, sibling count etc

  const displayProjectPageLinks = currentPage => {
    console.clear();

    visiblePageLinks = [];
    let startPage, endPage;
    const maxNumOfVisiblePages = 5;
    const totalNumOfPages = Math.ceil(totalProjects / projectsPerPage);

    if (totalNumOfPages <= maxNumOfVisiblePages) {
      // If total # of pages is less than max visible pages, display all pages
      startPage = 1;
      endPage = totalNumOfPages;
    } else if (currentPage <= 3) {
      // Case for first 2 pages
      startPage = 1;
      endPage = maxNumOfVisiblePages;
    } else if (currentPage + 2 >= totalNumOfPages) {
      // Case for last 2 pages
      startPage = totalNumOfPages - maxNumOfVisiblePages + 1;
      endPage = totalNumOfPages;
    } else {
      // Case for all other pages pages
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    //finally, push all necessary page numbers into visiblePageLinks array
    for (let i = startPage; i <= endPage; i++) {
      visiblePageLinks.push(i);
    }

    //! for debugging
    console.log("projects per page: ", projectsPerPage);
    console.log("totalNumOfPages: ", totalNumOfPages);
    console.log(
      `maxNumOfVisiblePages: ${maxNumOfVisiblePages}
        currentPage: ${currentPage}`
    );
    console.log("visiblePageLinks: ", visiblePageLinks);
  };

  {
    displayProjectPageLinks(currentPage);
  }

  return (
    <div className={classes.paginationContainer}>
      <ul className={classes.pagination}>
        {/* TODO: ensure these buttons are deactivated if on the FIRST page */}
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

        {visiblePageLinks.map(number => (
          <li className={classes.pageLinkContainer} key={number}>
            <Link
              className={
                number === currentPage
                  ? clsx(classes.pageLink, classes.currentPageLink)
                  : classes.pageLink
              }
              to="#"
              onClick={() => paginate(number)}
            >
              {number}
            </Link>
          </li>
        ))}
        {/* TODO: ensure these buttons are deactivated if on the LAST page */}

        <button
          className={clsx("hoverPointer", classes.button)}
          onClick={() =>
            currentPage === pageNumbers[pageNumbers.length - 1]
              ? null
              : paginate("right")
          }
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
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};
