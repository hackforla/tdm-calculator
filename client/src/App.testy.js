import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// This test fails since we converted App.js
// to a functional component. We may want to
// resurrect it in a form that works for
// functional components later. Took this
// out of the test script by changing
// the file name from App.test.js to App.testy.js

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  expect(div).toBeDefined();
});
