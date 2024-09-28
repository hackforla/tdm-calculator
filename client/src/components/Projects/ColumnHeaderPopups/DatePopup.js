import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from "../../UI/DateRangePicker";
import { MdClose } from "react-icons/md";

const DatePopup = ({
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
  const [newStartDate, setNewStartDate] = useState(
    criteria[header.startDatePropertyName]
  );
  const [newEndDate, setNewEndDate] = useState(
    criteria[header.endDatePropertyName]
  );

  const setDefault = () => {
    setNewStartDate(null);
    setNewEndDate(null);
    setNewOrder(null);
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  const applyChanges = () => {
    setCriteria({
      ...criteria,
      [header.startDatePropertyName]: newStartDate,
      [header.endDatePropertyName]: newEndDate
    });
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
          label="Sort Newest to Oldest"
          value="desc"
          checked={newOrder === "desc"}
          onChange={() => setNewOrder("desc")}
        />
        <RadioButton
          label="Sort Oldest to Newest"
          value="asc"
          checked={newOrder === "asc"}
          onChange={() => setNewOrder("asc")}
        />
        <hr style={{ width: "100%" }} />
      </div>
      <div id="calendarPortal">
        <DateRangePicker
          startDate={newStartDate}
          endDate={newEndDate}
          setStartDate={date => {
            setNewStartDate(date);
          }}
          setEndDate={date => {
            setNewEndDate(date);
          }}
          startDatePlaceholder="Start Date"
          endDatePlaceholder="End Date"
        />
      </div>

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

DatePopup.propTypes = {
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

export default DatePopup;
