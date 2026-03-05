import { DateTime } from "luxon";

// parse a string as a Javascript date.
// This is primarily used when you need to do arithmetic or comparison
// of dates.
export const toDate = s => (s ? new Date(s) : null);

// export const formatDate = date => {
//   return date ? new Date(date).toISOString().split("T")[0] : null;
// };

// Format a date without time in the Pacific Time Zone.
// The input is expected to be either a Javascript Date
// OR a string in one of the formats
// parsable by luxon as listed here: https://moment.github.io/luxon/#/parsing
export const formatDate = date => {
  if (!date) return null;
  const isoDate =
    date instanceof Date ? DateTime.fromJSDate(date) : DateTime.fromISO(date);
  const formattedDate = isoDate
    .setZone("America/Los_Angeles")
    .toFormat("yyyy-MM-dd");
  return formattedDate;
};

// Format a date with time in the Pacific Time Zone
// The input is expected to be either a Javascript Date
// OR a string in one of the formats
// parsable by luxon as listed here: https://moment.github.io/luxon/#/parsing
export const formatDatetime = date => {
  if (!date) return null;
  const isoDate =
    date instanceof Date ? DateTime.fromJSDate(date) : DateTime.fromISO(date);
  const formattedDate = isoDate
    .setZone("America/Los_Angeles")
    .toFormat("yyyy-MM-dd hh:mm a");
  return formattedDate;
};

export const formatId = id => {
  const padded = id.toString().padStart(10, "0");
  return padded.substring(0, 5) + "-" + padded.substring(5, 10);
};

// Intended for use in popup components
export const selectAllCheckboxes = (filteredOptions, setSelectedListItems) => {
  // Build an array of objects that contain the name for all the list items in the popup
  const listItems = filteredOptions.map(item => ({
    value: item,
    label: item
  }));

  setSelectedListItems(listItems);
};
