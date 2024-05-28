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
  const {
    projectsPerPage,
    totalProjects,
    paginate,
    currentPage,
    maxNumOfVisiblePages
  } = props;
  const classes = useStyles();
  // const [leftDotVisible, setLeftDotVisible] = useState(false);
  // const [rightDotVisible, setRightDotVisible] = useState(false);
  const pageNumbers = [];
  let visiblePageLinks = [];
  const totalNumOfPages = Math.ceil(totalProjects / projectsPerPage);

  const firstPage = () => {
    return paginate(1);
  };
  const lastPage = () => {
    return paginate(Math.ceil(totalProjects / projectsPerPage));
  };

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  // TODO: Add state variable to add/remove DOTS from the visible page list

  // FIXME: Known issue: when setting maxNumVisiblePages to 2 or lower pagination bugs are introduced. Fix the if else checks

  const calculateVisiblePageLinks = currentPage => {
    console.clear();

    visiblePageLinks = [];

    let startPage, endPage;

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

    // push all necessary page numbers into visiblePageLinks array
    for (let i = startPage; i <= endPage; i++) {
      visiblePageLinks.push(i);
    }

    //! for debugging
    console.log(`
    totalProjects: ${totalProjects}
    projectsPerPage: ${projectsPerPage} ${typeof projectsPerPage}
    totalNumOfPages: ${totalNumOfPages} ${typeof totalNumOfPages}
    currentPage: ${currentPage} ${typeof currentPage}
    visiblePageLinks: ${visiblePageLinks} 

    `);
  };

  {
    calculateVisiblePageLinks(currentPage);
  }

  //FIXME: before dots on left side  the UI should show page 1, same for right side but last page
  // Example: 1 ... 5 6 7 8 ... 10

  const pagesHidden = position => {
    let firstVisiblePage = visiblePageLinks[0];
    let lastVisiblePage = visiblePageLinks[visiblePageLinks.length - 1];

    // LEFT side logic
    if (position === "left") {
      if (firstVisiblePage !== 1) {
        return true;
      }
    }

    // RIGHT side logic
    else if (position === "right") {
      if (lastVisiblePage !== totalNumOfPages) {
        return true;
      }
    }
    return false;
  };

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
        <span>{`${pagesHidden("left") ? "..." : ""}`}</span>

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
        <span>{`${pagesHidden("right") ? "..." : ""}`}</span>

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
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  maxNumOfVisiblePages: PropTypes.number.isRequired
};
