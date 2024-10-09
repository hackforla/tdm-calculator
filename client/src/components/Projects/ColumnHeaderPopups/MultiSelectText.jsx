import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../../images/search.png";
import { MdOutlineSearch } from "react-icons/md";
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
  const [selectedListItems, setSelectedListItems] = useState([
    ...selectedOptions
  ]);

  const filteredOptions = options
    .filter(o => !!o)
    .filter(opt => opt.toLowerCase().includes(searchString.toLowerCase()));

  const onChangeSearchString = e => {
    setSearchString(e.target.value);
  };

  const handleCheckboxChange = e => {
    const optionValue = e.target.name;
    if (selectedListItems.find(so => so.value == optionValue)) {
      const newSelectedListItems = selectedListItems.filter(
        selectedOption => selectedOption.value !== optionValue
      );
      setSelectedListItems(newSelectedListItems);
      setSelectedOptions(newSelectedListItems);
    } else {
      const newSelectedListItems = [
        ...selectedListItems,
        { value: optionValue, label: optionValue }
      ];
      setSelectedListItems(newSelectedListItems);
      setSelectedOptions(newSelectedListItems);
    }
  };

  const isChecked = optionValue => {
    const checked = selectedListItems.find(
      option => option.value == optionValue
    );
    return !!checked;
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
        <MdOutlineSearch className={classes.searchIcon} alt="Search Icon" />
        <img
          className={classes.searchIcon}
          src={SearchIcon}
          alt="Search Icon"
        />
      </div>

      <div style={{ overflow: "scroll", maxHeight: "15rem" }}>
        <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
        {/*  <pre>{JSON.stringify(options, null, 2)}</pre> */}

        {filteredOptions.map(o => (
          <div key={o} className={classes.listItem}>
            <input
              style={{ height: "1.5rem" }}
              type="checkbox"
              name={o}
              checked={isChecked(o)}
              onChange={handleCheckboxChange}
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
