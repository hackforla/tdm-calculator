import { DateTime } from "luxon";

export const toDate = s => (s ? new Date(s) : null);

export const formatDate = date => {
  return date ? new Date(date).toISOString().split("T")[0] : null;
};

export const formatDatetime = datetime => {
  return datetime
    ? DateTime.fromISO(datetime)
        .setZone("America/Los_Angeles")
        .toFormat("yyyy-MM-dd hh:mm a")
    : null;
};

export const formatId = id => {
  const padded = id.toString().padStart(10, "0");
  return padded.substring(0, 5) + "-" + padded.substring(5, 10);
};

// Intended for use in TextPopup, StringPopup, and StringListPopup components
export const selectAllCheckboxes = (filteredOptions, setSelectedListItems) => {
  // Build an array of objects that contain the name for all the list items in the popup
  const listItems = filteredOptions.map(item => ({
    value: item,
    label: item
  }));

  setSelectedListItems(listItems);
};
