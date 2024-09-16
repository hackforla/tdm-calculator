import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import DatePickerCustomInput from "./DatePickerCustomInput";

// TODO: we want the calendar popup to appear as if it were in the normal CSS flow.
// We should be able to do this with a React portal, but I (John Darragh) was not
// able to get this to work (see https://reactdatepicker.com/#example-date-range-with-portalInstead
// for the example that should work). Instead, we use a total hack by putting a spacer div below
// the datepickers, and conditionally showi it if the calendar is open.  Would be
// good to replace this with something more solid, cause it somethimes doesn't work well
// e.g. if the popup doesn't have enough space in the broswser window below the datepicker,
// the popup appears above the date picker and is then not positioned over the
// spacer div.

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  startDatePlaceholder,
  endDatePlaceholder
}) => {
  const [calendarDivHeight, setCalendarDivHeight] = useState(false);
  const handleCalendarOpen = () => {
    setCalendarDivHeight(true);
  };

  const handleCalendarClose = () => {
    setCalendarDivHeight(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          minWidth: "15.5rem"
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
          popperPlacement="bottom-start"
          onCalendarOpen={handleCalendarOpen}
          onCalendarClose={handleCalendarClose}
          // withPortal
        />
        <div
          style={{ margin: "auto 0", minWidth: "2.5rem", textAlign: "center" }}
        >
          to
        </div>
        <DatePicker
          selected={endDate}
          selectsEnd
          onChange={date => setEndDate(date)}
          startDate={startDate}
          endDate={endDate}
          customInput={<DatePickerCustomInput />}
          dateFormat="yyyy-MM-dd"
          placeholderText={endDatePlaceholder || ""}
          popperPlacement="bottom-end"
          onCalendarOpen={handleCalendarOpen}
          onCalendarClose={handleCalendarClose}
          // withPortal
        />
      </div>
      {calendarDivHeight ? (
        <div style={{ height: "15rem" }}>{calendarDivHeight}</div>
      ) : null}
    </>
  );
};

DateRangePicker.propTypes = {
  portalId: PropTypes.string,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string
};

export default DateRangePicker;
