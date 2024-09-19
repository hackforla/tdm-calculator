import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose } from "react-icons/md";
import SearchIcon from "../../../images/search.png";
import Select from "react-select";
import MultiSelectText from "./MultiSelectText";

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
  const [newOrder, setNewOrder] = useState(
    header.id !== orderBy ? null : order
  );
  const [selectedListItems, setSelectedListItems] = useState(
    criteria[header.id + "List"].map(s => ({ value: s, label: s }))
  );

  // To build the drop-down list, we want to apply all the criteria that
  // are currently selected EXCEPT the criteria we are currently editing.
  const listCriteria = { ...criteria, [header.id + "List"]: [] };
  const filteredProjects = projects.filter(p => filter(p, listCriteria));
  const property = header.id == "author" ? "fullname" : header.id;
  const selectOptions = [...new Set(filteredProjects.map(p => p[property]))]
    .filter(value => value !== null)
    .sort();

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
    setSelectedListItems([]);
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  const placeholderComponent = (
    <div>
      <img
        style={{ position: "absolute", left: "16 px", top: "14 px" }}
        src={SearchIcon}
        alt="Search Icon"
      />
      <div style={{ marginLeft: "30px" }}> Search by Keyword</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
        <MultiSelectText
          options={selectOptions}
          selectedOptions={selectedListItems}
          setSelectedOptions={e => {
            setSelectedListItems(e);
          }}
        />
      ) : (
        <Select
          options={selectOptions.map(text => ({
            value: text,
            label: text
          }))}
          name={property}
          disabled={false}
          onChange={e => {
            setSelectedListItems(e);
          }}
          value={selectedListItems}
          styles={{ maxHeight: "50rem", maxWidth: "50rem" }}
          placeholder={placeholderComponent}
          isMulti
        ></Select>
      )}

      <hr style={{ width: "100%" }} />
      <div style={{ display: "flex" }}>
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
