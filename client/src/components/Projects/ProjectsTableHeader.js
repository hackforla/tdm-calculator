import React from "react";
// import { useState } from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { MdArrowDropDown, MdArrowDropUp, MdFilterList } from "react-icons/md";
import "reactjs-popup/dist/index.css";

const useStyles = createUseStyles({
  tr: {
    background: "#EEF1F4",
    color: "#000000"
  },
  sortArrow: {
    margin: "0 0 0 0.5em",
    verticalAlign: "baseline",
    fontSize: "20px"
  }
});

const ProjectTableHeader = ({
  handleSort,
  selectAllChecked,
  handleHeaderCheckbox,
  order,
  orderBy
}) => {
  const classes = useStyles();

  const headerData = [
    {
      id: "checkAllProjects",
      label: (
        <input
          style={{
            height: "15px"
          }}
          type="checkbox"
          checked={selectAllChecked}
          onChange={handleHeaderCheckbox}
        />
      )
    },
    {
      id: "dateHidden",
      label: "Visibility"
    },
    {
      id: "dateSnapshotted",
      label: "Status"
    },
    { id: "name", label: "Name" },
    { id: "address", label: "Address" },
    { id: "VERSION_NO", label: "Alternative Number" },
    { id: "firstName", label: "Created By" },
    { id: "dateCreated", label: "Created On" },
    { id: "dateModified", label: "Last Modified" },
    {
      id: "contextMenu",
      label: ""
    }
  ];

  console.log("ORDER", order);

  return (
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
              header.id == "contextMenu" ? null : () => handleSort(header.id)
            }
          >
            {orderBy === header.id ? (
              <span className={classes.labelSpan}>
                {label}{" "}
                {order === "asc" ? (
                  <MdArrowDropDown className={classes.sortArrow} />
                ) : (
                  <MdArrowDropUp className={classes.sortArrow} />
                )}
              </span>
            ) : (
              <span className={classes.labelSpan}>{label}</span>
            )}
            <span className={classes.labelSpan}>
              <MdFilterList className={classes.sortArrow} />
            </span>
          </td>
        );
      })}
    </tr>
  );
};

ProjectTableHeader.propTypes = {
  handleSort: PropTypes.function,
  selectAllChecked: PropTypes.boolean,
  handleHeaderCheckbox: PropTypes.function,
  order: PropTypes.string,
  orderBy: PropTypes.string
};

export default ProjectTableHeader;
