import React, { useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "./FilterModal";

const useStyles = createUseStyles({
  thead: {
    fontWeight: "bold",
    backgroundColor: "#edf1f4",
    color: "black",
    "& td": {
      padding: "12px"
    }
    //alternative background: "#002E6D"
    //alternative color: "white",
  },
  tr: {
    margin: "0.5em"
  },
  td: {
    padding: "0.2em",
    textAlign: "left"
  },
  theadLabel: {
    cursor: "pointer"
  },
  sortArrow: {
    marginLeft: "8px",
    verticalAlign: "baseline"
  }
});

const ProjectsPageHeader = ({ headerData, handleFilterModal }) => {
  const classes = useStyles();

  return (
    <thead className={classes.thead}>
      <tr className={classes.tr}>
        {headerData.map(header => {
          const label = header.label;
          return (
            <td
              key={header.id}
              className={
                header.id === "contextMenu"
                  ? `${classes.td}`
                  : `${classes.td} ${classes.theadLabel}`
              }
              onClick={
                header.id == "contextMenu"
                  ? null
                  : () => {
                      console.log("SET FILTER MODAL", handleFilterModal);
                      handleFilterModal();
                    }
              }
            >
              <span className={classes.labelSpan}>
                {label}{" "}
                <FontAwesomeIcon
                  icon={faFilter}
                  className={classes.sortArrow}
                />
              </span>
            </td>
          );
        })}
      </tr>
    </thead>
  );
};

export default ProjectsPageHeader;
