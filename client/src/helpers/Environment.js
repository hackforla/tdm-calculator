export const Environment =
  process.env.NODE_ENV === "development" ||
  window.location.hostname.toLowerCase().includes("tdm-dev")
    ? process.env.REACT_APP_ENV || "DEV"
    : window.location.hostname.toLowerCase().includes("tdm-uat")
    ? "UAT"
    : "PROD";
