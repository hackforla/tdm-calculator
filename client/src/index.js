import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { ThemeProvider } from "react-jss";
import { jssTheme } from "./styles/theme";

try {
  ReactDom.render(
    <ThemeProvider theme={jssTheme}>
      <App />
    </ThemeProvider>,
    document.querySelector("#root")
  );
} catch (err) {
  console.error(err);
}
