import React from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./AppWrapper";
import { ThemeProvider } from "react-jss";
import { jssTheme } from "./styles/theme";

import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-TW66BG9",
  events: {
    customEvent: null,
    loginEvent: null
  }
};

TagManager.initialize(tagManagerArgs);

try {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(
    <ThemeProvider theme={jssTheme}>
      <AppWrapper />
    </ThemeProvider>
  );
} catch (err) {
  console.error(err);
}
