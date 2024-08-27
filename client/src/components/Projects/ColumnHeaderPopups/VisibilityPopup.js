import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import "react-datepicker/dist/react-datepicker.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VisibilityPopup = ({
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

  // TODO More state variables for visibility filtering go here

  const setDefault = () => {
    setCriteria({
      ...criteria,
      [header.id]: ""
    });
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  const applyChanges = () => {
    // Set Criteria for status
    if (newOrder) {
      setSort(header.id, newOrder);
    }
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
    close();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <FontAwesomeIcon
          style={{
            backgroundColor: "transparent",
            color: "black",
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem"
          }}
          icon={faX}
          alt={`Close popup`}
          onClick={close}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* If there is a dateHidden, property value is 1 */}
        <RadioButton
          label="Sort Visible First"
          value="asc"
          checked={newOrder === "asc"}
          onChange={() => setNewOrder("asc")}
        />
        <RadioButton
          label="Sort Hidden First"
          value="desc"
          checked={newOrder === "desc"}
          onChange={() => setNewOrder("desc")}
        />
        <hr style={{ width: "100%" }} />
      </div>
      <div>(Under Construction)</div>

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

VisibilityPopup.propTypes = {
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

export default VisibilityPopup;
