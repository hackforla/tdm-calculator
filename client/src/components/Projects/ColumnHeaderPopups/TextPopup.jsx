import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import Select from "react-select";
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
  setSelectAllChecked
}) => {
  const classes = useStyles();

  const [newOrder, setNewOrder] = useState(
    header.id !== orderBy ? null : order
  );
  const [selectedListItems, setSelectedListItems] = useState(
    criteria[header.id + "List"].map(s => ({ value: s, label: s }))
  );
  const [searchString, setSearchString] = useState("");
  const [targetVisibility, setTargetVisibility] = useState(false);

  // To build the drop-down list, we want to apply all the criteria that
  // are currently selected EXCEPT the criteria we are currently editing.
  const listCriteria = { ...criteria, [header.id + "List"]: [] };
  const filteredProjects = projects.filter(p => filter(p, listCriteria));
  const property = header.id == "author" ? "fullname" : header.id;
  const selectOptions = [...new Set(filteredProjects.map(p => p[property]))]
    .filter(value => value !== null)
    .sort();

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
      option => option.value == optionValue
    );
    return !!checked;
  };

  const applyChanges = () => {
    setCriteria({
      ...criteria,
      [header.id + "List"]: selectedListItems.map(sli => sli.value)
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

  const placeholderComponent = (
    <div>
      <MdOutlineSearch className={classes.searchIcon} alt="Search Icon" />
      <div style={{ marginLeft: "30px" }}> Filter</div>
    </div>
  );

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
      {/* TODO: This is currently implemented differently for the address column than the other text columns,
      so PMs, designers and possibly stakeholders can evaluate two different implementations of the TextPopup, 
      and experiment with the UX, in order to make a decision on how to evolve this filter.  */}
      {header.id === "address" ? (
        // <MultiSelectText
        //   options={selectOptions}
        //   selectedOptions={selectedListItems}
        //   setSelectedOptions={setSelectedListItems}
        // />
        <>
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

          <div style={{ overflow: "scroll", maxHeight: "15rem" }}>
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
        </>
      ) : (
        <>
          <Select
            options={selectOptions.map(text => ({
              value: text,
              label: text
            }))}
            name={property}
            disabled={false}
            onChange={setSelectedListItems}
            value={selectedListItems}
            placeholder={placeholderComponent}
            isMulti
            styles={{
              maxWidth: "50rem",
              menuPortal: base => ({
                ...base,
                zIndex: 9999,
                maxHeight: "10rem"
              })
            }}
            closeMenuOnSelect={false}
            onMenuOpen={() => setTargetVisibility(true)}
            onMenuClose={() => setTargetVisibility(false)}
          ></Select>
          {targetVisibility ? <div style={{ height: "19.5rem" }}></div> : null}
        </>
      )}

      <hr style={{ width: "100%" }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={setDefault} variant="text">
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
  setSelectAllChecked: PropTypes.func
};

export default TextPopup;
