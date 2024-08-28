import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import DatePickerCustomInput from "./DatePickerCustomInput";

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  startDatePlaceholder,
  endDatePlaceholder
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row"
      }}
    >
      <DatePicker
        selected={startDate}
        selectsStart
        onChange={date => setStartDate(date)}
        startDate={startDate}
        endDate={endDate}
        customInput={<DatePickerCustomInput />}
        dateFormat="yyyy-MM-dd"
        placeholderText={startDatePlaceholder || ""}
      />
      <div style={{ margin: "auto 0" }}>&nbsp;to&nbsp;</div>
      <DatePicker
        selected={endDate}
        selectsEnd
        onChange={date => setEndDate(date)}
        startDate={startDate}
        endDate={endDate}
        customInput={<DatePickerCustomInput />}
        dateFormat="yyyy-MM-dd"
        placeholderText={endDatePlaceholder || ""}
      />
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string
};

export default DateRangePicker;
