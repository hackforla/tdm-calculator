import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import { MdClose } from "react-icons/md";
import { createUseStyles } from "react-jss";
import ToggleCheckbox from "components/UI/ToggleCheckbox";

/*
Variant of the StringPopup that is for text columns with a small number of choices that do not need the search box feature
*/

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
    gap: "0.2em",
    "&:hover": {
      backgroundColor: "lightblue"
    },
    "& span": {
      maxWidth: "25ch",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
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
  const property = header.accessor || header.id;
  const classes = useStyles();

  const [newOrder, setNewOrder] = useState(
    header.id !== orderBy ? null : order
  );
  const [selectedListItems, setSelectedListItems] = useState(
    (criteria[header.id + "List"] || []).map(s => ({
      value: s,
      label: s
    }))
  );

  const initiallyChecked = o => criteria[header.id + "List"].includes(o);

  // To build the drop-down list, we want to apply all the criteria that
  // are currently selected EXCEPT the criteria we are currently editing.
  const listCriteria = { ...criteria, [header.id + "List"]: [] };
  const filteredProjects = projects.filter(p => filter(p, listCriteria));

  const selectOptions = [...new Set(filteredProjects.map(p => p[property]))]
    .filter(value => value !== null && value !== "")
    .sort(
      (a, b) => (initiallyChecked(b) ? 1 : 0) - (initiallyChecked(a) ? 1 : 0)
    );

  const filteredOptions = selectOptions.filter(o => !!o);

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
    let selectedValues = selectedListItems.map(sli => sli.value);

    setCriteria({
      ...criteria,
      [header.id + "List"]: selectedValues
    });

    if (newOrder) {
      setSort(header.id, newOrder);
    }
    if (setCheckedProjectIds) setCheckedProjectIds([]);
    if (setSelectAllChecked) setSelectAllChecked(false);
    close();
  };

  const setDefault = () => {
    setNewOrder(null);
    setSelectedListItems([]);
    if (setCheckedProjectIds) setCheckedProjectIds([]);
    if (setSelectAllChecked) setSelectAllChecked(false);
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
          Clear
        </button>
        <div>{`${selectedListItems.length}  selected`}</div>
      </div>

      <div style={{ overflow: "auto", maxHeight: "12rem" }}>
        {/* <pre>{JSON.stringify(selectedListItems, null, 2)}</pre> */}
        {/*  <pre>{JSON.stringify(options, null, 2)}</pre> */}

        {filteredOptions.map(o => {
          const checked = isChecked(o);
          return (
            <div key={o} className={classes.listItem}>
              <ToggleCheckbox
                checked={checked}
                onChange={() =>
                  handleCheckboxChange({
                    target: {
                      name: o,
                      checked: !isChecked(o)
                    }
                  })
                }
                label={o}
              />
              <span>{o}</span>
            </div>
          );
        })}
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
  droOptions: PropTypes.array
};

export default TextPopup;
