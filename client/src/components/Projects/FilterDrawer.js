import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from "../UI/DateRangePicker";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  // "@keyframes expandWidth": {
  //   from: { width: 0 },
  //   to: { width: "100%" }
  // },
  container: {
    margin: "0 0.5em 0 0",
    height: "100vh",
    // width: "25rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #EEE",
    overflowY: "auto"
  },
  majorHeading: {
    marginBottom: "0"
  },
  minorHeading: {
    marginBottom: "0.25rem"
  },
  textInput: {
    width: "96%",
    padding: "0.12em"
  },
  row: {
    display: "flex",
    flexDirection: "row"
  },
  column: {
    flexBasis: "50%",
    display: "flex",
    flexDirection: "column"
  }
});

const FilterPopup = ({ criteria, setCriteria, setCollapsed }) => {
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const classes = useStyles();

  const resetCriteria = () => {
    setCriteria({
      type: "all",
      status: "active",
      visibility: "visible",
      name: "",
      address: "",
      author: "",
      alternative: "",
      startDateCreated: null,
      endDateCreated: null,
      startDateModified: null,
      endDateModified: null
    });
  };

  const handleChange = (e, propertyName) => {
    setCriteria({ ...criteria, [propertyName]: e.target.value });
  };

  const handleChangeDate = (property, date) => {
    setCriteria({ ...criteria, [property]: date });
  };

  return (
    <div className={classes.container}>
      <button
        style={{
          border: "none",
          textAlign: "right",
          backgroundColor: "white",
          margin: 0,
          padding: 0
        }}
        onClick={() => setCollapsed(true)}
      >
        &lt;&lt;
      </button>
      <h1 className={classes.majorHeading}>Filters</h1>

      <div className={classes.column}>
        <div>
          {/* <pre>{JSON.stringify(criteria, null, 2)}</pre> */}
          <h4 className={classes.minorHeading}>Project Type</h4>
        </div>
        <select onChange={e => handleChange(e, "type")} value={criteria.type}>
          <option value="draft">Draft</option>
          <option value="snapshot">Snapshot</option>
          <option value="all">Draft and Snapshot</option>
        </select>

        <h4 className={classes.minorHeading}>Status</h4>
        <select
          onChange={e => handleChange(e, "status")}
          value={criteria.status}
        >
          <option value="active">Active</option>
          <option value="deleted">Deleted</option>
          <option value="all">Active and Deleted</option>
        </select>

        <h4 className={classes.minorHeading}>Visibility</h4>
        <select
          onChange={e => handleChange(e, "visibility")}
          value={criteria.visibility}
        >
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
          <option value="all">Visible and Hidden</option>
        </select>

        <h4 className={classes.minorHeading}>Project Name</h4>
        <input
          type="text"
          value={criteria.name}
          onChange={e => handleChange(e, "name")}
          className={classes.textInput}
        />

        <h4 className={classes.minorHeading}>Address</h4>
        <input
          type="text"
          value={criteria.address}
          onChange={e => handleChange(e, "address")}
          className={classes.textInput}
        />
        {account.isAdmin && (
          <>
            <h4 className={classes.minorHeading}>Author</h4>
            <input
              type="text"
              value={criteria.author}
              onChange={e => handleChange(e, "author")}
              className={classes.textInput}
            />
          </>
        )}

        <h4 className={classes.minorHeading}>Alternative Number</h4>
        <input
          type="text"
          value={criteria.alternative}
          onChange={e => handleChange(e, "alternative")}
          className={classes.textInput}
        />

        <h4 className={classes.minorHeading}>Created On</h4>
        <DateRangePicker
          startDate={criteria.startDateCreated}
          endDate={criteria.endDateCreated}
          setStartDate={date => handleChangeDate("startDateCreated", date)}
          setEndDate={date => handleChangeDate("endDateCreated", date)}
        />

        <h4 className={classes.minorHeading}>Modified On</h4>
        <DateRangePicker
          startDate={criteria.startDateModified}
          endDate={criteria.endDateModified}
          setStartDate={date => handleChangeDate("startDateModified", date)}
          setEndDate={date => handleChangeDate("endDateModified", date)}
        />

        <div className={classes.row}>
          <Button onClick={resetCriteria}>Reset Filters</Button>
        </div>
      </div>
    </div>
  );
};

FilterPopup.propTypes = {
  criteria: PropTypes.any,
  setCriteria: PropTypes.func,
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func
};

export default FilterPopup;
