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
  const visiblePageLinks = [];

  const firstPage = () => {
    return paginate(1);
  };
  const lastPage = () => {
    return paginate(Math.ceil(totalProjects / projectsPerPage));
  };

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  //TODO: Make this function accept props for maximum number of pages etc
  //TODO - refactor to make more efficient / easier to read. Possibly turn loop logic into one separate function that can be called

  const displayProjectPageLinks = (
    pageNumbers,
    currentPage,
    projectsPerPage
    // totalProjects,
  ) => {
    console.clear();

    const maxNumOfVisiblePages = 5;
    const firstVisiblePage = 1;
    const lastVisiblePage = pageNumbers[pageNumbers.length - 1];
    const totalNumOfPages = Math.ceil(totalProjects / projectsPerPage);

    console.log("projects per page: ", projectsPerPage);
    console.log("totalNumOfPages: ", totalNumOfPages);
    console.log(
      `pageNumbers: ${pageNumbers} 
      maxNumOfVisiblePages: ${maxNumOfVisiblePages}
      currentPage: ${currentPage}`
    );

    //TODO: fix bug that causes items per page to break some page number logic
    //TODO: try implementing a sliding window

    //^ edge case for first 2 pages
    if (currentPage === firstVisiblePage || currentPage === 2) {
      for (let i = firstVisiblePage; i <= maxNumOfVisiblePages; i++) {
        visiblePageLinks.push(i);
      }
      console.log("edge case: FIRST 2 PAGES");
    } //^ edge case for last 2 pages
    else if (
      currentPage === lastVisiblePage ||
      currentPage === lastVisiblePage - 1
    ) {
      for (let i = lastVisiblePage - 4; i <= lastVisiblePage; i++) {
        visiblePageLinks.push(i);
      }
      console.log("edge case: LAST 2 PAGES");
    } else if (currentPage >= 3 && currentPage <= pageNumbers.length - 2) {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (visiblePageLinks.length <= maxNumOfVisiblePages) {
          visiblePageLinks.push(i);
        }
      }
      console.log("visiblePageLinks MIDDLE PAGES check ", visiblePageLinks);
    }
  };
  {
    displayProjectPageLinks(pageNumbers, currentPage, projectsPerPage);
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
