import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  searchBarWrapper: {
    width: "100%",
    position: "relative",
    alignSelf: "center",
    marginBottom: "0.5rem"
  },
  searchBar: {
    maxWidth: "100%",
    width: "100%",
    padding: "12px 12px 12px 12px",
    boxSizing: "border-box"
    // marginRight: "0.5rem"
  },
  searchIcon: {
    position: "absolute",
    right: "16px",
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
  },
  toggleButton: {
    marginRight: "0",
    marginTop: "4px",
    marginBottom: "4px",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline",
    display: "flex",
    fontWeight: "normal"
  }
});

const TextPopup = ({
  projects,
  filter,
  close,
  header,
  criteria,
  setCriteria,
  order,
  orderBy,
  setSort,
  setCheckedProjectIds,
  setSelectAllChecked,
  droOptions
}) => {
  const property = header.accessor || header.id;
  const getDisplayValue = value => {
    if (property === "droName" && value === "") {
      return "No DRO Assigned";
    }
    return value;
  };

  const getInternalValue = displayValue => {
    if (property === "droName" && displayValue === "No DRO Assigned") {
      return "";
    }
    return displayValue;
  };
  const classes = useStyles();

  const [newOrder, setNewOrder] = useState(
    header.id !== orderBy ? null : order
  );
  const [selectedListItems, setSelectedListItems] = useState(
    (criteria[header.id + "List"] || []).map(s => ({
      value: getDisplayValue(s),
      label: getDisplayValue(s)
    }))
  );
  const [searchString, setSearchString] = useState("");

  const initiallyChecked = o => criteria[header.id + "List"].includes(o);

  // To build the drop-down list, we want to apply all the criteria that
  // are currently selected EXCEPT the criteria we are currently editing.
  const listCriteria = { ...criteria, [header.id + "List"]: [] };
  const filteredProjects = projects.filter(p => filter(p, listCriteria));
  // const property = header.id == "author" ? "fullname" : header.id;

  let selectOptions;

  if (property === "droName") {
    selectOptions = droOptions.map(dro => dro.name);
    selectOptions.push("No DRO Assigned");
  } else if (property === "fullname") {
    selectOptions = [...new Set(filteredProjects.map(p => p[property]))]
      .filter(value => value !== null)
      .sort(
        (a, b) => (initiallyChecked(b) ? 1 : 0) - (initiallyChecked(a) ? 1 : 0)
      );
  } else {
    selectOptions = [...new Set(filteredProjects.map(p => p[property]))]
      .filter(value => value !== null && value !== "")
      .sort(
        (a, b) => (initiallyChecked(b) ? 1 : 0) - (initiallyChecked(a) ? 1 : 0)
      );
  }
  const filteredOptions = selectOptions
    .filter(o => !!o)
    .filter(opt => opt.toLowerCase().includes(searchString.toLowerCase()));

  const onChangeSearchString = e => {
    setSearchString(e.target.value);
  };

  const handleCheckboxChange = e => {
    const optionValue = e.target.name;
    if (!e.target.checked) {
      const newSelectedListItems = selectedListItems.filter(
        selectedOption => selectedOption.value !== optionValue
      );
      setSelectedListItems(newSelectedListItems);
    } else {
      const newSelectedListItems = [
        ...selectedListItems,
        { value: optionValue, label: optionValue }
      ];
      setSelectedListItems(newSelectedListItems);
    }
  };

  const isChecked = optionValue => {
    const checked = selectedListItems.find(
      option => option.value === optionValue
    );
    return !!checked;
  };

  const applyChanges = () => {
    let selectedValues = selectedListItems.map(sli =>
      getInternalValue(sli.value)
    );

    setCriteria({
      ...criteria,
      [header.id + "List"]: selectedValues
    });

    if (newOrder) {
      setSort(header.id, newOrder);
    }
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
    close();
  };

  const setDefault = () => {
    setNewOrder(null);
    setSelectedListItems([]);
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "25rem" }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <MdClose
          style={{
            backgroundColor: "transparent",
            color: "black",
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem"
          }}
          alt={`Close popup`}
          onClick={close}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <RadioButton
          label="Sort A-Z"
          value="asc"
          checked={newOrder === "asc"}
          onChange={() => setNewOrder("asc")}
        />
        <RadioButton
          label="Sort Z-A"
          value="desc"
          checked={newOrder === "desc"}
          onChange={() => setNewOrder("desc")}
        />
        <hr style={{ width: "100%" }} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline"
        }}
      >
        <button
          className={classes.toggleButton}
          onClick={() => setSelectedListItems([])}
        >
          clear
        </button>
        <div>{`${selectedListItems.length}  selected`}</div>
      </div>
      <div className={classes.searchBarWrapper}>
        <input
          type="text"
          value={searchString}
          onChange={onChangeSearchString}
          className={classes.searchBar}
        />
        <MdOutlineSearch className={classes.searchIcon} alt="Search Icon" />
      </div>

      <div style={{ overflow: "auto", maxHeight: "12rem" }}>
        {/* <pre>{JSON.stringify(selectedListItems, null, 2)}</pre> */}
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

      <hr style={{ width: "100%" }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={setDefault} variant="outlined">
          Reset
        </Button>
        <Button
          onClick={applyChanges}
          variant="contained"
          color={"colorPrimary"}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

TextPopup.propTypes = {
  projects: PropTypes.any,
  filter: PropTypes.func,
  close: PropTypes.func,
  header: PropTypes.any,
  criteria: PropTypes.any,
  setCriteria: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setSort: PropTypes.func,
  setCheckedProjectIds: PropTypes.func,
  setSelectAllChecked: PropTypes.func,
  droOptions: PropTypes.array.isRequired
};

export default TextPopup;
