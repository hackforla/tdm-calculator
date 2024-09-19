import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../../images/search.png";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  searchBarWrapper: {
    position: "relative",
    alignSelf: "center",
    marginBottom: "0.5rem"
  },
  searchBar: {
    maxWidth: "100%",
    width: "20em",
    padding: "12px 12px 12px 48px",
    marginRight: "0.5rem"
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "14px"
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "2rem",
    "&:hover": {
      backgroundColor: "lightblue"
    }
  }
});

const MultiSelectText = ({ options, selectedOptions, setSelectedOptions }) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");

  const filteredOptions = options
    .filter(o => !!o)
    .filter(opt => opt.includes(searchString));

  const onChangeSearchString = e => {
    setSearchString(e.target.value);
  };

  const handleCheckboxChange = o => {
    if (selectedOptions.find(so => so.value == o)) {
      setSelectedOptions(
        selectedOptions.filter(selectedOption => selectedOption.value !== o)
      );
    } else {
      selectedOptions.push({ value: o, label: o });
      setSelectedOptions(selectedOptions);
    }
  };

  return (
    <>
      <div className={classes.searchBarWrapper}>
        <input
          type="text"
          value={searchString}
          onChange={onChangeSearchString}
          placeholder="Search"
          className={classes.searchBar}
        />
        <img
          className={classes.searchIcon}
          src={SearchIcon}
          alt="Search Icon"
        />
      </div>

      <div style={{ overflow: "scroll", maxHeight: "15rem" }}>
        {/* <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
      <pre>{JSON.stringify(options, null, 2)}</pre> */}

        {filteredOptions.map(o => (
          <div key={o} className={classes.listItem}>
            <input
              style={{ height: "1.5rem" }}
              type="checkbox"
              checked={selectedOptions.find(option => option.value == o)}
              onChange={() => handleCheckboxChange(o)}
            />
            <span>{o}</span>
          </div>
        ))}
      </div>
    </>
  );
};

MultiSelectText.propTypes = {
  options: PropTypes.any,
  selectedOptions: PropTypes.any,
  setSelectedOptions: PropTypes.func
};

export default MultiSelectText;
