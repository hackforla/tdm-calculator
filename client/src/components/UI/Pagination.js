import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

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
  },
  dots: {
    fontWeight: "400",
    "&:hover": {
      background: "none"
    }
  }
}));

const Pagination = props => {
  const {
    projectsPerPage,
    totalProjects,
    paginate,
    currentPage,
    maxNumOfVisiblePages
  } = props;

  const classes = useStyles();
  const pageNumbers = [];
  let visiblePageLinks = [];
  const totalNumOfPages = Math.ceil(totalProjects / projectsPerPage);

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  const formatVisiblePages = pages => {
    if (pages.length > maxNumOfVisiblePages) {
      pages.shift();
    }
    return pages;
  };

  // FIXME: Known bug: when setting maxNumOfVisiblePages to 2 or less pagination bugs are introduced. Problem is the else-if block for the first two pages in calculateVisiblePageLinks

  const calculateVisiblePageLinks = currentPage => {
    console.clear();

    let startPage, endPage;

    if (totalNumOfPages <= maxNumOfVisiblePages) {
      // If total # of pages is less than max visible pages, display all pages
      startPage = 1;
      endPage = totalNumOfPages;
    } else if (currentPage < 3) {
      // Case for first 2 pages
      if (currentPage === 2) {
        startPage = 1;
        endPage = maxNumOfVisiblePages;
      } else {
        startPage = currentPage;
        endPage = currentPage + (maxNumOfVisiblePages - 1);
      }
    } else if (currentPage + 2 >= totalNumOfPages) {
      // Case for last 2 pages
      startPage = totalNumOfPages - maxNumOfVisiblePages + 1;
      endPage = totalNumOfPages;
    } else {
      // Case for all other pages pages
      startPage = currentPage - Math.floor(maxNumOfVisiblePages / 2);
      endPage = currentPage + Math.floor(maxNumOfVisiblePages / 2);
    }

    // push all gathered page numbers into array
    for (let i = startPage; i <= endPage; i++) {
      visiblePageLinks.push(i);
    }

    formatVisiblePages(visiblePageLinks);

    //! for debugging
    console.log(`
    totalProjects: ${totalProjects}
    projectsPerPage: ${projectsPerPage} ${typeof projectsPerPage}
    totalNumOfPages: ${totalNumOfPages} ${typeof totalNumOfPages}
    currentPage: ${currentPage} ${typeof currentPage}
    visiblePageLinks: ${visiblePageLinks} 
    startPage: ${startPage} 
    endPage: ${endPage} 

    `);

    return visiblePageLinks;
  };

  {
    calculateVisiblePageLinks(currentPage);
  }

  const displayPerimeterPages = (position, page) => {
    let firstVisiblePage = visiblePageLinks[0];
    let lastVisiblePage = visiblePageLinks[visiblePageLinks.length - 1];
    const dots = (
      <span className={clsx(classes.pageLink, classes.dots)}>...</span>
    );

    const pageLinkItem = (
      <li className={classes.pageLinkContainer}>
        {position === "right" ? dots : null}
        <Link
          className={
            page === currentPage
              ? clsx(classes.pageLink, classes.currentPageLink)
              : classes.pageLink
          }
          to="#"
          onClick={() => paginate(page)}
        >
          {page}
        </Link>
        {position === "left" ? dots : null}
      </li>
    );

    //TODO: check if right perimeter page is needed
    if (position === "left" && firstVisiblePage !== 1) {
      return pageLinkItem;
    } else if (position === "right" && lastVisiblePage !== totalNumOfPages) {
      return pageLinkItem;
    }
    return false;
  };

  const leftPerimeterLink = displayPerimeterPages("left", 1);
  const rightPerimeterLink = displayPerimeterPages("right", totalNumOfPages);

  return (
    <div className={classes.paginationContainer}>
      <ul className={classes.pagination}>
        <button
          className={clsx("hoverPointer", classes.button)}
          onClick={() => paginate("left")}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        {leftPerimeterLink}

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

        {rightPerimeterLink}

        <button
          className={clsx("hoverPointer", classes.button)}
          onClick={() => paginate("right")}
        >
          <FontAwesomeIcon icon={faAngleRight} />{" "}
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
  currentPage: PropTypes.number.isRequired,
  maxNumOfVisiblePages: PropTypes.number.isRequired
};
