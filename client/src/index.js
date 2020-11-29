import React from "react";
import ReactDom from "react-dom";
import AppWrapper from "./AppWrapper";
import { ThemeProvider } from "react-jss";
import { jssTheme } from "./styles/theme";

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
