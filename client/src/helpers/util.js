import { DateTime } from "luxon";

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
