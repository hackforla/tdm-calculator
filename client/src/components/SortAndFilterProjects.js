import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  sortSection: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "row wrap"
  },
  sortGroup: {
    display: "flex",
    alignItems: "center",
    flexFlow: "row wrap",
    margin: "0 1rem",
    "& input": {
      width: "50%"
    }
  }
});

const SortAndFilterProjects = ({
  sort,
  setSort,
  sortDirection,
  setSortDirection,
  filter,
  setFilter,
  filterWords,
  setFilterWords
}) => {
  const classes = useStyles();

  const projectFields = [
    "dateModified",
    "name",
    "address",
    "description",
    "firstName",
    "dateCreated"
  ];
  const projectFieldsNames = [
    "Date Modified",
    "Name",
    "Address",
    "Description",
    "Entered By",
    "Date Entered"
  ];

  const selectFields = () => {
    return (
      <React.Fragment>
        {projectFields.map((field, index) => (
          <option key={field + index} value={field}>
            {projectFieldsNames[index]}
          </option>
        ))}
      </React.Fragment>
    );
  };

  const onButtonReset = () => {
    setSort(projectFields[0]);
    setSortDirection("up");
    setFilter(projectFields[0]);
    setFilterWords("");
  };

  const onFilterCategoryChange = event => {
    setFilter(event.target.value);
    setFilterWords("");
  };

  return (
    <div className={classes.sortSection}>
      <div className={classes.sortGroup}>
        <h3>Filter By Category:</h3>
        <select
          onChange={event => onFilterCategoryChange(event)}
          value={filter}
        >
          {selectFields()}
        </select>
      </div>
      <div className={classes.sortGroup}>
        <h3>Filter Criteria:</h3>
        <input
          type="text"
          name="filterWords"
          value={filterWords}
          onChange={event => setFilterWords(event.target.value)}
        />
      </div>
      <div className={classes.sortGroup}>
        <h3>Sort By: </h3>
        <select onChange={event => setSort(event.target.value)} value={sort}>
          {selectFields()}
        </select>
      </div>
      <div className={classes.sortGroup} value={sortDirection}>
        <h3>Order:</h3>
        <select
          onChange={event => setSortDirection(event.target.value)}
          value={sortDirection}
        >
          <option value="up">Ascending</option>
          <option value="down">Descending</option>
        </select>
      </div>
      <button type="button" onClick={onButtonReset}>
        Reset
      </button>
    </div>
  );
};

export default SortAndFilterProjects;
