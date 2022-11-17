export const Environment =
  process.env.NODE_ENV === "development" ||
  window.location.hostname.toLowerCase().includes("tdmdev")
    ? process.env.REACT_APP_ENV || "DEV"
    : window.location.hostname.toLowerCase().includes("tdmuat")
    ? "UAT"
    : "PROD";
