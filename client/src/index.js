import React from "react";
import ReactDom from "react-dom";
import App from "./App";

try {
  ReactDom.render(<App />, document.querySelector("#root"));
} catch (err) {
  console.error(err);
}
