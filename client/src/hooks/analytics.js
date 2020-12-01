import ReactGA from "react-ga";

// Get tracking id from .env for local development environment, otherwise
// use hard-coded production tracking id.
const TRACKING_ID = process.env.REAT_APP_GA_ID || "G-DMKZ5YQPN7";

function init() {
  // Enable debug mode on the local development environment
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  ReactGA.initialize(TRACKING_ID, { debug: isDev });
}

function sendEvent(payload) {
  ReactGA.event(payload);
}

function sendPageview(path) {
  ReactGA.set({ page: path });
  ReactGA.pageview(path);
}

export default {
  init,
  sendEvent,
  sendPageview
};
