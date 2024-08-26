import React from "react";
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
  const setDefault = () => {
    setCriteria({
      ...criteria,
      [header.id]: ""
    });
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
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
          checked={orderBy === header.id && order === "asc"}
          onChange={() => setSort(header.id, "asc")}
        />
        <RadioButton
          label="Sort Hidden First"
          value="desc"
          checked={orderBy === header.id && order === "desc"}
          onChange={() => setSort(header.id, "desc")}
        />
        <hr style={{ width: "100%" }} />
      </div>
      <div>(Under Construction)</div>

      <hr style={{ width: "100%" }} />
      <Button
        onClick={setDefault}
        variant="text"
        style={{ margin: "0.5rem", padding: "0.5rem", border: "1px solid red" }}
      >
        Reset
      </Button>
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
