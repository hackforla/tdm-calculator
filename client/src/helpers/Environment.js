export const Environment =
  import.meta.env.NODE_ENV === "development" ||
  window.location.hostname.toLowerCase().includes("tdm-dev")
    ? import.meta.env.ENV || "DEV"
    : window.location.hostname.toLowerCase().includes("tdm-uat")
    ? "UAT"
    : "PROD";
