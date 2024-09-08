import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose } from "react-icons/md";
import SearchIcon from "../../../images/search.png";
import UniversalSelect from "../../UI/UniversalSelect.jsx";

const TextPopup = ({
  selectOptions,
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
  const [newSearchString, setNewSearchString] = useState(criteria[header.id]);

  const applyChanges = () => {
    setCriteria({ ...criteria, [header.id]: newSearchString });
    if (newOrder) {
      setSort(header.id, newOrder);
    }
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
    close();
  };

  const setDefault = () => {
    setNewSearchString("");
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
      {/*  <div>
        <ul>
          {textAllCurrentProjects.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div> */}
      {/* <input
        type="text"
        placeholder="Search by Partial Text"
        onChange={e => {
          setNewSearchString(e.target.value);
        }}
        value={newSearchString}
      /> */}
      <UniversalSelect
        options={selectOptions.map(text => ({
          value: text,
          label: text
        }))}
        name="inputName"
        disabled={false}
        onChange={e => {
          setNewSearchString(e.target.value);
          console.log(e.target.value);
        }}
        value={newSearchString}
        defaultValue={newSearchString}
        styles={{ maxHeight: 200 }}
        placeholder={placeholderComponent}
      ></UniversalSelect>
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
  selectOptions: PropTypes.any,
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
