import React from "react";
import ReactDom from "react-dom";
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
  ReactDom.render(
    <ThemeProvider theme={jssTheme}>
      <AppWrapper />
    </ThemeProvider>,
    document.querySelector("#root")
  );
} catch (err) {
  console.error(err);
}
