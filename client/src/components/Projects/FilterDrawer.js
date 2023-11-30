import React from "react";
// import UserContext from "../../contexts/UserContext";
import PropTypes from "prop-types";
import Button from "../Button/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    margin: "0 0 0 0.5em",
    height: "100%",
    // width: "25rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    border: "1px solid black"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black"
  },
  column: {
    flexBasis: "50%",
    display: "flex",
    flexDirection: "column"
  }
});

const FilterPopup = ({ criteria, setCriteria, collapsed, setCollapsed }) => {
  // const userContext = useContext(UserContext);
  // const account = userContext.account;
  const classes = useStyles();

  const resetCriteria = () => {
    setCriteria({ type: "all", status: "active", visibility: "visible" });
  };

  const handleClickType = e => {
    setCriteria({ ...criteria, type: e.target.value });
  };

  const handleClickStatus = e => {
    setCriteria({ ...criteria, status: e.target.value });
  };

  const handleClickVisibility = e => {
    setCriteria({ ...criteria, visibility: e.target.value });
  };

  return (
    <>
      {collapsed ? (
        <div></div>
      ) : (
        <div className={classes.container}>
          <button
            style={{
              border: "none",
              textAlign: "left",
              backgroundColor: "white",
              margin: 0,
              padding: 0
            }}
            onClick={() => setCollapsed(true)}
          >
            &gt;&gt;
          </button>
          <h1 style={{ fontSize: "22px" }}>Filter By</h1>

          <div className={classes.column}>
            <div>
              {/* {criteriaString} */}
              <h4>Project Type</h4>
            </div>
            <select onChange={handleClickType} value={criteria.type}>
              <option value="draft">Draft</option>
              <option value="snapshot">Snapshot</option>
              <option value="all">Draft and Snapshot</option>
            </select>
            <h4>Status</h4>
            <select onChange={handleClickStatus} value={criteria.status}>
              <option value="active">Active</option>
              <option value="deleted">Deleted</option>
              <option value="all">Active and Deleted</option>
            </select>
            <h4>Visibility</h4>
            <select
              onChange={handleClickVisibility}
              value={criteria.visibility}
            >
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
              <option value="all">Visible and Hidden</option>
            </select>
          </div>

          <div className={classes.row}>
            <Button onClick={resetCriteria}>Reset Filters</Button>
          </div>
        </div>
      )}
    </>
  );
};

FilterPopup.propTypes = {
  criteria: PropTypes.shape,
  setCriteria: PropTypes.func,
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func
};

export default FilterPopup;
