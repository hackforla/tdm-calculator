import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from "../UI/DateRangePicker";
import { MdChevronRight } from "react-icons/md";
import { createUseStyles } from "react-jss";
import UniversalSelect from "../UI/UniversalSelect";

const useStyles = createUseStyles({
  container: {
    margin: "0 0.5em 0 0",
    height: "100vh",
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
  },
  dropdown: {
    width: "100%",
    textAlign: "left",
    padding: 0,
    maring: 0
  }
});

const FilterPopup = ({
  criteria,
  setCriteria,
  setCollapsed,
  setCheckedProjectIds,
  setSelectAllChecked
}) => {
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

  const handleChange = e => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });

    // reset any checked project rows when filter is applied
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  const handleChangeDate = (property, date) => {
    setCriteria({ ...criteria, [property]: date });
  };

  const projectTypeoptions = [
    { value: "draft", label: "Draft" },
    { value: "snapshot", label: "Snapshot" },
    { value: "all", label: "Draft and Snapshot" }
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "deleted", label: "Deleted" },
    { value: "all", label: "Active and Deleted" }
  ];

  const visibilityOptions = [
    { value: "visible", label: "Visible" },
    { value: "hidden", label: "Hidden" },
    { value: "all", label: "Visible and Hidden" }
  ];

  return (
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
        <MdChevronRight />
      </button>
      <h1 className={classes.majorHeading}>Filters</h1>

      <div className={classes.column}>
        <div>
          {/* <pre>{JSON.stringify(criteria, null, 2)}</pre> */}
          <h4 className={classes.minorHeading}>Project Type</h4>
        </div>

        <UniversalSelect
          value={criteria.type}
          options={projectTypeoptions}
          onChange={handleChange}
          name="type"
          className={classes.dropdown}
        />

        <h4 className={classes.minorHeading}>Status</h4>
        <UniversalSelect
          value={criteria.status}
          options={statusOptions}
          onChange={handleChange}
          name="status"
          className={classes.dropdown}
        />

        <h4 className={classes.minorHeading}>Visibility</h4>
        <UniversalSelect
          value={criteria.visibility}
          options={visibilityOptions}
          onChange={handleChange}
          name="visibility"
          className={classes.dropdown}
        />

        <h4 className={classes.minorHeading}>Project Name</h4>
        <input
          type="text"
          name="name"
          value={criteria.name}
          onChange={e => handleChange(e, "name")}
          className={classes.textInput}
        />

        <h4 className={classes.minorHeading}>Address</h4>
        <input
          type="text"
          name="address"
          value={criteria.address}
          onChange={e => handleChange(e, "address")}
          className={classes.textInput}
        />
        {account.isAdmin && (
          <>
            <h4 className={classes.minorHeading}>Author</h4>
            <input
              type="text"
              name="author"
              value={criteria.author}
              onChange={e => handleChange(e, "author")}
              className={classes.textInput}
            />
          </>
        )}

        <h4 className={classes.minorHeading}>Alternative Number</h4>
        <input
          type="text"
          name="alternative"
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
  setCollapsed: PropTypes.func,
  setCheckedProjectIds: PropTypes.func,
  setSelectAllChecked: PropTypes.func
};

export default FilterPopup;
